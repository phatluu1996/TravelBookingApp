package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import com.travelbooking.backend.security.payload.response.MessageResponse;
import com.travelbooking.backend.specification.DBSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    HotelBookingRepository hotelBookingRepository;
    @Autowired
    FlightBookingRepository flightBookingRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    PasswordEncoder encoder;

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        if(userRepository.existsByAccount_Id(id)){
            User user = userRepository.getByAccountId(id);
            if(user.isRetired()){
                return ResponseEntity.ok().body(null);
            }else return ResponseEntity.ok().body(user);
        }else return ResponseEntity.ok().body(null);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        Account account = new Account(user.getAccount());
        Location location = new Location(user.getLocation());
        User defaultUser = userRepository.getByAccountId(user.getAccount().getId());

        if(defaultUser.getId().equals(user.getId())){
            if(defaultUser.getEmail().equals(user.getEmail())){
                locationRepository.save(location);
                accountRepository.save(account);
                User result = userRepository.save(user);
                return ResponseEntity.ok().body(result);
            }else {
                if(!userRepository.existsByEmail(user.getEmail())){
                    locationRepository.save(location);
                    accountRepository.save(account);
                    User result = userRepository.save(user);
                    return ResponseEntity.ok().body(result);
                }else return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use.", false));
            }
        }else return ResponseEntity.badRequest().body(new MessageResponse("User not found!", false));
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Account account){
        Account acc = accountRepository.getAccountByUserName(account.getUserName());
        if(acc != null){
            if(encoder.matches(account.getPassword(),acc.getPassword())){
                acc.setPassword(encoder.encode(account.getResetPassword()));
                Account result = accountRepository.save(acc);
                return ResponseEntity.ok().body(result);
            }else return ResponseEntity.badRequest().body(new MessageResponse("Wrong Password.", false));
        }else return ResponseEntity.badRequest().body(new MessageResponse("Account not found.", false));
    }

    @GetMapping("/getAllUser")
    public ResponseEntity <Collection<User>> getUsers (){
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return ResponseEntity.ok().body(userRepository.findAll(spec));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PutMapping("/user/{id}")
    public ResponseEntity<List<User>> removeUser(@PathVariable Long id){
        User user = userRepository.findById(id).get();
        user.setRetired(true);
        user.getAccount().setRetired(true);
        User result = userRepository.save(user);
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return ResponseEntity.ok().body(userRepository.findAll(spec));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/flight-booking-history/{id}")
    public ResponseEntity<?> getFlightBookingHistory(@PathVariable Long id){
        User user = userRepository.getByAccountId(id);
        List<FlightBooking> list = flightBookingRepository.getFlightBookingsByUser(user);
        return ResponseEntity.ok().body(list);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/hotel-booking-history/{id}")
    public ResponseEntity<?> getHotelBookingHistory(@PathVariable Long id){
        User user = userRepository.getByAccountId(id);
        List<HotelBooking> list = hotelBookingRepository.getHotelBookingsByUser(user);
        return ResponseEntity.ok().body(list);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/totalAmountReport")
    public ResponseEntity<?> getTotalReportAdmin(){
        float flightBookingAmount = flightBookingRepository.totalFlightBookingAmount();
        float hotelBookingAmount = hotelBookingRepository.totalHotelBookingAmount();
        HashMap<String, Float> totalPrice = new HashMap<String, Float>();
        totalPrice.put("total",flightBookingAmount + hotelBookingAmount);
        totalPrice.put("flight",flightBookingAmount);
        totalPrice.put("hotel",hotelBookingAmount);
        return ResponseEntity.ok().body(totalPrice);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dailyIncomeAdmin")
    public ResponseEntity<?> getDailyIncomeAdmin(){
        float incomeHotel = hotelBookingRepository.dailyIncomeAdminRP();
        float incomeAirline = flightBookingRepository.dailyIncomeAdminRP();
        return ResponseEntity.ok().body(incomeHotel+incomeAirline);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/reportPerMonth")
    public ResponseEntity<?> getMonthlyReportAdmin(){
        Collection rpHotel = hotelBookingRepository.getAllAmonthPerMonth();
        Collection rpAirline = flightBookingRepository.getAllAmonthPerMonth();
        Collection monthName = flightBookingRepository.getReportMonthName();
        HashMap<String, Collection> allValue = new HashMap<String, Collection>();
        allValue.put("hotel",rpHotel);
        allValue.put("airline",rpAirline);
        allValue.put("month",monthName);
        return ResponseEntity.ok().body(allValue);
    }
}
