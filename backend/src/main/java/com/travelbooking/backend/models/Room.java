package com.travelbooking.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "room")
public class Room {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "room_number")
    private int roomNumber;
    @Column(name = "room_status",nullable = false)
    private Boolean roomStatus;
    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @OneToOne
    @JoinColumn(name = "room_type_id", referencedColumnName = "id")
    private RoomType roomType;

    @ManyToOne
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("rooms")
    private Hotel hotel;

    @OneToMany
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("room")
    private List<RoomRating> ratings;

    @OneToMany
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("room")
    private List<HotelBookingRoom> hotelBookingRooms;
    
    public Room() {
    }

    public Room(long id, int roomNumber, Boolean roomStatus, Boolean retired, RoomType roomType, Hotel hotel, List<RoomRating> ratings, List<HotelBookingRoom> hotelBookingRooms) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomStatus = roomStatus;
        this.retired = retired;
        this.roomType = roomType;
        this.hotel = hotel;
        this.ratings = ratings;
        this.hotelBookingRooms = hotelBookingRooms;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Boolean getRoomStatus() {
        return roomStatus;
    }

    public void setRoomStatus(Boolean roomStatus) {
        this.roomStatus = roomStatus;
    }

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public List<RoomRating> getRatings() {
        return ratings;
    }

    public void setRatings(List<RoomRating> ratings) {
        this.ratings = ratings;
    }

    public List<HotelBookingRoom> getHotelBookingRooms() {
        return hotelBookingRooms;
    }

    public void setHotelBookingRooms(List<HotelBookingRoom> hotelBookingRooms) {
        this.hotelBookingRooms = hotelBookingRooms;
    }
}
