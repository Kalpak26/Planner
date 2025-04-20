// backend\src\main\java\com\wanderlust\repository\FlightRepository.java

package com.wanderlust.repository;

import com.wanderlust.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    
    @Query("SELECT f FROM Flight f WHERE f.departureCity = :departureCity " +
           "AND f.arrivalCity = :arrivalCity " +
           "AND DATE(f.departureTime) = DATE(:departureDate)")
    List<Flight> searchFlights(
            @Param("departureCity") String departureCity,
            @Param("arrivalCity") String arrivalCity,
            @Param("departureDate") LocalDateTime departureDate);
    
    List<Flight> findByDepartureCityAndArrivalCity(String departureCity, String arrivalCity);
}