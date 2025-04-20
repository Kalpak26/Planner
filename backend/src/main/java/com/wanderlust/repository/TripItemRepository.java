// backend\src\main\java\com\wanderlust\repository\TripItemRepository.java
package com.wanderlust.repository;

import com.wanderlust.model.TripItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripItemRepository extends JpaRepository<TripItem, Long> {
    List<TripItem> findByTripId(Long tripId);
    List<TripItem> findByTripIdOrderByDayAscStartTimeAsc(Long tripId);
}