package com.travelbooking.backend.controller;

import com.travelbooking.backend.BookingService.EmailService;
import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import com.travelbooking.backend.security.RandomStringToken;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        String headerName;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Account account = accountRepository.getById(userDetails.getId());
        if(account.isRetired()){
            return ResponseEntity.ok(new MessageResponse("Username has been deactivated!", false));
        }else{
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            if(roles.get(0).equals("ROLE_ADMIN")){
                headerName = "Admin";
            }else if (roles.get(0).equals("ROLE_AIRLINE")){
                headerName = airlineRepository.getByAccountId(userDetails.getId()).getAirlineName();
            }else if(roles.get(0).equals("ROLE_HOTEL")){
                headerName = hotelRepository.getByAccountId(userDetails.getId()).getHotelName();
            }else {
                User tpUser = userRepository.getByAccountId(userDetails.getId());
                headerName = tpUser.getLastName() + " " + tpUser.getFirstName();
            }

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    headerName,
                    roles));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (accountRepository.existsByUserName(signUpRequest.getUsername())) {
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Username is already in use!", false));
        }

        // Create new user's account
        User user;
        Airline airline;
        Hotel hotel;

        Account account = new Account(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword())
                );
        account.setRetired(true);

        String strRoles = signUpRequest.getRole();
        if (strRoles == null) {
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Role is not found.",false));
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

                    if (airlineRepository.existsByEmail(signUpRequest.getEmail())){
                        return ResponseEntity
                                .ok()
                                .body(new MessageResponse("Email is already in use!", false));
                    }else {
                        airline.setEmail(signUpRequest.getEmail());
                        airline.setAccount(account);
                        accountRepository.save(account);
                        airlineRepository.save(airline);
                    }
                    break;
                case "hotel":
                    account.setRole("HOTEL");

                    hotel = new Hotel();
                    hotel.setHotelName(signUpRequest.getHotelName());

                    if (hotelRepository.existsByEmail(signUpRequest.getEmail())){
                        return ResponseEntity
                                .ok()
                                .body(new MessageResponse("Email is already in use!", false));
                    }else {
                        hotel.setEmail(signUpRequest.getEmail());
                        hotel.setAccount(account);
                        accountRepository.save(account);
                        hotelRepository.save(hotel);
                    }
                    break;
                case "user":
                    account.setRole("USER");

                    user = new User();
                    user.setFirstName(signUpRequest.getUserFirstName());
                    user.setLastName(signUpRequest.getUserLastName());

                    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                        return ResponseEntity
                                .ok()
                                .body(new MessageResponse("Email is already in use!",false));
                    }else {
                        Location location = new Location();
                        Location newLoc = locationRepository.save(location);
                        user.setEmail(signUpRequest.getEmail());
                        user.setAccount(account);
                        user.setLocation(newLoc);
                        accountRepository.save(account);
                        userRepository.save(user);
                    }
                    break;
                default:
                    return ResponseEntity
                            .ok()
                            .body(new MessageResponse("Role is not found.",false));
            }
        }

        StringBuilder linkReset = new StringBuilder();
        linkReset.append("http://localhost:3000/activateAccount?id=");
        linkReset.append(account.getId());

        Map<String, Object> emailMap = new HashMap<>();
        emailMap.put("username", signUpRequest.getUserFirstName()+" "+signUpRequest.getUserLastName());
        emailMap.put("changePasswordlink", linkReset.toString());

        String templateHtml = emailService.templateResolve("confirm_account", emailMap);
        emailService.sendSimpleMessage(signUpRequest.getEmail(), null, "Confirm account", templateHtml);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!", true));
    }

    @PostMapping("/ggsignin")
    public ResponseEntity<?> googleSignin(@Valid @RequestBody SignupRequest signUpRequest) {
        if (!accountRepository.existsByUserName(signUpRequest.getEmail())) {
            Account account = new Account(signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getEmail())
            );
            account.setRole("USER");
            User user = new User();
            user.setFirstName(signUpRequest.getUserFirstName());
            user.setLastName(signUpRequest.getUserLastName());
            user.setEmail(signUpRequest.getEmail());
            user.setAccount(account);
            accountRepository.save(account);
            userRepository.save(user);

        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getEmail()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        User tpUser = userRepository.getByAccountId(userDetails.getId());
        String headerName = tpUser.getLastName() + " " + tpUser.getFirstName();


        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                headerName,
                roles));
    }

    @PostMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword (@Valid @RequestBody String email){
        if(userRepository.existsByEmail(email) || airlineRepository.existsByEmail(email) || hotelRepository.existsByEmail(email)){
            Account account;
            if(userRepository.existsByEmail(email)){
                User user = userRepository.getByEmail(email);
                account = accountRepository.getById(user.getAccount().getId());
            }else if(airlineRepository.existsByEmail(email)){
                Airline airline = airlineRepository.getByEmail(email);
                account = accountRepository.getById(airline.getId());
            }else{
                Hotel hotel = hotelRepository.getByEmail(email);
                account = accountRepository.getById(hotel.getId());
            }

            if(account.isRetired()){
                return ResponseEntity.ok().body(new MessageResponse("Account has been deactivated!", false));
            }else {
                String token = new RandomStringToken().generateRandomString(10);
                account.setResetPassword(token);

                Account result = accountRepository.save(account);
                StringBuilder linkReset = new StringBuilder();
                linkReset.append("http://localhost:3000/resetPassword?id=");
                linkReset.append(result.getId());
                linkReset.append("&token=");
                linkReset.append(result.getResetPassword());

                Map<String, Object> emailMap = new HashMap<>();
                emailMap.put("email", email);
                emailMap.put("changePasswordlink", linkReset.toString());

                String templateHtml = emailService.templateResolve("forget_password", emailMap);
                emailService.sendSimpleMessage(email, null, "Forget Password", templateHtml);

                return ResponseEntity.ok(new MessageResponse("Successfully! Please check your email.", true));
            }
        }else {
            return ResponseEntity.ok().body(new MessageResponse("We don't have an account with this email!", false));
        }
    }

    @GetMapping("/activateAccount/{id}")
    public ResponseEntity<?> activateAccount (@PathVariable Long id){
        if(accountRepository.existsById(id)){
            Account account = accountRepository.getAccountById(id);
            if(account.isRetired()){
                account.setRetired(false);
                accountRepository.save(account);
                return ResponseEntity.ok().body(new MessageResponse("Successfully! Your account was activated.", true));
            }else {
                return ResponseEntity.ok().body(new MessageResponse("Your account's already been activated.", false));
            }
        }else {
            return ResponseEntity.ok().body(new MessageResponse("Wrong! Please check email again.", false));
        }
    }

    @GetMapping("/getAccountForget/{id}/{token}")
    public ResponseEntity<?> getAccountForget (@PathVariable Long id, @PathVariable String token){
        if(accountRepository.existsById(id)){
            if(accountRepository.existsByResetPassword(token)){
                Account account = accountRepository.getAccountById(id);
                return ResponseEntity.ok().body(account);
            }else {
                return ResponseEntity.ok().body(new MessageResponse("Wrong! Please check email again.", false));
            }
        }else {
            return ResponseEntity.ok().body(new MessageResponse("Wrong! Please check email again.", false));
        }
    }

    @PostMapping("/changePasswordForget")
    public ResponseEntity<?> getAccountForget (@Valid @RequestBody Account account){
        Account acc = new Account(account);
        acc.setResetPassword("");
        acc.setPassword(encoder.encode(account.getPassword()));

        accountRepository.save(acc);

        return ResponseEntity.ok().body(new MessageResponse("Change Password success.", true));
    }
}
