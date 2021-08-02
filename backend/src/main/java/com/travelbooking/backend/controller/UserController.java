package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.User;
import com.travelbooking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

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
}
