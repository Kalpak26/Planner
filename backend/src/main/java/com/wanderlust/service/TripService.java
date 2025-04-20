// backend\src\main\java\com\wanderlust\service\TripService.java
package com.wanderlust.service;

import com.wanderlust.dto.trip.CreateTripRequest;
import com.wanderlust.dto.trip.TripDTO;
import com.wanderlust.dto.trip.TripItemDTO;
import com.wanderlust.model.Destination;
import com.wanderlust.model.Trip;
import com.wanderlust.model.TripItem;
import com.wanderlust.model.User;
import com.wanderlust.repository.DestinationRepository;
import com.wanderlust.repository.TripItemRepository;
import com.wanderlust.repository.TripRepository;
import com.wanderlust.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TripService {
    private final TripRepository tripRepository;
    private final TripItemRepository tripItemRepository;
    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;

    @Transactional(readOnly = true)
    public List<TripDTO> getMyTrips() {
        String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        return tripRepository.findByUserId(user.getId()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TripDTO getTripById(Long id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trip not found with id: " + id));
        return mapToDTO(trip);
    }

    @Transactional
    public TripDTO createTrip(CreateTripRequest request) {
        String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found"));
        
        Trip trip = Trip.builder()
                .user(user)
                .destination(destination)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .travelerCount(request.getTravelerCount())
                .build();
        
        Trip savedTrip = tripRepository.save(trip);
        log.info("Created new trip with ID: {} for user: {}", savedTrip.getId(), username);
        
        return mapToDTO(savedTrip);
    }

    private TripDTO mapToDTO(Trip trip) {
        List<TripItemDTO> tripItems = tripItemRepository.findByTripIdOrderByDayAscStartTimeAsc(trip.getId())
                .stream()
                .map(this::mapToTripItemDTO)
                .collect(Collectors.toList());
        
        return TripDTO.builder()
                .id(trip.getId())
                .userId(trip.getUser().getId())
                .destinationId(trip.getDestination().getId())
                .destinationName(trip.getDestination().getName())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .travelerCount(trip.getTravelerCount())
                .itineraryItems(tripItems)
                .build();
    }

    private TripItemDTO mapToTripItemDTO(TripItem item) {
        return TripItemDTO.builder()
                .id(item.getId())
                .day(item.getDay())
                .title(item.getTitle())
                .description(item.getDescription())
                .location(item.getLocation())
                .startTime(item.getStartTime())
                .endTime(item.getEndTime())
                .type(item.getType())
                .imageUrl(item.getImageUrl())
                .build();
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException("No authentication found");
        }
        return authentication.getName();
    }
}