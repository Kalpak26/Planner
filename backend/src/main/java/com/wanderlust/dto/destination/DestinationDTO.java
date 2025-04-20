// backend\src\main\java\com\wanderlust\dto\destination\DestinationDTO.java

package com.wanderlust.dto.destination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDTO {
    private Long id;
    private String name;
    private String country;
    private String continent;
    private String description;
    private String imageUrl;
    private BigDecimal priceStarting;
    private String badge;
    private List<AttractionDTO> attractions;
    private List<HotelDTO> hotels;
    private List<RestaurantDTO> restaurants;
}
