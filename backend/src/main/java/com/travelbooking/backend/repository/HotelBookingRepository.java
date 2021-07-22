package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;


@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking,Long>,JpaSpecificationExecutor {
    
}
