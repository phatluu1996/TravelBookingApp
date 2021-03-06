package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.models.HotelBookingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HotelBookingRoomRepository  extends JpaRepository<HotelBookingRoom,Long>, JpaSpecificationExecutor {
}
