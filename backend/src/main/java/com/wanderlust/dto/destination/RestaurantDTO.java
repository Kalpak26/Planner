// backend\src\main\java\com\wanderlust\dto\destination\RestaurantDTO.java

package com.wanderlust.dto.destination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDTO {
    private Long id;
    private String name;
    private String cuisine;
    private Double rating;
    private String price;
    private String imageUrl;
}