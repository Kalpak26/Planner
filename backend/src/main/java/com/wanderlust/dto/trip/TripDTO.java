// backend\src\main\java\com\wanderlust\dto\trip\TripDTO.java
package com.wanderlust.dto.trip;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripDTO {
    private Long id;
    private Long userId;
    private Long destinationId;
    private String destinationName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer travelerCount;
    private List<TripItemDTO> itineraryItems;
}