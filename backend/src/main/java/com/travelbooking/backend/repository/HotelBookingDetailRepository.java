package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.models.HotelBookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HotelBookingDetailRepository  extends JpaRepository<HotelBookingDetail,Long>, JpaSpecificationExecutor {
}
