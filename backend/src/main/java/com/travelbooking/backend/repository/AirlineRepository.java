package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Account;
import com.travelbooking.backend.models.Airline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface AirlineRepository extends JpaRepository<Airline, Long>, JpaSpecificationExecutor {
    Boolean existsByEmail(String email);
}
