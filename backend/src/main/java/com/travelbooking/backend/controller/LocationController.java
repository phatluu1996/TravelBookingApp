package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.District;
import com.travelbooking.backend.models.Province;
import com.travelbooking.backend.repository.DistrictRepository;
import com.travelbooking.backend.repository.ProvinceRepository;
import com.travelbooking.backend.repository.WardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class LocationController {
    private final Logger log = LoggerFactory.getLogger(LocationController.class);
    @Autowired
    private ProvinceRepository provinceRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private WardRepository wardRepository;

    //http://localhost:8080/api/provinces
    @GetMapping("/provinces")
    public ResponseEntity<?> getProvinces() {
        return ResponseEntity.ok().body(provinceRepository.findAll());
    }

    //http://localhost:8080/api/districts
    @GetMapping("/districts")
    public ResponseEntity<?> getDistricts() {
        return ResponseEntity.ok().body(districtRepository.findAll());
    }

    //http://localhost:8080/api/wards
    @GetMapping("/wards")
    public ResponseEntity<?> getWards() {
        return ResponseEntity.ok().body(wardRepository.findAll());
    }
}
