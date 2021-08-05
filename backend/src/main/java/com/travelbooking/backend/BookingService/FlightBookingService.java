package com.travelbooking.backend.BookingService;

import com.travelbooking.backend.models.FlightBooking;
import org.springframework.ui.Model;

import javax.mail.MessagingException;

public interface FlightBookingService {
    public FlightBooking bookFlight(BookingRequest bookingRequest) throws Exception;


}
