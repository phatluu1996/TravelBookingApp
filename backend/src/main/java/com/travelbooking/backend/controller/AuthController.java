package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Account;
import com.travelbooking.backend.models.Airline;
import com.travelbooking.backend.models.User;
import com.travelbooking.backend.repository.AccountRepository;
import com.travelbooking.backend.repository.AirlineRepository;
import com.travelbooking.backend.repository.UserRepository;
import com.travelbooking.backend.security.jwt.JwtUtils;
import com.travelbooking.backend.security.payload.request.LoginRequest;
import com.travelbooking.backend.security.payload.request.SignupRequest;
import com.travelbooking.backend.security.payload.response.JwtResponse;
import com.travelbooking.backend.security.payload.response.MessageResponse;
import com.travelbooking.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AirlineRepository airlineRepository;

//    @Autowired
//    HotelRepository hotelRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        String headerName;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        if(roles.get(0).equals("ROLE_ADMIN")){
            headerName = "Admin";
        }else if (roles.get(0).equals("ROLE_AIRLINE")){
            headerName = airlineRepository.getById(userDetails.getId()).getAirlineName();
//        }else if(roles.get(0).equals("ROLE_HOTEL")){
//            headerName = hotelRepository.getById(userDetails.getId()).getHotelName();
        }else {
            User tpUser = userRepository.getById(userDetails.getId());
            headerName = tpUser.getFirstName() + " " + tpUser.getLastName();
        }

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                headerName,
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (accountRepository.existsByUserName(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (signUpRequest.getEmail() == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Missing Email!"));
        }

        // Create new user's account
        User user;
        Airline airline;
//        Hotel hotel;

        Account account = new Account(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword())
                );

        String strRoles = signUpRequest.getRole();
        if (strRoles == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Role is not found."));
        } else {
            switch (strRoles.toLowerCase()) {
                case "admin":
                    account.setRole("ADMIN");
                    accountRepository.save(account);
                    break;
                case "airline":
                    account.setRole("AIRLINE");


                    airline = new Airline();
                    airline.setAirlineName(signUpRequest.getAirlineName());

                    if (airlineRepository.existsByEmail(signUpRequest.getEmail())) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: Email is already in use!"));
                    }else {
                        airline.setEmail(signUpRequest.getEmail());
                        airline.setAccount(account);
                        accountRepository.save(account);
                        airlineRepository.save(airline);
                    }
                    break;
                case "hotel":
                    account.setRole("HOTEL");

//                    hotel = new Hotel();
//                    hotel.setHotelName(signUpRequest.getHotelName);

//                    if (hotelRepository.existsByEmail(signUpRequest.getEmail())) {
//                        return ResponseEntity
//                                .badRequest()
//                                .body(new MessageResponse("Error: Email is already in use!"));
//                    }else {
//                        hotel.setEmail(signUpRequest.getEmail());
//                        hotel.setAccount(account);
                        accountRepository.save(account);
//                        hotelRepository.save(hotel);
//                    }
                    break;
                case "user":
                    account.setRole("USER");

                    user = new User();
                    user.setFirstName(signUpRequest.getUserFirstName());
                    user.setLastName(signUpRequest.getUserLastName());

                    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: Email is already in use!"));
                    }else {
                        user.setEmail(signUpRequest.getEmail());
                        user.setAccount(account);
                        accountRepository.save(account);
                        userRepository.save(user);
                    }
                    break;
                default:
                    return ResponseEntity
                            .badRequest()
                            .body(new MessageResponse("Error: Role is not found."));
            }
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
