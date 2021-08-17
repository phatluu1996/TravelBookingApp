package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Airline;
import com.travelbooking.backend.models.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;


public interface AirlineRepository extends JpaRepository<Airline, Long>, JpaSpecificationExecutor {
    Boolean existsByEmail(String email);
    Airline getByAccountId(Long id);
    Boolean existsByAccount_Id(Long id);
    Airline getByEmail(String email);

    @Query("SELECT f from Flight f where f.airline.id = :id and f.retired = false")
    List<Flight> getListFlights(@Param("id") Long id);

}
