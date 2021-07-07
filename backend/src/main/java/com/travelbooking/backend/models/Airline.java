package com.travelbooking.backend.models;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;


@Table(name = "airline")
public class Airline {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "airline_name")
    private String airlineName;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "contact_title")
    private String contactTitle;

    @Column
    private String phone;

    @Column
    private String mobile;

    @Column
    private String fax;

    @Column
    private String homepage;

    @Column
    private String email;

    @Column(name = "created_at")
    @CreatedDate
    private Instant createdAt;

    @Column
    private boolean status;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flight> flights;

    //foreign key address

}