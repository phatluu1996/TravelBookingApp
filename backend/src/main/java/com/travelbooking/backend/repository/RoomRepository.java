package com.travelbooking.backend.repository;
import com.travelbooking.backend.models.Room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface RoomRepository extends JpaRepository<Room,Long>,JpaSpecificationExecutor{
    
}
