package com.travelbooking.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "room")
public class Room {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number")
    private int roomNumber;

    @Column(name = "available_to")
    private Date availableTo;

    @Column(name = "available_from")
    private Date availableFrom;

    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @ManyToOne
    @JoinColumn(name = "room_type", referencedColumnName = "id")
    private RoomType roomType;

    @ManyToOne
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("rooms")
    private Hotel hotelName;

    @OneToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    @JsonIgnoreProperties("room")
    private HotelBooking hotelBooking;

    public Room() {
    }

    public Room(Long id, int roomNumber, Date availableTo, Date availableFrom, Boolean retired, RoomType roomType, Hotel hotelName, HotelBooking hotelBooking) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.availableTo = availableTo;
        this.availableFrom = availableFrom;
        this.retired = retired;
        this.roomType = roomType;
        this.hotelName = hotelName;
        this.hotelBooking = hotelBooking;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Date getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(Date availableTo) {
        this.availableTo = availableTo;
    }

    public Date getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(Date availableFrom) {
        this.availableFrom = availableFrom;
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

    public Hotel getHotelName() {
        return hotelName;
    }

    public void setHotelName(Hotel hotelName) {
        this.hotelName = hotelName;
    }

    public HotelBooking getHotelBooking() {
        return hotelBooking;
    }

    public void setHotelBooking(HotelBooking hotelBooking) {
        this.hotelBooking = hotelBooking;
    }
}
