// backend\src\main\java\com\wanderlust\dto\booking\CreateBookingRequest.java

package com.wanderlust.dto.booking;

import com.wanderlust.model.Booking;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateBookingRequest {
    private Long tripId;
    
    @NotNull
    private Booking.BookingType bookingType;
    
    @NotNull
    private BigDecimal totalPrice;
}