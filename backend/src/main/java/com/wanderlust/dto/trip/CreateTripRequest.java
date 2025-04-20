// backend\src\main\java\com\wanderlust\dto\trip\CreateTripRequest.java
package com.wanderlust.dto.trip;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTripRequest {
    @NotNull
    private Long destinationId;
    
    @NotNull
    private LocalDate startDate;
    
    @NotNull
    private LocalDate endDate;
    
    private Integer travelerCount;
}