package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Hotel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface  HotelRepository extends JpaRepository<Hotel,Long>,JpaSpecificationExecutor{
    
}
