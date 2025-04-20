// backend\src\main\java\com\wanderlust\repository\RestaurantRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByDestinationId(Long destinationId);
}