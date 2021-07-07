package com.travelbooking.backend.controller;

import com.sun.org.apache.xpath.internal.operations.Bool;
import com.travelbooking.backend.models.District;
import com.travelbooking.backend.models.Location;
import com.travelbooking.backend.models.Province;
import com.travelbooking.backend.models.Ward;
import com.travelbooking.backend.repository.DistrictRepository;
import com.travelbooking.backend.repository.LocationRepository;
import com.travelbooking.backend.repository.ProvinceRepository;
import com.travelbooking.backend.repository.WardRepository;
import com.travelbooking.backend.specification.DBSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.MultipartConfig;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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
    @Autowired
    private LocationRepository locationRepository;

    //http://localhost:8080/api/province
    @GetMapping("/province")
    public Collection<Province> getProvinces() {
        return provinceRepository.findAll();
    }

    //http://localhost:8080/api/district
    @GetMapping("/district")
    public Collection<District> getDistricts() {
        return districtRepository.findAll();
    }

    //http://localhost:8080/api/ward
    @GetMapping("/ward")
    public Collection<Ward> getWards() {
        return wardRepository.findAll();
    }

    //http://localhost:8080/api/ward
    @GetMapping("/location")
    public Collection<Location> getLocations() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return locationRepository.findAll(spec);
    }

    //http://localhost:8080/api/location
    @PostMapping("/location")
    public ResponseEntity<Location> addLocation(@RequestBody Location location) {
        Location result = locationRepository.save(location);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/location/1
    @PutMapping("/location/{id}")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location, @PathVariable Long id) {
        location.setId(id);
        Location result = locationRepository.save(location);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/location/1
    @PostMapping("/location/{id}")
    public ResponseEntity<Location> removeLocation(@PathVariable Long id) {
        Location location = locationRepository.findById(id).get();
        location.setRetired(true);
        Location result = locationRepository.save(location);
        return ResponseEntity.ok().body(result);
    }
}
