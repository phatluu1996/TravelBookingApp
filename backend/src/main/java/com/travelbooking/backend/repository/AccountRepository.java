package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUserName(String username);

    Boolean existsByUserName(String username);
}
