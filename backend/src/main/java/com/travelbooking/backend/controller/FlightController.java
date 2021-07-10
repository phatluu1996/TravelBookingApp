package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Flight;
import com.travelbooking.backend.repository.FlightRepository;
import com.travelbooking.backend.specification.DBSpecification;

import com.travelbooking.backend.specification.FlightSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class FlightController {
    private static final Logger LOGGER = LoggerFactory.getLogger(FlightController.class);

    @Autowired
    private FlightRepository flightRepository;
    ;

    //http://localhost:8080/api/flight
    @GetMapping("/flight")
    public Collection<Flight> getFlights(@RequestParam(required = false) Optional<String> from,
                                         @RequestParam(required = false) Optional<String> to,
                                         @RequestParam(required = false) Optional<Date> departureDay) {
        Specification<Flight> spec = FlightSpecification.createSpecification(from,to,departureDay,Boolean.FALSE);
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

    @GetMapping("/findFlights")
    public Collection<Flight> findFlights(@RequestParam Optional<String> from,
                                          @RequestParam Optional<String> to,
                                          @RequestParam Optional<String> departureDay) {
        Date date = null;
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            date = formatter.parse(departureDay.get());
        }catch (Exception e){
            e.printStackTrace();
        }

        Specification<Flight> spec = FlightSpecification.createSpecification(from, to, Optional.of(date),Boolean.FALSE);
        return flightRepository.findAll(spec);
    }
}
