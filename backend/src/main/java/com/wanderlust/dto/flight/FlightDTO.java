// backend\src\main\java\com\wanderlust\dto\flight\FlightDTO.java

package com.wanderlust.dto.flight;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO {
    private Long id;
    private String airline;
    private String airlineLogoUrl;
    private String flightNumber;
    private LocalDateTime departureTime;
    private String departureAirport;
    private String departureCity;
    private LocalDateTime arrivalTime;
    private String arrivalAirport;
    private String arrivalCity;
    private String duration;
    private Integer stops;
    private String stopAirport;
    private BigDecimal price;
    private String deal;
}