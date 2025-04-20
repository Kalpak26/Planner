// backend\src\main\java\com\wanderlust\repository\BookingRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByTripId(Long tripId);
}