// backend\src\main\java\com\wanderlust\security\jwt\AuthTokenFilter.java

package com.wanderlust.security.jwt;

import com.wanderlust.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class AuthTokenFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            
            // Log the authorization header and token
            String authHeader = request.getHeader("Authorization");
            log.debug("Authorization Header: {}", authHeader);
            log.debug("Parsed JWT Token: {}", jwt != null ? jwt.substring(0, Math.min(10, jwt.length())) + "..." : "null");
            
            if (jwt != null) {
                boolean isValid = jwtUtils.validateJwtToken(jwt);
                log.debug("Token validation result: {}", isValid);
                
                if (isValid) {
                    String username = jwtUtils.getUserNameFromJwtToken(jwt);
                    log.debug("Username from JWT: {}", username);
                    
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    log.debug("UserDetails loaded: {}", userDetails != null ? userDetails.getUsername() : "null");
                    
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.debug("Authentication set in SecurityContext: {}", authentication);
                }
            } else {
                log.debug("No JWT token found in request");
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage(), e);
        }
        
        // Let's also log the current authentication before passing to the next filter
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.debug("Current Authentication: {}", auth);
        if (auth != null) {
            log.debug("Principal type: {}", auth.getPrincipal() != null ? auth.getPrincipal().getClass().getName() : "null");
            log.debug("Principal: {}", auth.getPrincipal());
            log.debug("Authenticated: {}", auth.isAuthenticated());
            log.debug("Authorities: {}", auth.getAuthorities());
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        log.debug("Authorization header: {}", headerAuth);
        
        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        
        return null;
    }
}