// backend\src\main\java\com\wanderlust\dto\trip\TripItemDTO.java
package com.wanderlust.dto.trip;

import com.wanderlust.model.TripItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripItemDTO {
    private Long id;
    private Integer day;
    private String title;
    private String description;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private TripItem.TripItemType type;
    private String imageUrl;
}