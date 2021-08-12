package com.travelbooking.backend.controller;

import com.travelbooking.backend.BookingHotelService.BookingRequestRoom;
import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.repository.*;
import com.travelbooking.backend.BookingHotelService.RoomBookingServicelmpl;
import com.travelbooking.backend.specification.DBSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class HotelBookingController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AirlineController.class);

    @Autowired
    private HotelBookingRepository hotelBookingRepository;

    @Autowired
    private RoomBookingServicelmpl roomBookingServicelmpl;


    //http://localhost:8080/api/hotel-booking
    @GetMapping("/hotel-booking")
    public Collection<HotelBooking> getHotelBooking() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return hotelBookingRepository.findAll(spec);
    }

    //http://localhost:8080/api/hotel-booking/{id}
    @GetMapping("/hotel-booking/{id}")
    public ResponseEntity<HotelBooking> getHotelBookingWithId(@PathVariable Long id) {
        HotelBooking hotelBooking = hotelBookingRepository.getById(id);
        if (hotelBooking.isRetired()) {
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.ok().body(hotelBooking);
    }

    //http://localhost:8080/api/book-hotel
    @PostMapping( "/book-hotel")
    public ResponseEntity<HotelBooking> bookHotel(@RequestBody BookingRequestRoom bookingRequest) throws Exception {
        HotelBooking booking= roomBookingServicelmpl.bookRoom(bookingRequest);
        return ResponseEntity.ok().body(booking);
    }
}
