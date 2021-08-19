package com.travelbooking.backend.controller;

import com.travelbooking.backend.BookingService.EmailService;
import com.travelbooking.backend.UploadImageService.UploadFileServiceImpl;
import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import com.travelbooking.backend.security.payload.response.MessageResponse;
import com.travelbooking.backend.specification.FlightSpecification;
import com.travelbooking.backend.specification.HotelSpecification;
import com.travelbooking.backend.specification.RoomSpecification;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.travelbooking.backend.specification.DBSpecification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class HotelController {
    private final Logger log = LoggerFactory.getLogger(HotelController.class);
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private ProvinceRepository provinceRepository;
    @Autowired
    private  DistrictRepository districtRepository;
    @Autowired
    private  WardRepository wardRepository;
    @Autowired
    private HotelBookingRepository hotelBookingRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UploadFileServiceImpl uploadFileService;
    @Autowired
    EmailService emailService;
    @Autowired
    PasswordEncoder encoder;


    //http://localhost:8080/api/findHotels
    @GetMapping("/findHotels")
    public Collection<Hotel> getHotels(@RequestParam(required = false, name = "province") Integer province,
                                       @RequestParam(required = false, name = "district") Integer district,
                                       @RequestParam(required = false, name = "ward") Integer ward,
                                       @RequestParam (required = false, name = "numberAdult") Integer numberAdult,
                                       @RequestParam (required = false, name = "numberChildren") Integer numberChildren,
                                       @RequestParam (required = false, name = "checkInDate")@DateTimeFormat(pattern = "dd/MM/yyyy") Date checkInDate,
                                       @RequestParam (required = false, name = "checkOutDate")@DateTimeFormat(pattern = "dd/MM/yyyy") Date checkOutDate,
                                       @RequestParam (required = false, name = "numRoom") Integer numRoom
    ) throws ParseException {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String checkInDateCv = dateFormat.format(checkInDate);
        String checkOutDateCv = dateFormat.format(checkOutDate);
        boolean check = false;
        int roomActive = 0;

        List<Hotel> hotelCheckList = new ArrayList<>();
        List<HotelBooking> hotelBookings = new ArrayList<>();
        Specification<Hotel> spec = HotelSpecification.createSpecification(province, district, ward, Boolean.FALSE, numberAdult, numberChildren, numRoom, checkInDate);
        List<Hotel> hotels = hotelRepository.findAll(spec);


        List<HotelBooking> hotelBookingList = hotelBookingRepository.findAll();

        for (int i = 0; i <hotels.size() ; i++) {
            for (int j = 0; j <hotels.get(i).getRooms().size() ; j++) {
                roomActive += hotels.get(i).getRooms().get(j).getMaxAdult() + hotels.get(i).getRooms().get(j).getMaxChildren();
            }
            if (roomActive >= numberAdult+numberChildren) {
                hotelCheckList.add(hotels.get(i));
            }
        }



//

//        for (int i = 0; i < hotelBookingList.size() ; i++) {
//                if(
//                        (hotelBookingList.get(i).getCheckInDate().before(checkInDate) && hotelBookingList.get(i).getCheckOutDate().after(checkInDate))
//                    ||(hotelBookingList.get(i).getCheckInDate().after(checkInDate) && hotelBookingList.get(i).getCheckOutDate().after(checkOutDate))
//                        ||(hotelBookingList.get(i).getCheckInDate().after(checkInDate) && hotelBookingList.get(i).getCheckOutDate().before(checkOutDate))
//                        ||(dateFormat.format(hotelBookingList.get(i).getCheckInDate()).equals(checkInDateCv) && dateFormat.format(hotelBookingList.get(i).getCheckOutDate()).equals(checkOutDateCv)))
//                {
//                        hotelBookings.add(hotelBookingList.get(i));
//                }
//        }
//
//
//        for (int i = 0; i < hotels.size(); i++) {
//            int roomActive = 0;
//            for (int j = 0; j < hotels.get(i).getRooms().size(); j++) {
//                if(hotelBookings.size() > 0 ){
//                    for (int k = 0; k < hotelBookings.size(); k++) {
//                            for (int l = 0; l < hotelBookings.get(k).getHotelBookingDetail().getHotelBookingRooms().size() ; l++) {
//                                int countBK = k;
//                                int countRoomBK = l;
//                                if(hotels.get(i).getRooms().get(j).getId().equals(hotelBookings.get(countBK).getHotelBookingDetail().getHotelBookingRooms().get(countRoomBK).getRoom().getId())){
//                                    int countHotel = i;
//                                    boolean checkHT =  hotelCheckList.stream().anyMatch(hotel -> hotel.getId().equals(hotels.get(countHotel).getId()));
//                                    if(checkHT == false){
//                                        roomActive += hotels.get(i).getRooms().get(j).getMaxAdult() + hotels.get(i).getRooms().get(j).getMaxChildren();
//                                    }
//                                }
//
//                            }
//                    }
//                }else{
//                    roomActive += hotels.get(i).getRooms().get(j).getMaxAdult() + hotels.get(i).getRooms().get(j).getMaxChildren();
//                }
//            }
//            if (roomActive >= numberAdult+numberChildren) {
//                hotelCheckList.add(hotels.get(i));
//            }
//        }
        return hotels;
    }
    //http://localhost:8080/api/findHotel
    @GetMapping("/findHotel")
    public Collection<Hotel> getHotelsById(@RequestParam(required = false, name = "id") Integer id
    ) throws ParseException {
        Specification<Hotel> spec = HotelSpecification.createSpecificationSpecial(id,Boolean.FALSE);
        return hotelRepository.findAll(spec);
    }
    //http://localhost:8080/api/hotel
    @GetMapping("/hotel/listRooms/{id}")
    public Collection<Room> getRoomsByHotelId(@PathVariable Long id){
        Specification<Room> spec =  RoomSpecification.createSpecification(id,false);
        return roomRepository.findAll(spec);
    }

    //http://localhost:8080/api/hotelRoom
    @PostMapping("/hotel/hotelRoom")
    public Collection<Hotel> getHotelByRoom(@RequestBody Room room){
        Specification<Hotel> spec =  HotelSpecification.createSpecificationSpecialWithRoom(room,Boolean.FALSE);
        return hotelRepository.findAll(spec);
    }

    //http://localhost:8080/api/hotels
    @GetMapping("/hotels")
    public Collection<Hotel> getHotels() {
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return hotelRepository.findAll(spec);
    }

    //http://localhost:8080/api/hotel/{id}
    @GetMapping("/hotel/{id}")
    public ResponseEntity<Hotel> getHotel(@PathVariable Long id){
        Hotel hotel = hotelRepository.findById(id).get();
        if (hotel.getRetired()){
            return ResponseEntity.ok().body(null);
        }
        return  ResponseEntity.ok().body(hotel);
    }
    //http://localhost:8080/api/hotel/{id}
    @PostMapping("/hotelWithRoomActive")
    public ResponseEntity<Hotel> getHotelWithActiveRoom( @RequestParam (required = false, name = "id") String id,
                                                         @RequestParam (required = false, name = "checkInDate")@DateTimeFormat(pattern = "dd/MM/yyyy") Date checkInDate,
                                                         @RequestParam (required = false, name = "checkOutDate")@DateTimeFormat(pattern = "dd/MM/yyyy") Date checkOutDate){
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Hotel hotel = hotelRepository.findById(Long.parseLong(id)).get();
        String checkInDateCv = dateFormat.format(checkInDate);
        String checkOutDateCv = dateFormat.format(checkOutDate);

        if (hotel.getRetired()){
            return ResponseEntity.ok().body(null);
        }
        List<HotelBooking> hotelBookings = new ArrayList<>();
        List<Room> rooms = new ArrayList<>();
        List<HotelBooking> hotelBookingList = hotelBookingRepository.findAll();

//
//        for (int i = 0; i < hotelBookingList.size() ; i++) {
//            if(
//                    (hotelBookingList.get(i).getCheckInDate().before(checkInDate) && hotelBookingList.get(i).getCheckOutDate().after(checkInDate))
//                            ||(hotelBookingList.get(i).getCheckInDate().after(checkInDate) && hotelBookingList.get(i).getCheckOutDate().after(checkOutDate))
//                            ||(hotelBookingList.get(i).getCheckInDate().after(checkInDate) && hotelBookingList.get(i).getCheckOutDate().before(checkOutDate))
//                            ||(dateFormat.format(hotelBookingList.get(i).getCheckInDate()).equals(checkInDateCv) && dateFormat.format(hotelBookingList.get(i).getCheckOutDate()).equals(checkOutDateCv)))
//            {
//                hotelBookings.add(hotelBookingList.get(i));
//            }
//        }

//        for (int i = 0; i < hotel.getRooms().size() ;i++) {
//            if(hotel.getRooms().get(i).getRetired() == false){
//                for (int j = 0; j <hotelBookings.size() ; j++) {
//                    for (int k = 0; k <hotelBookings.get(j).getHotelBookingDetail().getHotelBookingRooms().size() ; k++) {
//                        int countBK = j;
//                        int countRoomBK = k;
//                        if(!hotel.getRooms().get(i).getId().equals(hotelBookings.get(countBK).getHotelBookingDetail().getHotelBookingRooms().get(countRoomBK).getRoom().getId())){
//                            System.out.println(hotel.getRooms().get(i).getId());
//                            int countRoom = i;
//                            boolean check =  rooms.stream().anyMatch(room -> room.getId().equals(hotel.getRooms().get(countRoom).getId()));
//                            if(check == false){
//                                rooms.add(hotel.getRooms().get(i));
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        if(rooms.size() > 0){
//            List<Room> rooms1 = hotel.getRooms();
//            for (int i = 0; i <rooms1.size() ; i++) {
//                int finalI = i;
//                boolean check =  rooms.stream().anyMatch(room -> room.getId().equals(rooms1.get(finalI).getId()));
//                if(check == true){
//                    rooms1.remove(i);
//                }
//            }
//           hotel.setRooms(rooms1);
//        }
        return  ResponseEntity.ok().body(hotel);
    }

    //http://localhost:8080/api/hotel
    @PostMapping("/hotel")
    public ResponseEntity<?> addHotel(@RequestBody Hotel hotel) {
        if (accountRepository.existsByUserName(hotel.getAccount().getUserName())) {
            return ResponseEntity
                    .badRequest().body("Username has been used !");
        }
        Account account = accountRepository.save(hotel.getAccount());
        Location location = locationRepository.save(hotel.getLocation());
        Hotel result = hotelRepository.save(hotel);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/addHotel
    @PostMapping(value = "/addHotel",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addHotelWithImage(
             @RequestParam(name = "files",required = false) MultipartFile[] files
            ,@RequestParam String contactName
            ,@RequestParam String contactTitle
            ,@RequestParam String userName
            ,@RequestParam String password
            ,@RequestParam String hotelName
            ,@RequestParam String email
            ,@RequestParam String phone
            ,@RequestParam String description
            ,@RequestParam int numberOfRoom
            ,@RequestParam String street
            ,@RequestParam String province
            ,@RequestParam String district
            ,@RequestParam String ward
    ) throws Exception {
        if (accountRepository.existsByUserName(userName)) {
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Username is already in use!",false));
        }
        if (hotelRepository.existsByEmail(email)) {
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Email is already in use!",false));
        }
        Date currentUtilDate = new Date();

        //Images
        List<Image> images = uploadFileService.fileUpload(files);
      ;
        //Location create:
        Location location = new Location();

        location.setStreet(street);
        location.setPostalCode("7000");
        location.setRetired(Boolean.FALSE);
        location.setProvince(provinceRepository.findById(Long.parseLong(province)).get());
        location.setDistrict(districtRepository.findById(Long.parseLong(district)).get());
        location.setWard(wardRepository.findById(Long.parseLong(ward)).get());
        Location resultLocation = locationRepository.save(location);

        //Account create:
        Account account = new Account();

        account.setPassword(encoder.encode(password));
        account.setUserName(userName);
        account.setRole("HOTEL");
        account.setRetired(true);
        Account resultAccount = accountRepository.save(account);


        //Hotel create
        Hotel hotel = new Hotel();

        hotel.setHotelName(hotelName);
        hotel.setContactName(contactName);
        hotel.setContactTitle(contactTitle);
        hotel.setPhone(phone);

        hotel.setEmail(email);
        hotel.setDescription(description);
        hotel.setNumberOfRoom(numberOfRoom);
        hotel.setImages(images);
        hotel.setRetired(Boolean.FALSE);
        hotel.setLocation(resultLocation);
        hotel.setAccount(resultAccount);
        Hotel resultHotel = hotelRepository.save(hotel);

        if(resultLocation.equals(null)||resultAccount.equals(null)||resultHotel.equals(null)){
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Initialization failed",false));
        }

        StringBuilder linkReset = new StringBuilder();
        linkReset.append("http://localhost:3000/activateAccount?id=");
        linkReset.append(resultAccount.getId());

        Map<String, Object> emailMap = new HashMap<>();
        emailMap.put("username",contactName );
        emailMap.put("changePasswordlink", linkReset.toString());

        String templateHtml = emailService.templateResolve("confirm_account", emailMap);
        emailService.sendSimpleMessage(email, null, "Confirm account", templateHtml);

        return ResponseEntity.ok(new MessageResponse("Hotel registered successfully!", true));
    }

    //http://localhost:8080/api/hotel/{id}
    @PutMapping("/hotel/{id}")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable Long id) {
//        hotel.setId(id);
        Account account = new Account(hotel.getAccount());
        Location location = new Location(hotel.getLocation());
        accountRepository.save(account);
        locationRepository.save(location);
        Hotel result = hotelRepository.save(hotel);

        return ResponseEntity.ok().body(result);
    }
    //http://localhost:8080/api/hotel/{id}
    @PostMapping("/hotel/{id}")
    public ResponseEntity<List<Hotel>> removeHotel(@PathVariable Long id) {
        Hotel hotel = hotelRepository.findById(id).get();
        hotel.setRetired(true);
        Hotel result = hotelRepository.save(hotel);
        Specification<?> spec = DBSpecification.createSpecification(Boolean.FALSE);
        return ResponseEntity.ok().body(hotelRepository.findAll(spec));
    }

    @GetMapping("/hotel/countBookingToday/{id}")
    public ResponseEntity<?> countBookingPerDay(@PathVariable Long id) {
        int count = hotelBookingRepository.countBookingPerDateByHotelId(id);
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/hotel/allBooking/{id}")
    public ResponseEntity<?> getAllBookingByHotelId(@PathVariable Long id) {
        Hotel hotel = hotelRepository.getByAccountId(id);
        Collection<HotelBooking> count = hotelBookingRepository.getAllBookingByHotelId(hotel.getId());
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/hotel/dailyIncome/{id}")
    public ResponseEntity<?> getDailyIncomeByHotelId(@PathVariable Long id) {
        float count = hotelBookingRepository.totalDailyIncomeByHotel(id);
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/hotel/revenueHotel/{id}")
    public ResponseEntity<?> getRevenueByHotelId(@PathVariable Long id) {
        float revenue = hotelBookingRepository.totalRevenueByHotelId(id);
        return ResponseEntity.ok().body(revenue);
    }

    //http://localhost:8080/api/hotel/{id}
    @GetMapping("/hotel/account/{id}")
    public ResponseEntity<Hotel> getHotelByAccountId(@PathVariable Long id){
        if(hotelRepository.existsByAccount_Id(id)){
            Hotel hotel = hotelRepository.getByAccountId(id);
            if(hotel.getRetired()){
                return ResponseEntity.ok().body(null);
            }else return ResponseEntity.ok().body(hotel);
        }else return ResponseEntity.ok().body(null);
    }

    @GetMapping("/hotel/reportMonth/{id}")
    public ResponseEntity<?> getReportMonthByHotelId(@PathVariable Long id) {
        return ResponseEntity.ok().body(hotelBookingRepository.reportMonthByHotel(id));
    }
}
