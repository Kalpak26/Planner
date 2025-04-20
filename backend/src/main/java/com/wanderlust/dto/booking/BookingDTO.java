// backend\src\main\java\com\wanderlust\dto\booking\BookingDTO.java

package com.wanderlust.dto.booking;

import com.wanderlust.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private Long userId;
    private Long tripId;
    private Booking.BookingType bookingType;
    private LocalDateTime bookingDate;
    private BigDecimal totalPrice;
    private Booking.BookingStatus status;
}