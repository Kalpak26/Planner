// backend\src\main\java\com\wanderlust\model\Hotel.java

package com.wanderlust.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "hotels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel extends BaseEntity {

    @NotBlank
    @Size(max = 100)
    private String name;

    private Double rating;

    @Column(precision = 10, scale = 2)
    private BigDecimal pricePerNight;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Destination destination;
}