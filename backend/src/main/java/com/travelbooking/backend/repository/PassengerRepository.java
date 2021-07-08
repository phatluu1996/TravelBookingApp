package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PassengerRepository extends JpaRepository<Passenger, Long>, JpaSpecificationExecutor {
}
