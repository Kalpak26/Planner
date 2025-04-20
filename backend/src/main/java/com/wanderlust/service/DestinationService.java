// backend\src\main\java\com\wanderlust\service\DestinationService.java

package com.wanderlust.service;

import com.wanderlust.dto.destination.*;
import com.wanderlust.model.Attraction;
import com.wanderlust.model.Destination;
import com.wanderlust.model.Hotel;
import com.wanderlust.model.Restaurant;
import com.wanderlust.repository.AttractionRepository;
import com.wanderlust.repository.DestinationRepository;
import com.wanderlust.repository.HotelRepository;
import com.wanderlust.repository.RestaurantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DestinationService {
    private final DestinationRepository destinationRepository;
    private final AttractionRepository attractionRepository;
    private final HotelRepository hotelRepository;
    private final RestaurantRepository restaurantRepository;

    @Transactional(readOnly = true)
    public List<DestinationDTO> getAllDestinations() {
        return destinationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DestinationDTO getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + id));
        return mapToDTO(destination);
    }

    @Transactional(readOnly = true)
    public List<DestinationDTO> getDestinationsByContinent(String continent) {
        return destinationRepository.findByContinent(continent).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DestinationDTO> getDestinationsByCountry(String country) {
        return destinationRepository.findByCountry(country).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DestinationDTO> searchDestinations(String query) {
        return destinationRepository.findByNameContainingIgnoreCase(query).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DestinationDTO createDestination(CreateDestinationRequest request) {
        Destination destination = Destination.builder()
                .name(request.getName())
                .country(request.getCountry())
                .continent(request.getContinent())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .priceStarting(request.getPriceStarting())
                .badge(request.getBadge())
                .build();

        Destination savedDestination = destinationRepository.save(destination);
        return mapToDTO(savedDestination);
    }

    @Transactional
    public DestinationDTO updateDestination(Long id, CreateDestinationRequest request) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + id));

        destination.setName(request.getName());
        destination.setCountry(request.getCountry());
        destination.setContinent(request.getContinent());
        destination.setDescription(request.getDescription());
        destination.setImageUrl(request.getImageUrl());
        destination.setPriceStarting(request.getPriceStarting());
        destination.setBadge(request.getBadge());

        Destination updatedDestination = destinationRepository.save(destination);
        return mapToDTO(updatedDestination);
    }

    @Transactional
    public void deleteDestination(Long id) {
        if (!destinationRepository.existsById(id)) {
            throw new EntityNotFoundException("Destination not found with id: " + id);
        }
        destinationRepository.deleteById(id);
    }

    private DestinationDTO mapToDTO(Destination destination) {
        List<AttractionDTO> attractions = attractionRepository.findByDestinationId(destination.getId()).stream()
                .map(this::mapToAttractionDTO)
                .collect(Collectors.toList());

        List<HotelDTO> hotels = hotelRepository.findByDestinationId(destination.getId()).stream()
                .map(this::mapToHotelDTO)
                .collect(Collectors.toList());

        List<RestaurantDTO> restaurants = restaurantRepository.findByDestinationId(destination.getId()).stream()
                .map(this::mapToRestaurantDTO)
                .collect(Collectors.toList());

        return DestinationDTO.builder()
                .id(destination.getId())
                .name(destination.getName())
                .country(destination.getCountry())
                .continent(destination.getContinent())
                .description(destination.getDescription())
                .imageUrl(destination.getImageUrl())
                .priceStarting(destination.getPriceStarting())
                .badge(destination.getBadge())
                .attractions(attractions)
                .hotels(hotels)
                .restaurants(restaurants)
                .build();
    }

    private AttractionDTO mapToAttractionDTO(Attraction attraction) {
        return AttractionDTO.builder()
                .id(attraction.getId())
                .name(attraction.getName())
                .rating(attraction.getRating())
                .imageUrl(attraction.getImageUrl())
                .build();
    }

    private HotelDTO mapToHotelDTO(Hotel hotel) {
        return HotelDTO.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .rating(hotel.getRating())
                .pricePerNight(hotel.getPricePerNight())
                .imageUrl(hotel.getImageUrl())
                .build();
    }

    private RestaurantDTO mapToRestaurantDTO(Restaurant restaurant) {
        return RestaurantDTO.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .cuisine(restaurant.getCuisine())
                .rating(restaurant.getRating())
                .price(restaurant.getPrice())
                .imageUrl(restaurant.getImageUrl())
                .build();
    }
}