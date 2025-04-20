// backend\src\main\java\com\wanderlust\controller\DestinationController.java

package com.wanderlust.controller;

import com.wanderlust.dto.destination.CreateDestinationRequest;
import com.wanderlust.dto.destination.DestinationDTO;
import com.wanderlust.service.DestinationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<DestinationDTO>> getAllDestinations() {
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinationDTO> getDestinationById(@PathVariable Long id) {
        return ResponseEntity.ok(destinationService.getDestinationById(id));
    }

    @GetMapping("/continent/{continent}")
    public ResponseEntity<List<DestinationDTO>> getDestinationsByContinent(@PathVariable String continent) {
        return ResponseEntity.ok(destinationService.getDestinationsByContinent(continent));
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<DestinationDTO>> getDestinationsByCountry(@PathVariable String country) {
        return ResponseEntity.ok(destinationService.getDestinationsByCountry(country));
    }

    @GetMapping("/search")
    public ResponseEntity<List<DestinationDTO>> searchDestinations(@RequestParam String query) {
        return ResponseEntity.ok(destinationService.searchDestinations(query));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DestinationDTO> createDestination(@Valid @RequestBody CreateDestinationRequest request) {
        return new ResponseEntity<>(destinationService.createDestination(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DestinationDTO> updateDestination(@PathVariable Long id, 
                                                          @Valid @RequestBody CreateDestinationRequest request) {
        return ResponseEntity.ok(destinationService.updateDestination(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }
}