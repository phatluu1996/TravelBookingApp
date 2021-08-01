package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Flight;
import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.repository.RoomRepository;
import com.travelbooking.backend.specification.FlightSpecification;
import com.travelbooking.backend.specification.HotelSpecification;
import com.travelbooking.backend.specification.RoomSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

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
    @Autowired
    private RoomRepository roomRepository;

    //http://localhost:8080/api/hotel
    @GetMapping("/hotel")
    public Collection<Hotel> getHotels(@RequestParam(required = false, name = "province") Integer province,
                                       @RequestParam(required = false, name = "district") Integer district,
                                       @RequestParam(required = false, name = "ward") Integer ward,
                                         @RequestParam (required = false, name = "numberAdult") Integer numberAdult,
                                         @RequestParam (required = false, name = "numberChildren") Integer numberChildren,
                                        @RequestParam (required = false, name = "checkInDate") Date checkInDate,
                                       @RequestParam (required = false, name = "numRoom") Integer numRoom
                                            ) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Specification<Hotel> spec = HotelSpecification.createSpecification(province,district,ward,Boolean.FALSE,numberAdult,numberChildren,numRoom,checkInDate);
        return hotelRepository.findAll(spec);
    }
    //http://localhost:8080/api/hotel
    @GetMapping("/hotel/listRooms/{id}")
    public Collection<Room> getRoomsByHotelId(@PathVariable Long id){
                Specification<Room> spec =  RoomSpecification.createSpecification(id,false);
                return roomRepository.findAll(spec);
    }

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
