package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Long> {
}
