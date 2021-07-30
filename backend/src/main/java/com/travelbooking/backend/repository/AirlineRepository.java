package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Airline;
import com.travelbooking.backend.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;


public interface AirlineRepository extends JpaRepository<Airline, Long>, JpaSpecificationExecutor {
    Boolean existsByEmail(String email);
    Airline getByAccountId(Long id);

    @Query("SELECT a.flights from Airline as a where a.id = :airlineId")
    Collection<Flight> listFlightByAirline(@Param("airlineId") Long airlineId);

}
