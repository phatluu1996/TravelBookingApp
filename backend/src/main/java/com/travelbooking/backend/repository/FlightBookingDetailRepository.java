package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.FlightBookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FlightBookingDetailRepository extends JpaRepository<FlightBookingDetail, Long>, JpaSpecificationExecutor {
}
