package com.travelbooking.backend.controller;
import java.util.Collection;

import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.repository.RoomRepository;
import com.travelbooking.backend.specification.DBSpecification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RoomController {
    private final Logger log = LoggerFactory.getLogger(HotelController.class);
    @Autowired
    private RoomRepository roomRepository;
    
    @GetMapping("/rooms")
    public Collection<Room> getRooms() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return roomRepository.findAll(spec);
    }

        //http://localhost:8080/api/room/{id}
        @GetMapping("/room/{id}")
        public ResponseEntity<Room> getRoomById(@PathVariable Long id){
            Room room = roomRepository.findById(id).get();
            if (room.getRetired()){
                return ResponseEntity.ok().body(null);
            }
            return  ResponseEntity.ok().body(room);
        }
    
        //http://localhost:8080/api/room
        @PostMapping("/room")
        public ResponseEntity<Room> addRoom(@RequestBody Room room) {
            Room result = roomRepository.save(room);
            return ResponseEntity.ok().body(result);
        }
        //http://localhost:8080/api/room/{id}
        @PutMapping("/room/{id}")
        public ResponseEntity<Room> updateAirline(@RequestBody Room room, @PathVariable Long id) {
            room.setRoomId(id);;
            Room result = roomRepository.save(room);
            return ResponseEntity.ok().body(result);
        }
        //http://localhost:8080/api/room/{id}
        @PostMapping("/room/{id}")
        public ResponseEntity<Room> removeRoom(@PathVariable Long id) {
            Room room = roomRepository.findById(id).get();
            room.setRetired(true);
            Room result = roomRepository.save(room);
            return ResponseEntity.ok().body(result);
        }



}
