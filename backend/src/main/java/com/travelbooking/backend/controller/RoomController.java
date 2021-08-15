package com.travelbooking.backend.controller;
import java.util.Collection;
import java.util.List;

import com.travelbooking.backend.UploadImageService.UploadFileServiceImpl;
import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.Image;
import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.repository.HotelRepository;
import com.travelbooking.backend.repository.RoomRepository;
import com.travelbooking.backend.specification.DBSpecification;

import com.travelbooking.backend.specification.RoomSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RoomController {
    private final Logger log = LoggerFactory.getLogger(HotelController.class);
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UploadFileServiceImpl uploadFileService;

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
    //http://localhost:8080/api/hotelRoom/{id}
    @GetMapping("/hotelRoom/{id}")
    public List<Room> getRoomByHotelId(@PathVariable Long id){
        Hotel hotel = hotelRepository.getByAccountId(id);
        Specification<?> spec = RoomSpecification.getListRoomByHotelId(hotel,Boolean.FALSE);
        return  roomRepository.findAll(spec);
    }


        //http://localhost:8080/api/room
        @PostMapping(value = "/room",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public List<Room> addRoom(@RequestParam MultipartFile[] files
                                ,@RequestParam int roomNumber
                                ,@RequestParam String roomType
                                ,@RequestParam int price
                                ,@RequestParam int maxAdult
                                ,@RequestParam int maxChildren
                                ,@RequestParam(required=false,name="hotel") String hotelId) throws Exception {

            Hotel hotel = hotelRepository.findById(Long.parseLong(hotelId)).get();
            Room room = new Room();
            //Add new room infor
            room.setRoomNumber(roomNumber);
            room.setHotel(hotel);
            room.setRetired(Boolean.FALSE);
            room.setRoomType(roomType);
            room.setPrice(price);
            room.setMaxAdult(maxAdult);
            room.setMaxChildren(maxChildren);
            Room room1= roomRepository.save(room);
             //Upload and get list Image
            List<Image> images = uploadFileService.fileUpload(files);
            room1.setImages(images);
            roomRepository.save(room1);
            //get list room callback
            Specification<?> spec = RoomSpecification.getListRoomByHotelId(hotel,Boolean.FALSE);
            return roomRepository.findAll(spec);
        }
        //http://localhost:8080/api/room/{id}
        @PutMapping("/room/{id}")
        public ResponseEntity<Room> updateRoom(@RequestBody Room room, @PathVariable Long id) {
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
