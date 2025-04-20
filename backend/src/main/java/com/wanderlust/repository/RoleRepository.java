// backend\src\main\java\com\wanderlust\repository\RoleRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role.ERole name);
}