package com.travelbooking.backend.controller;
import java.util.Collection;
import java.util.List;

import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.repository.HotelRepository;
import com.travelbooking.backend.repository.RoomRepository;
import com.travelbooking.backend.specification.DBSpecification;

import com.travelbooking.backend.specification.RoomSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RoomController {
    private final Logger log = LoggerFactory.getLogger(HotelController.class);
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping("/rooms")
    public Collection<Room> getRooms() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return roomRepository.findAll(spec);
    }

    @PostMapping("/ListRoom")
    public Collection<Room> getRoomWithListId(@RequestBody List<Long> ids) {
            Specification<?> spec = RoomSpecification.getListRoomByListId(ids,Boolean.FALSE);
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
            room.setId(id);;
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
