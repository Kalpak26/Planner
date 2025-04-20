// backend\src\main\java\com\wanderlust\config\DatabaseInitializer.java

package com.wanderlust.config;

import com.wanderlust.model.Role;
import com.wanderlust.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseInitializer {
    private final RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        initRoles();
    }

    private void initRoles() {
        for (Role.ERole roleName : Role.ERole.values()) {
            try {
                if (!roleRepository.findByName(roleName).isPresent()) {
                    roleRepository.save(new Role(null, roleName));
                    log.info("Role {} added to database", roleName);
                }
            } catch (Exception e) {
                log.error("Error initializing role {}: {}", roleName, e.getMessage());
            }
        }
    }
}