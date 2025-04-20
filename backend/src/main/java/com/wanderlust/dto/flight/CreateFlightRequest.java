// backend\src\main\java\com\wanderlust\dto\flight\CreateFlightRequest.java

package com.wanderlust.dto.flight;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreateFlightRequest {
    @NotBlank
    @Size(max = 100)
    private String airline;
    
    private String airlineLogoUrl;
    
    @NotBlank
    @Size(max = 20)
    private String flightNumber;
    
    @NotNull
    private LocalDateTime departureTime;
    
    @NotBlank
    @Size(max = 3)
    private String departureAirport;
    
    @NotBlank
    @Size(max = 100)
    private String departureCity;
    
    @NotNull
    private LocalDateTime arrivalTime;
    
    @NotBlank
    @Size(max = 3)
    private String arrivalAirport;
    
    @NotBlank
    @Size(max = 100)
    private String arrivalCity;
    
    private String duration;
    private Integer stops;
    private String stopAirport;
    private BigDecimal price;
    private String deal;
}