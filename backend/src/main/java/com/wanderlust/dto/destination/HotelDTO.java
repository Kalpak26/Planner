// backend\src\main\java\com\wanderlust\dto\destination\HotelDTO.java

package com.wanderlust.dto.destination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {
    private Long id;
    private String name;
    private Double rating;
    private BigDecimal pricePerNight;
    private String imageUrl;
}