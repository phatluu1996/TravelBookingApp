package com.travelbooking.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelbooking.backend.repository.HotelBookingRepository;
import com.travelbooking.backend.repository.HotelRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class HotelController {
    private final Logger log = LoggerFactory.getLogger(LocationController.class);
    @Autowired
    private HotelRepository hotelRepository;
    
    


    
}
