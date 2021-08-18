package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.AccountRepository;
import com.travelbooking.backend.repository.AirlineRepository;
import com.travelbooking.backend.repository.FlightBookingRepository;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.List;

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
    @Autowired
    FlightBookingRepository flightBookingRepository;
    @Autowired
    PasswordEncoder encoder;

    //http://localhost:8080/api/airline/{id}
//    @PreAuthorize("hasAnyRole('ADMIN','AIRLINE')")
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
    @PreAuthorize("hasAnyRole('ADMIN','AIRLINE')")
    @PutMapping("/airline/{id}")
    public ResponseEntity<Airline> updateAirline(@RequestBody Airline airline ,@PathVariable Long id){
        Account account = new Account(airline.getAccount());
        Location location = new Location(airline.getLocation());
        accountRepository.save(account);
        locationRepository.save(location);
        Airline result = airlineRepository.save(airline);

        return ResponseEntity.ok().body(result);
    }

    @PreAuthorize("hasAnyRole('ADMIN','AIRLINE')")
    //http://localhost:8080/api/airline
    @GetMapping("/airlines")
    public Collection<Airline> getAirlines() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return airlineRepository.findAll(spec);
    }

    //http://localhost:8080/api/airline
    @PostMapping("/airline")
    public ResponseEntity<Airline> addAirline(@RequestBody Airline airline) {
        airline.getAccount().setPassword(encoder.encode(airline.getAccount().getPassword()));
        Account account =  accountRepository.save(airline.getAccount());
        Location location = locationRepository.save(airline.getLocation());
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/airline/{id}
    @PostMapping("/airline/{id}")
    public ResponseEntity<List<Airline>> removeAirline(@PathVariable Long id) {
        Airline airline = airlineRepository.findById(id).get();
        airline.setRetired(true);
        Airline result = airlineRepository.save(airline);
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return ResponseEntity.ok().body(airlineRepository.findAll(spec));
    }

    //http://localhost:8080/api/listFlightsByAirline/{id}
    @GetMapping("/listFlightsByAirline/{id}")
    public ResponseEntity<List<Flight>> listFlightsByAirline(@PathVariable Long id){
        if(airlineRepository.existsByAccount_Id(id)) {

            List<Flight> flights = airlineRepository.getListFlights(id);
            return ResponseEntity.ok().body(flights);
        }
        else return ResponseEntity.ok().body(null);

    }

    @GetMapping("/airline/dailyIncomeAirline/{id}")
    public ResponseEntity<?> getDailyIncomeByAirline(@PathVariable Long id){
        return ResponseEntity.ok().body(flightBookingRepository.totalDailyIncomeByAirline(id));
    }

    @GetMapping("/airline/allAirlineBooking/{id}")
    public ResponseEntity<Collection<FlightBooking>> getAllBookingByAirline(@PathVariable Long id){
        return ResponseEntity.ok().body(flightBookingRepository.getAllBookingByAirlineId(id));
    }

    @GetMapping("/airline/revenueByAirline/{id}")
    public ResponseEntity<?> getRevenueByAirline(@PathVariable Long id){
        return ResponseEntity.ok().body(flightBookingRepository.totalRevenueByAirline(id));
    }

    @GetMapping("/airline/bookingToday/{id}")
    public ResponseEntity<?> countBookingTodayByAirline(@PathVariable Long id){
        return ResponseEntity.ok().body(flightBookingRepository.countBookingPerDayAirline(id));
    }

    @GetMapping("/airline/reportPerMonth/{id}")
    public ResponseEntity<?> reportPerMonthByAirline(@PathVariable Long id){
        return ResponseEntity.ok().body(flightBookingRepository.reportPerMonth(id));
    }
}
