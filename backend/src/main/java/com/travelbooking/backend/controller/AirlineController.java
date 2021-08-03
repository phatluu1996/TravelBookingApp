package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.AccountRepository;
import com.travelbooking.backend.repository.AirlineRepository;
import com.travelbooking.backend.repository.LocationRepository;
import com.travelbooking.backend.specification.DBSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    AccountRepository accountRepository;

    //http://localhost:8080/api/airline/{id}
    @PreAuthorize("hasRole('ROLE_AIRLINE')")
    @GetMapping("/airline/{id}")
    public ResponseEntity<Airline> getAirline(@PathVariable Long id){
        if(airlineRepository.existsByAccount_Id(id)){
            Airline airline = airlineRepository.getByAccountId(id);
            if(airline.isRetired()){
                return ResponseEntity.ok().body(null);
            }else return ResponseEntity.ok().body(airline);
        }else return ResponseEntity.ok().body(null);
    }

    //http://localhost:8080/api/airline/{id}
    @PreAuthorize("hasRole('ROLE_AIRLINE')")
    @PutMapping("/airline")
    public ResponseEntity<Airline> updateAirline(@RequestBody Airline airline ,@PathVariable Long id){
        Account account = new Account(airline.getAccount());
        Location location = new Location(airline.getLocation());

        accountRepository.save(account);
        locationRepository.save(location);
        Airline result = airlineRepository.save(airline);

        return ResponseEntity.ok().body(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    //http://localhost:8080/api/airline
    @GetMapping("/airlines")
    public Collection<Airline> getAirlines() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return airlineRepository.findAll(spec);
    }
//
//    @GetMapping("/airline/{id}")
//    public ResponseEntity<Airline> getAirline(@PathVariable Long id){
//        Airline airline = airlineRepository.findById(id).get();
//        if (airline.isRetired()){
//            return ResponseEntity.ok().body(null);
//        }
//        return  ResponseEntity.ok().body(airline);
//    }

    //http://localhost:8080/api/airline
    @PostMapping("/airline")
    public ResponseEntity<Airline> addAirline(@RequestBody Airline airline) {
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok().body(result);
    }
//    //http://localhost:8080/api/airline/{id}
//    @PutMapping("/airline/{id}")
//    public ResponseEntity<Airline> updateAirline(@RequestBody Airline airline, @PathVariable Long id) {
//        airline.setId(id);
//        Airline result = airlineRepository.save(airline);
//        return ResponseEntity.ok().body(result);
//    }
    //http://localhost:8080/api/airline/{id}
    @PostMapping("/airline/{id}")
    public ResponseEntity<Airline> removeAirline(@PathVariable Long id) {
        Airline airline = airlineRepository.findById(id).get();
        airline.setRetired(true);
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok().body(result);
    }

}
