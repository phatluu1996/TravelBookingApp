package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "hotel_booking_room")
public class HotelBookingRoom {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hotel_booking_detail_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelBookingRooms")
    private HotelBookingDetail hotelBookingDetail;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelBookingRooms")
    private Room room;
}
