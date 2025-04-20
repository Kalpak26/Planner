// backend\src\main\java\com\wanderlust\dto\flight\FlightSearchRequest.java

package com.wanderlust.dto.flight;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FlightSearchRequest {
    private String departureCity;
    private String arrivalCity;
    private LocalDate departureDate;
    private LocalDate returnDate;
    private Integer travelers;
}