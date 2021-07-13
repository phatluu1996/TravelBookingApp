package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Account;
import com.travelbooking.backend.models.User;
import com.travelbooking.backend.repository.AccountRepository;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (accountRepository.existsByUserName(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getEmail());

        Account account = new Account(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                user);

        String strRoles = signUpRequest.getRole();
        if (strRoles == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Role is not found."));
        } else {
            switch (strRoles.toLowerCase()) {
                case "admin":
                    account.setRole("ADMIN");
                    break;
                case "flight":
                    account.setRole("FLIGHT");
                    break;
                case "hotel":
                    account.setRole("HOTEL");
                    break;
                default:
                    account.setRole("USER");
            }
        }

        userRepository.save(user);
        accountRepository.save(account);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
