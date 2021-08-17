package com.travelbooking.backend.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.travelbooking.backend.BookingService.BookingRequest;
import com.travelbooking.backend.BookingService.FlightBookingService;
import com.travelbooking.backend.models.FlightBooking;
import com.travelbooking.backend.repository.FlightBookingRepository;
import com.travelbooking.backend.repository.FlightRepository;
import com.travelbooking.backend.specification.DBSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
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
    @PostMapping ( "/book-flight")
    public ResponseEntity<FlightBooking> bookFlight(@RequestBody BookingRequest bookingRequest) throws Exception {
        FlightBooking booking= flightBookingService.bookFlight(bookingRequest);
        return ResponseEntity.ok().body(booking);
    }

    //http://localhost:8080/api/flight-booking/{id}
    @PutMapping("/flight-booking/{id}")
    public ResponseEntity<FlightBooking> updateBooking(@RequestBody FlightBooking booking, @PathVariable Long id) {
        booking.setId(id);
        FlightBooking result = flightBookingRepository.save(booking);
        return ResponseEntity.ok().body(result);
    }



}