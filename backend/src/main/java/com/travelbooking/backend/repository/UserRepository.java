package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>,JpaSpecificationExecutor {
    Boolean existsByEmail(String email);
    User getByAccountId(Long id);
    Boolean existsByAccount_Id(Long id);
}
