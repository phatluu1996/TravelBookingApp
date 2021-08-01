package com.travelbooking.backend.controller;

import com.travelbooking.backend.BookingService.BookingRequest;
import com.travelbooking.backend.BookingService.FlightBookingService;
import com.travelbooking.backend.models.Airline;
import com.travelbooking.backend.models.FlightBooking;
import com.travelbooking.backend.models.FlightBookingDetail;
import com.travelbooking.backend.repository.AirlineRepository;
import com.travelbooking.backend.repository.FlightBookingRepository;
import com.travelbooking.backend.repository.FlightRepository;
import com.travelbooking.backend.specification.DBSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class FlightBookingController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AirlineController.class);

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private FlightBookingService flightBookingService;

    @Autowired
    private FlightBookingRepository flightBookingRepository;

    //http://localhost:8080/api/flight-booking
    @GetMapping("/flight-booking")
    public Collection<FlightBooking> getFlightBooking() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return flightBookingRepository.findAll(spec);
    }

    //http://localhost:8080/api/flight-booking/{id}
    @GetMapping("/flight-booking/{id}")
    public ResponseEntity<FlightBooking> getFlightBooking(@PathVariable Long id) {
        FlightBooking fltBooking = flightBookingRepository.findById(id).get();
        if (fltBooking.isRetired()) {
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.ok().body(fltBooking);
    }

    //http://localhost:8080/api/book-flight
    @PostMapping (value = "/book-flight")
    public String bookFlight(BookingRequest bookingRequest){
        FlightBooking booking= flightBookingService.bookFlight(bookingRequest);
        return "OK";
    }

}