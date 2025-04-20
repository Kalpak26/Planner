// backend\src\main\java\com\wanderlust\controller\TripController.java
package com.wanderlust.controller;

import com.wanderlust.dto.trip.CreateTripRequest;
import com.wanderlust.dto.trip.TripDTO;
import com.wanderlust.service.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @GetMapping("/my-trips")
    public ResponseEntity<List<TripDTO>> getMyTrips() {
        return ResponseEntity.ok(tripService.getMyTrips());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripDTO> getTripById(@PathVariable Long id) {
        return ResponseEntity.ok(tripService.getTripById(id));
    }

    @PostMapping
    public ResponseEntity<TripDTO> createTrip(@Valid @RequestBody CreateTripRequest request) {
        return new ResponseEntity<>(tripService.createTrip(request), HttpStatus.CREATED);
    }
}