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

    public HotelBookingRoom() {
    }

    public HotelBookingRoom(Long id, HotelBookingDetail hotelBookingDetail, Room room) {
        this.id = id;
        this.hotelBookingDetail = hotelBookingDetail;
        this.room = room;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HotelBookingDetail getHotelBookingDetail() {
        return hotelBookingDetail;
    }

    public void setHotelBookingDetail(HotelBookingDetail hotelBookingDetail) {
        this.hotelBookingDetail = hotelBookingDetail;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
