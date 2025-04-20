// backend\src\main\java\com\wanderlust\service\FlightService.java

package com.wanderlust.service;

import com.wanderlust.dto.flight.CreateFlightRequest;
import com.wanderlust.dto.flight.FlightDTO;
import com.wanderlust.dto.flight.FlightSearchRequest;
import com.wanderlust.model.Flight;
import com.wanderlust.repository.FlightRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;

    @Transactional(readOnly = true)
    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FlightDTO getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Flight not found with id: " + id));
        return mapToDTO(flight);
    }

    @Transactional(readOnly = true)
    public List<FlightDTO> searchFlights(FlightSearchRequest request) {
        LocalDateTime departureDateTime = request.getDepartureDate().atStartOfDay();
        
        return flightRepository.searchFlights(
                request.getDepartureCity(),
                request.getArrivalCity(),
                departureDateTime
            ).stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public FlightDTO createFlight(CreateFlightRequest request) {
        Flight flight = Flight.builder()
                .airline(request.getAirline())
                .airlineLogoUrl(request.getAirlineLogoUrl())
                .flightNumber(request.getFlightNumber())
                .departureTime(request.getDepartureTime())
                .departureAirport(request.getDepartureAirport())
                .departureCity(request.getDepartureCity())
                .arrivalTime(request.getArrivalTime())
                .arrivalAirport(request.getArrivalAirport())
                .arrivalCity(request.getArrivalCity())
                .duration(request.getDuration())
                .stops(request.getStops())
                .stopAirport(request.getStopAirport())
                .price(request.getPrice())
                .deal(request.getDeal())
                .build();

        Flight savedFlight = flightRepository.save(flight);
        return mapToDTO(savedFlight);
    }

    @Transactional
    public FlightDTO updateFlight(Long id, CreateFlightRequest request) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Flight not found with id: " + id));

        flight.setAirline(request.getAirline());
        flight.setAirlineLogoUrl(request.getAirlineLogoUrl());
        flight.setFlightNumber(request.getFlightNumber());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setDepartureAirport(request.getDepartureAirport());
        flight.setDepartureCity(request.getDepartureCity());
        flight.setArrivalTime(request.getArrivalTime());
        flight.setArrivalAirport(request.getArrivalAirport());
        flight.setArrivalCity(request.getArrivalCity());
        flight.setDuration(request.getDuration());
        flight.setStops(request.getStops());
        flight.setStopAirport(request.getStopAirport());
        flight.setPrice(request.getPrice());
        flight.setDeal(request.getDeal());

        Flight updatedFlight = flightRepository.save(flight);
        return mapToDTO(updatedFlight);
    }

    @Transactional
    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new EntityNotFoundException("Flight not found with id: " + id);
        }
        flightRepository.deleteById(id);
    }

    private FlightDTO mapToDTO(Flight flight) {
        return FlightDTO.builder()
                .id(flight.getId())
                .airline(flight.getAirline())
                .airlineLogoUrl(flight.getAirlineLogoUrl())
                .flightNumber(flight.getFlightNumber())
                .departureTime(flight.getDepartureTime())
                .departureAirport(flight.getDepartureAirport())
                .departureCity(flight.getDepartureCity())
                .arrivalTime(flight.getArrivalTime())
                .arrivalAirport(flight.getArrivalAirport())
                .arrivalCity(flight.getArrivalCity())
                .duration(flight.getDuration())
                .stops(flight.getStops())
                .stopAirport(flight.getStopAirport())
                .price(flight.getPrice())
                .deal(flight.getDeal())
                .build();
    }
}