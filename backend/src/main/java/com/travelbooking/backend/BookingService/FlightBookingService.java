package com.travelbooking.backend.BookingService;

import com.travelbooking.backend.models.FlightBooking;

public interface FlightBookingService {
    public FlightBooking bookFlight(BookingRequest bookingRequest);
}

