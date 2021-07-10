package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Airline;
import com.travelbooking.backend.repository.AirlineRepository;
import com.travelbooking.backend.specification.DBSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AirlineController {
    private static final Logger LOGGER= LoggerFactory.getLogger(AirlineController.class);

    @Autowired
    private AirlineRepository airlineRepository;

    //http://localhost:8080/api/airline
    @GetMapping("/airline")
    public Collection<Airline> getAirlines() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return airlineRepository.findAll(spec);
    }

    //http://localhost:8080/api/airline/{id}
    @GetMapping("/airline/{id}")
    public ResponseEntity<Airline> getAirline(@PathVariable Long id){
        Airline airline = airlineRepository.findById(id).get();
        if (airline.isRetired()){
            return ResponseEntity.ok().body(null);
        }
        return  ResponseEntity.ok().body(airline);
    }

    //http://localhost:8080/api/airline
    @PostMapping("/airline")
    public ResponseEntity<Airline> addAirline(@RequestBody Airline airline) {
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok().body(result);
    }
    //http://localhost:8080/api/airline/{id}
    @PutMapping("/airline/{id}")
    public ResponseEntity<Airline> updateAirline(@RequestBody Airline airline, @PathVariable Long id) {
        airline.setId(id);
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok().body(result);
    }
    //http://localhost:8080/api/airline/{id}
    @PostMapping("/airline/{id}")
    public ResponseEntity<Airline> removeAirline(@PathVariable Long id) {
        Airline airline = airlineRepository.findById(id).get();
        airline.setRetired(true);
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok().body(result);
    }


}
