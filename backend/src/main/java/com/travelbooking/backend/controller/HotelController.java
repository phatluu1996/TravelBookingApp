package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import com.travelbooking.backend.security.payload.response.MessageResponse;
import com.travelbooking.backend.specification.FlightSpecification;
import com.travelbooking.backend.specification.HotelSpecification;
import com.travelbooking.backend.specification.RoomSpecification;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private HotelBookingRepository hotelBookingRepository;
    @Autowired
    private AccountRepository accountRepository;
    //http://localhost:8080/api/findHotels
    @GetMapping("/findHotels")
    public Collection<Hotel> getHotels(@RequestParam(required = false, name = "province") Integer province,
                                       @RequestParam(required = false, name = "district") Integer district,
                                       @RequestParam(required = false, name = "ward") Integer ward,
                                       @RequestParam (required = false, name = "numberAdult") Integer numberAdult,
                                       @RequestParam (required = false, name = "numberChildren") Integer numberChildren,
                                       @RequestParam (required = false, name = "checkInDate") @DateTimeFormat(pattern = "dd/MM/yyyy") Date checkInDate,
                                       @RequestParam (required = false, name = "numRoom") Integer numRoom
    ) throws ParseException {
        boolean check = false;
        int roomActive = 0;
        List<Hotel> hotelCheckList = new ArrayList<>();
        Specification<Hotel> spec = HotelSpecification.createSpecification(province, district, ward, Boolean.FALSE, numberAdult, numberChildren, numRoom, checkInDate);

        List<Hotel> hotels = hotelRepository.findAll(spec);
        System.out.println(hotels);
        for (int i = 0; i < hotels.size(); i++) {
            for (int j = 0; j < hotels.get(i).getRooms().size(); j++) {
                roomActive += hotels.get(i).getRooms().get(j).getMaxAdult();
            }
            if (roomActive >= numberAdult) {
                hotelCheckList.add(hotels.get(i));
            }
        }
        return hotelCheckList;
    }
    //http://localhost:8080/api/findHotel
    @GetMapping("/findHotel")
    public Collection<Hotel> getHotelsById(@RequestParam(required = false, name = "id") Integer id
    ) throws ParseException {
        Specification<Hotel> spec = HotelSpecification.createSpecificationSpecial(id,Boolean.FALSE);
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
    public ResponseEntity<?> addHotel(@RequestBody Hotel hotel) {
        if (accountRepository.existsByUserName(hotel.getAccount().getUserName())) {
            return ResponseEntity
                    .badRequest().body("Username has been used !");
        }
        Account account = accountRepository.save(hotel.getAccount());
        Location location = locationRepository.save(hotel.getLocation());
        Hotel result = hotelRepository.save(hotel);
        return ResponseEntity.ok().body(result);
    }
    //http://localhost:8080/api/hotel/{id}
    @PutMapping("/hotel/{id}")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable Long id) {

        hotel.setId(id);
        Account account = accountRepository.save(hotel.getAccount());
        Location location = hotel.getLocation();
        locationRepository.save(location);
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

    @GetMapping("/hotel/countBookingToday/{id}")
    public ResponseEntity<?> countBookingPerDay(@PathVariable Long id) {
        int count = hotelBookingRepository.countBookingPerDateByHotelId(id);
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/hotel/allBooking/{id}")
    public ResponseEntity<?> getAllBookingByHotelId(@PathVariable Long id) {
        Collection<HotelBooking> count = hotelBookingRepository.getAllBookingByHotelId(id);
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/hotel/dailyIncome/{id}")
    public ResponseEntity<?> getDailyIncomeByHotelId(@PathVariable Long id) {
        float count = hotelBookingRepository.totalDailyIncomeByHotel(id);
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/hotel/revenueHotel/{id}")
    public ResponseEntity<?> getRevenueByHotelId(@PathVariable Long id) {
        float revenue = hotelBookingRepository.totalRevenueByHotelId(id);
        return ResponseEntity.ok().body(revenue);
    }

    //http://localhost:8080/api/hotel/{id}
    @GetMapping("/hotel/account/{id}")
    public ResponseEntity<Hotel> getHotelByAccountId(@PathVariable Long id){
        if(hotelRepository.existsByAccount_Id(id)){
            Hotel hotel = hotelRepository.getByAccountId(id);
            if(hotel.getRetired()){
                return ResponseEntity.ok().body(null);
            }else return ResponseEntity.ok().body(hotel);
        }else return ResponseEntity.ok().body(null);
    }

    @GetMapping("/hotel/reportMonth/{id}")
    public ResponseEntity<?> getReportMonthByHotelId(@PathVariable Long id) {
        return ResponseEntity.ok().body(hotelBookingRepository.reportMonthByHotel(id));
    }
}
