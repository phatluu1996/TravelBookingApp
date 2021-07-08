package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Airline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AirlineRepository extends JpaRepository<Airline, Long>, JpaSpecificationExecutor {
}
