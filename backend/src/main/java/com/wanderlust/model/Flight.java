// backend\src\main\java\com\wanderlust\model\Flight.java

package com.wanderlust.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight extends BaseEntity {

    @NotBlank
    @Size(max = 100)
    private String airline;

    private String airlineLogoUrl;

    @NotBlank
    @Size(max = 20)
    private String flightNumber;

    @NotNull
    private LocalDateTime departureTime;

    @NotBlank
    @Size(max = 3)
    private String departureAirport;

    @NotBlank
    @Size(max = 100)
    private String departureCity;

    @NotNull
    private LocalDateTime arrivalTime;

    @NotBlank
    @Size(max = 3)
    private String arrivalAirport;

    @NotBlank
    @Size(max = 100)
    private String arrivalCity;

    private String duration;

    private Integer stops;

    private String stopAirport;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private String deal;
}