package com.travelbooking.backend.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Table(name = "flight_booking")
public class FlightBooking {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_code")
    private String reservationCode;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "total_package_allowance")
    private int totalPackageAllowance;

    @Column(name = "status")
    private int status;

    @Column(name = "note")
    private String note;

    @Column(name="created_at")
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "flight_booking", cascade = CascadeType.ALL)
    private List<FlightBookingDetail> details;

    @Column(name = "payment_method")
    private String paymentMethod;

    //foreign key user
}
