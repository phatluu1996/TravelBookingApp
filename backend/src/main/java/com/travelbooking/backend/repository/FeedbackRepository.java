package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<FeedBack, Long>{
}
