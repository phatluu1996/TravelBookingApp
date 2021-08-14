package com.travelbooking.backend.controller;

import com.travelbooking.backend.models.FeedBack;
import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.HotelFeedBack;
import com.travelbooking.backend.models.Location;
import com.travelbooking.backend.repository.HotelFeedBackRepository;
import com.travelbooking.backend.repository.HotelRepository;
import com.travelbooking.backend.specification.DBSpecification;
import com.travelbooking.backend.specification.HotelFeedBackSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class HotelFeedBackController {

    @Autowired
    HotelFeedBackRepository hotelFeedBackRepository;
    @Autowired
    HotelRepository hotelRepository;

    //http://localhost:8080/api/hotelFeedBack
    @PostMapping("/hotelFeedBack")
    public List<HotelFeedBack> addHotelFeedBack(@RequestBody HotelFeedBack hotelFeedBack) {
        double avgRating  = 0.0;
        double count = 0;

        HotelFeedBack result = hotelFeedBackRepository.save(hotelFeedBack);
        Specification<?> spec = HotelFeedBackSpecification.createSpecification(result.getHotel().getId(),Boolean.FALSE);

        List<HotelFeedBack> feedBacks = hotelFeedBackRepository.findAll(spec);;
        for (int i = 0; i <feedBacks.size() ; i++) {
            count++;
            avgRating += (feedBacks.get(i).getRating());
            if(count == feedBacks.size()){
                    Hotel hotel = hotelFeedBack.getHotel();
                    hotel.setId(hotelFeedBack.getHotel().getId());
                    hotel.setHotelRating((float) Math.round((avgRating/count)));
                    hotel.setHotelFeedBacks(feedBacks);
                    hotelRepository.save(hotel);
            }
        }
        return feedBacks;
    }
    //http://localhost:8080/api/hotelFeedBack/{id}
    @GetMapping("/hotelFeedBack/{id}")
    public List<HotelFeedBack> getFeedbacksByHotelId(@PathVariable Long id){
        Specification<?> spec = HotelFeedBackSpecification.createSpecification(id,Boolean.FALSE);
        return hotelFeedBackRepository.findAll(spec);
    }
}
