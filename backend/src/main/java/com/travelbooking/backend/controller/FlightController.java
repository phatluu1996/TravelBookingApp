package com.travelbooking.backend.controller;

import com.sun.istack.Nullable;

//import com.sun.org.apache.xpath.internal.operations.Bool;
import com.travelbooking.backend.repository.FlightRepository;
import com.travelbooking.backend.specification.DBSpecification;
import com.travelbooking.backend.models.Flight;
import com.travelbooking.backend.specification.FlightSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.text.ParseException;
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
    public Collection<Flight> getFlights(@RequestParam (required = false, name = "from") Optional<String> from,
                                         @RequestParam (required = false, name = "to") Optional<String> to,
                                         @RequestParam (required = false, name = "departureDay") Optional<Date> departureDay) {
        Specification<Flight> spec = FlightSpecification.createSpecification(from,to,null, null, Boolean.TRUE,Boolean.FALSE);
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

    @GetMapping("/roundFlight")
    public Hashtable<String,Flight> getRoundFlight(@RequestParam Long dId,
                                                         @RequestParam Long rId){
        Hashtable<String,Flight> mapResult = new Hashtable();
        Specification<Flight> dSpec = FlightSpecification.createSpecificationForRoundFlight(Optional.ofNullable(dId),Boolean.FALSE);
        Optional<Flight> dFlight = flightRepository.findOne(dSpec);

        Specification<Flight> rSpec = FlightSpecification.createSpecificationForRoundFlight(Optional.ofNullable(rId),Boolean.FALSE);
        Optional<Flight> rFlight = flightRepository.findOne(rSpec);
        mapResult.put("departData", dFlight.get());
        mapResult.put("returnData", rFlight.get());
        return mapResult;
    }

    @GetMapping("/findFlights")
    public Hashtable<String,Page<Flight>> findFlights(@RequestParam Optional<String> from,
                                  @RequestParam Optional<String> to,
                                  @RequestParam(required = false) String departureDate,
                                  @RequestParam(required = false) String returnDate,
                                  @RequestParam(required = false) Integer adult,
                                  @RequestParam(required = false) Integer child,
                                  @RequestParam(required = false) Integer infant,
                                  @RequestParam(required = false) String seatClass,
                                  @RequestParam(required = false, defaultValue = "0") Integer priceFrom,
                                  @RequestParam(required = false, defaultValue = "1500") Integer priceTo,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "id") String sortBy,
                                  @RequestParam(defaultValue = "asc")  String sortDir


                                          ) {
        Hashtable<String,Page<Flight>> mapResult = new Hashtable();

        Specification<Flight> spec = FlightSpecification.createSpecification(from, to, Optional.ofNullable(priceFrom), Optional.ofNullable(priceTo), seatClass.equals("ECONOMY"),Boolean.FALSE);
        Pageable paging = PageRequest.of(page, 4, Sort.by(sortDir.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy)).previousOrFirst();
        Page<Flight> departResult = flightRepository.findAll(spec, paging);
        mapResult.put("departData", departResult);

        if(returnDate.length() > 0){
            Specification<Flight> returnSpec = FlightSpecification.createSpecification(to, from,Optional.ofNullable(priceFrom), Optional.ofNullable(priceTo), seatClass.equals("ECONOMY"),Boolean.FALSE);
            Pageable returnPaging = PageRequest.of(page, 4, Sort.by(sortDir.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy)).previousOrFirst();
            Page<Flight> returnResult = flightRepository.findAll(returnSpec, returnPaging);
            mapResult.put("returnData", returnResult);
        }
        return mapResult;
    }



    private Date convertToDate(String day){
        Date date = null;
        try{
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            if(day != "null"){
                if(day.isEmpty()){
                    return null;
                }
                return formatter.parse(day);
            }
        }catch (ParseException e){
            e.printStackTrace();
            return null;
        }
        return null;
    }
}
