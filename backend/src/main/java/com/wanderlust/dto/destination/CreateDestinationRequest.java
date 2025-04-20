// backend\src\main\java\com\wanderlust\dto\destination\CreateDestinationRequest.java

package com.wanderlust.dto.destination;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateDestinationRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 100)
    private String country;

    @Size(max = 100)
    private String continent;

    private String description;
    private String imageUrl;
    private BigDecimal priceStarting;
    private String badge;
}