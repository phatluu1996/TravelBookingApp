package com.travelbooking.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.repository.HotelRepository;
import com.travelbooking.backend.specification.DBSpecification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class HotelController {
    private final Logger log = LoggerFactory.getLogger(HotelController.class);
    @Autowired
    private HotelRepository hotelRepository;

    //http://localhost:8080/api/hotels
    @GetMapping("/hotels")
    public Collection<Hotel> getHotels() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return hotelRepository.findAll(spec);
    }

        //http://localhost:8080/api/hotel/{id}
        @GetMapping("/hotel/{id}")
        public ResponseEntity<Hotel> getHotel(@PathVariable Long id){
            Hotel hotel = hotelRepository.findById(id).get();
            if (hotel.getRetired()){
                return ResponseEntity.ok().body(null);
            }
            return  ResponseEntity.ok().body(hotel);
        }

        //http://localhost:8080/api/hotel
        @PostMapping("/hotel")
        public ResponseEntity<Hotel> addHotel(@RequestBody Hotel airline) {
            Hotel result = hotelRepository.save(airline);
            return ResponseEntity.ok().body(result);
        }
        //http://localhost:8080/api/hotel/{id}
        @PutMapping("/hotel/{id}")          
        public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable Long id) {
            hotel.setId(id);;
            Hotel result = hotelRepository.save(hotel);
            return ResponseEntity.ok().body(result);
        }
        //http://localhost:8080/api/hotel/{id}
        @PostMapping("/hotel/{id}")
        public ResponseEntity<Hotel> removeHotel(@PathVariable Long id) {
            Hotel hotel = hotelRepository.findById(id).get();
            hotel.setRetired(true);
            Hotel result = hotelRepository.save(hotel);
            return ResponseEntity.ok().body(result);
        }

    
}
