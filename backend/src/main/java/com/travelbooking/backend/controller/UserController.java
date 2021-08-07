package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.Account;
import com.travelbooking.backend.models.Location;
import com.travelbooking.backend.models.User;
import com.travelbooking.backend.repository.AccountRepository;
import com.travelbooking.backend.repository.LocationRepository;
import com.travelbooking.backend.repository.UserRepository;
import com.travelbooking.backend.security.payload.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    PasswordEncoder encoder;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        if(userRepository.existsByAccount_Id(id)){
            User user = userRepository.getByAccountId(id);
            if(user.isRetired()){
                return ResponseEntity.ok().body(null);
            }else return ResponseEntity.ok().body(user);
        }else return ResponseEntity.ok().body(null);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        Account account = new Account(user.getAccount());
        Location location = new Location(user.getLocation());
        User defaultUser = userRepository.getByAccountId(user.getAccount().getId());

        if(defaultUser.getId().equals(user.getId())){
            if(defaultUser.getEmail().equals(user.getEmail())){
                accountRepository.save(account);
                locationRepository.save(location);
                User result = userRepository.save(user);
                return ResponseEntity.ok().body(result);
            }else {
                if(!userRepository.existsByEmail(user.getEmail())){
                    accountRepository.save(account);
                    locationRepository.save(location);
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
    public ResponseEntity <Collection<User>> getUsers (){ return ResponseEntity.ok().body(userRepository.findAll()); }
}
