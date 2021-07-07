package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WardRepository extends JpaRepository<Ward, Long> {
}
