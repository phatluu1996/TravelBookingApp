package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long>, JpaSpecificationExecutor {

    @Query("select f from Flight f where f.departureCity=:departureCity " +
            "and f.arrivalCity =:arrivalCity " +
            "and f.dateOfDeparture=:dateOfDeparture")
    List<Flight> findFlights(@Param("departureCity") String departureCity, @Param("arrivalCity") String arrivalCity,
                             @Param("dateOfDeparture") Date departureDate);
}
