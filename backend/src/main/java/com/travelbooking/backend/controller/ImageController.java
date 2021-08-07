package com.travelbooking.backend.controller;


import com.travelbooking.backend.models.Image;
import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.repository.ImageRepository;
//import com.travelbooking.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ImageController {
    @Autowired
    private ImageRepository imageRepository;

    //http://localhost:8080/api/image
    @PostMapping("/image")
    public ResponseEntity<Image> addRoom(@RequestBody Image image) {
        Image result = imageRepository.save(image);
        return ResponseEntity.ok().body(result);
    }
}
