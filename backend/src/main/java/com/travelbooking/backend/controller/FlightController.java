package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Flight;
import com.travelbooking.backend.repository.FlightRepository;
import com.travelbooking.backend.specification.DBSpecification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class FlightController {
    private static final Logger LOGGER = LoggerFactory.getLogger(FlightController.class);

    @Autowired
    private FlightRepository flightRepository;
    ;

    //http://localhost:8080/api/flights
    @GetMapping("/flights")
    public Collection<Flight> getFlights() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return flightRepository.findAll(spec);
    }

    //http://localhost:8080/api/flight/{id}
    @GetMapping("/flight/{id}")
    public ResponseEntity<Flight> getFlight(@PathVariable Long id) {
        Flight flight = flightRepository.findById(id).get();
        if (flight.isRetired()) {
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.ok().body(flight);
    }

    //http://localhost:8080/api/flight
    @PostMapping("/flight")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        Flight result = flightRepository.save(flight);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/flight/{id}
    @PutMapping("/flight/{id}")
    public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight, @PathVariable Long id) {
        flight.setId(id);
        Flight result = flightRepository.save(flight);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/flight/{id}
    @PostMapping("/flight/{id}")
    public ResponseEntity<Flight> removeFlight(@PathVariable Long id) {
        Flight flight = flightRepository.findById(id).get();
        flight.setRetired(true);
        Flight result = flightRepository.save(flight);
        return ResponseEntity.ok().body(result);
    }

    @RequestMapping("/findFlights")
    public List<Flight> findFlights(@RequestParam String origin,
                                    @RequestParam String destination,
                                    @RequestParam @DateTimeFormat(pattern = "MM-dd-yyyy") Date departureDay) {
        List<Flight> flights = flightRepository.findFlights(origin, destination, departureDay);
        return flights;
    }
}
