// backend\src\main\java\com\wanderlust\dto\destination\AttractionDTO.java

package com.wanderlust.dto.destination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttractionDTO {
    private Long id;
    private String name;
    private Double rating;
    private String imageUrl;
}