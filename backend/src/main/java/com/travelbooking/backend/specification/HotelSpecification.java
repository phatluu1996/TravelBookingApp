package com.travelbooking.backend.specification;

import org.springframework.data.jpa.domain.Specification;
import java.util.Optional;

import com.travelbooking.backend.models.Hotel;

public final class HotelSpecification {
    
    public static Specification<Hotel> createSpecification(Optional<String> address
                                                           ,Boolean retired
                                                           ,Optional<Integer>roomQuantity){
        return Specification.where(addressCheck(address).and(roomQuantityCheck(roomQuantity)).and(isRetired(retired)));
    }

    public static Specification<Hotel> addressCheck(Optional<String> address){
        return (hotel,cq,cb) -> address.map(stringAddress ->cb.like(hotel.get("address"),"%"+stringAddress+"%")).orElse(null);
    }

    public static Specification<Hotel> roomQuantityCheck(Optional<Integer>roomQuantity){
        return (hotel,cq,cb) -> roomQuantity.map(integer ->cb.greaterThanOrEqualTo(hotel.get("number_of_rooms"),integer)).orElse(null);
    }
    
    // public static Specification<Hotel> hotelCheck(Optional<String>bbk){
    //     return (hotel,cq,cb) -> bbk.map(integer ->cb.(hotel.get("number_of_rooms"),integer)).orElse(null);
    // }

    public static Specification<Hotel> isRetired(Boolean retired) {
        return (hotel, cq, cb) -> retired != null ? cb.equal(hotel.get("retired"), retired) : null;
    }

    

}
