package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.models.RoomRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoomRatingRepository  extends JpaRepository<RoomRating,Long>, JpaSpecificationExecutor {
}
