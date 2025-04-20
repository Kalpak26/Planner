// backend\src\main\java\com\wanderlust\model\TripItem.java

package com.wanderlust.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "trip_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @NotNull
    private Integer day;

    @NotBlank
    @Size(max = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @NotNull
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private TripItemType type;

    private String imageUrl;

    public enum TripItemType {
        ACCOMMODATION, ACTIVITY, TRANSPORTATION, DINING, OTHER
    }
}