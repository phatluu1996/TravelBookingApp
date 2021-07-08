package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.FlightBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FlightBookingRepository extends JpaRepository<FlightBooking, Long>, JpaSpecificationExecutor {
}
