// backend\src\main\java\com\wanderlust\repository\TripRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserId(Long userId);
    List<Trip> findByDestinationId(Long destinationId);
}