package com.travelbooking.backend.BookingHotelService;

import com.travelbooking.backend.models.HotelBooking;


public interface RoomBookingService {
    public HotelBooking bookRoom(BookingRequest bookingRequest) throws Exception;
}
