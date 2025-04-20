// backend\src\main\java\com\wanderlust\service\UserService.java

package com.wanderlust.service;

import com.wanderlust.dto.user.UpdateUserRequest;
import com.wanderlust.dto.user.UserDTO;
import com.wanderlust.model.User;
import com.wanderlust.repository.UserRepository;
import com.wanderlust.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null) {
            throw new RuntimeException("No authentication found");
        }
        
        String username;
        Object principal = authentication.getPrincipal();
        
        if (principal instanceof UserDetailsImpl) {
            username = ((UserDetailsImpl) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal;
        } else {
            throw new RuntimeException("Unexpected principal type: " + 
                (principal != null ? principal.getClass().getName() : "null"));
        }
        
        if (username == null || username.isEmpty() || username.equals("anonymousUser")) {
            throw new RuntimeException("Invalid username from authentication: " + username);
        }
        
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
            
            return mapToDTO(user);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user: " + e.getMessage(), e);
        }
    }

    @Transactional
    public UserDTO updateUser(UpdateUserRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // Get username from authentication
        String username;
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            username = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
        } else {
            username = authentication.getName();
        }
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        // Update fields if provided
        if (StringUtils.hasText(request.getFirstName())) {
            user.setFirstName(request.getFirstName());
        }
        
        if (StringUtils.hasText(request.getLastName())) {
            user.setLastName(request.getLastName());
        }
        
        if (StringUtils.hasText(request.getEmail())) {
            // Check if email already exists for another user
            if (userRepository.existsByEmail(request.getEmail()) && 
                    !user.getEmail().equals(request.getEmail())) {
                throw new IllegalArgumentException("Email already in use");
            }
            user.setEmail(request.getEmail());
        }
        
        // Update password if provided
        if (StringUtils.hasText(request.getCurrentPassword()) && StringUtils.hasText(request.getNewPassword())) {
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new BadCredentialsException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }
        
        User updatedUser = userRepository.save(user);
        return mapToDTO(updatedUser);
    }

    private UserDTO mapToDTO(User user) {
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());
        
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .roles(roles)
                .build();
    }
}