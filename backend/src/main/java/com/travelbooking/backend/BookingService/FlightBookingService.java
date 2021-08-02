package com.travelbooking.backend.BookingService;

import com.travelbooking.backend.models.FlightBooking;

import javax.mail.MessagingException;

public interface FlightBookingService {
    public FlightBooking bookFlight(BookingRequest bookingRequest) throws MessagingException;
}
