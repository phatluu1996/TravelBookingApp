package com.travelbooking.backend.repository;

//import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ImageRepository  extends JpaRepository<Image,Long>, JpaSpecificationExecutor {

}
