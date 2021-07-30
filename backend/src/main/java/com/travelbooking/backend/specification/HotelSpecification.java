package com.travelbooking.backend.specification;

import com.travelbooking.backend.models.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;

public final class HotelSpecification {
    public static Specification<Hotel> createSpecification(Integer location
                                                           , Boolean retired
                                                           , Integer number_adult,
                                                           Integer number_children,
                                                           Double price,
                                                           Float rating,
                                                           Date check_in_date){
        return Specification.where(locationCheck(location)
                        .and(isRetired(retired))
                                .and(checkNumAdult(number_adult))
                                        .and(checkNumChildren(number_children))
                                               .and(checkAvailableDate(check_in_date))
                                                    .and(priceCheck(price))
                                                        .and(ratingCheck(rating)));
    }


    public static Specification<Hotel> locationCheck(Integer location){
       return (hotel,cq,cb) -> cb.equal(hotel.get("location"),location);
    }

    public static Specification<Hotel> priceCheck(Double price){
        return (hotel,cq,cb) -> price != 0 ? cb.lessThanOrEqualTo(hotel.get("price"),price):null;
    }

    public static Specification<Hotel> ratingCheck(Float rating){
        return (hotel,cq,cb) -> rating != 0 ?cb.equal(hotel.get("hotelRating"),rating):cb.lessThanOrEqualTo(hotel.get("hotelRating"),5);
    }

    public static Specification<Hotel> checkNumAdult(Integer number_adult){
        return (hotel,cq,cb) -> {
            Join<Hotel,Room> joinTable = hotel.join("rooms");
            return cb.greaterThanOrEqualTo(joinTable.get("maxAdult"), number_adult);
        };
    }

    public static Specification<Hotel> checkNumChildren(Integer number_children){
        return (hotel,cq,cb) -> {
            Join<Hotel,Room> joinTable = hotel.join("rooms");
            return cb.greaterThanOrEqualTo(joinTable.get("maxChildren"),number_children);
        };

    }

    public static Specification<Hotel> checkAvailableDate(Date check_in_date){
        return (hotel,cq,cb) -> {
            Join<Hotel,Room> joinTable = hotel.join("rooms");
            return cb.greaterThanOrEqualTo(joinTable.get("availableTime"),check_in_date);
        };
    }

//    public static Specification<Hotel> checkInCheckOutCheck(  String check_out_date,String check_in_date){
//        return (hotel,cq,cb) -> {
//           Subquery<Hotel> subQuery = cq.subquery(Hotel.class);
//
//           Root<Room> fromRoom = subQuery.from(Room.class);
//           Root<Hotel> fromHotel = subQuery.from(Hotel.class);
//           Root<HotelBookingRoom> fromHotelBookingRoom= subQuery.from(HotelBookingRoom.class);
//           Root<HotelBookingDetail> fromHotelBookingDT = subQuery.from(HotelBookingDetail.class);
//           Root<HotelBooking> fromHotelBooking = subQuery.from(HotelBooking.class);
//
//           Predicate  joinWithRoomTable = cb.equal(fromRoom.get("id"),hotel.get("rooms"));
//           Predicate  joinWithHotelBookingRoom = cb.equal(fromHotelBookingRoom.get("id"),fromRoom.get("hotelBookingRoom"));
//           Predicate  joinWithHotelBkgDetail = cb.equal(fromHotelBookingRoom.get("hotelBookingDetail"),fromHotelBookingDT.get("hotelBookingRooms"));
//           Predicate  joinWithHotelBkg = cb.equal(fromHotelBooking.get("hotelBookingDetail"),fromHotelBookingDT.equals("hotelBooking"));
//           Predicate  checkNullPredicate = cb.isNotNull(fromHotelBooking.get("checkOutDate"));
//           Predicate  checkContract = cb.between(fromHotelBooking.get("checkOutDate"),"'"+check_in_date+"'","'"+check_out_date+"'");
//
//
//           subQuery.select(fromHotel)
//                   .where(joinWithRoomTable,joinWithHotelBookingRoom,joinWithHotelBkgDetail,joinWithHotelBkg,checkNullPredicate,checkContract);
//
////            List<Predicate> conditions = new ArrayList();
//
////           conditions.add(cb.in(cb.between(joinTable2.get("check_out_date"),"'"+check_in_date+"'","'"+check_out_date+"'")).not());
////            TypedQuery<Hotel> typedQuery = em.createQuery(query.select(fromHotel)
////                               //                                 .where(conditions.toArray(new Predicate[] {}))
////                                                               .orderBy(builder.asc(fromHotel.get("id")))
////                                                               .distinct(true));
//
//            return cb.in(subQuery).not();
//        };
//    }

    public static Specification<Hotel> isRetired(Boolean retired) {
        return (hotel, cq, cb) -> retired != null ? cb.equal(hotel.get("retired"), retired) : null;
    }
    public static Specification<Hotel> isHavePaymentAtHotel(Boolean paymentCheck) {
        return (hotel, cq, cb) -> paymentCheck != null ? cb.equal(hotel.get("retired"), paymentCheck) : null;
    }

}
