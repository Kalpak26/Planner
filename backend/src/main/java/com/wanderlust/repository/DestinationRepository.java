// backend\src\main\java\com\wanderlust\repository\DestinationRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByContinent(String continent);
    List<Destination> findByCountry(String country);
    List<Destination> findByNameContainingIgnoreCase(String name);
}