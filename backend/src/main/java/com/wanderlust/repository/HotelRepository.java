// backend\src\main\java\com\wanderlust\repository\HotelRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByDestinationId(Long destinationId);
}