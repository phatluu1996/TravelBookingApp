package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Flight;
import com.travelbooking.backend.models.FlightBooking;
import com.travelbooking.backend.models.FlightBookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface FlightBookingRepository extends JpaRepository<FlightBooking, Long>, JpaSpecificationExecutor {

    @Query("SELECT BOOK FROM FlightBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM FlightBookingDetail DETAIL\n" +
                            "WHERE EXISTS (SELECT 1 FROM Flight F\n" +
                                            "WHERE DETAIL.flight.id = F.id\n" +
                                            "AND F.airline.id = 1)\n" +
                            "AND BOOK.id = DETAIL.flightBooking.id)\n" +
            "ORDER BY BOOK.createdAt DESC")
    Collection<FlightBooking> getAllBookingByAirlineId(@Param("id")Long id);



}
