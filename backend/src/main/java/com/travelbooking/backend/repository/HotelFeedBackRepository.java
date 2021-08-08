package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.models.HotelFeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HotelFeedBackRepository extends JpaRepository<HotelFeedBack,Long>, JpaSpecificationExecutor {
    HotelFeedBackRepository getAllByHotelId(Long id);
}
