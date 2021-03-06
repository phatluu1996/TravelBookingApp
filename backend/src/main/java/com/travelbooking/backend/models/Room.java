package com.travelbooking.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.util.Date;
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

    @Column(name = "available_time",nullable = true)
    private Date availableTime;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "price")
    private double price;

    @Column(name = "max_adult")
    private int maxAdult;

    @Column(name = "max_children")
    private int maxChildren;

    @Column(name = "room_status")
    private Boolean roomStatus;

    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @ManyToOne
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("rooms")
    private Hotel hotel;

    @OneToOne
    @JoinColumn(name = "booking_room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("room")
    private HotelBookingRoom hotelBookingRoom;

    @OneToMany
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("room")
    private List<Image> images;

    public Room() {
    }

    public Room(Long id, int roomNumber, Date availableTime, String roomType, double price, int maxAdult, int maxChildren, Boolean roomStatus, Boolean retired, Hotel hotel, HotelBookingRoom hotelBookingRoom, List<Image> images) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.availableTime = availableTime;
        this.roomType = roomType;
        this.price = price;
        this.maxAdult = maxAdult;
        this.maxChildren = maxChildren;
        this.roomStatus = roomStatus;
        this.retired = retired;
        this.hotel = hotel;
        this.hotelBookingRoom = hotelBookingRoom;
        this.images = images;
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

    public Date getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(Date availableTime) {
        this.availableTime = availableTime;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getMaxAdult() {
        return maxAdult;
    }

    public void setMaxAdult(int maxAdult) {
        this.maxAdult = maxAdult;
    }

    public int getMaxChildren() {
        return maxChildren;
    }

    public void setMaxChildren(int maxChildren) {
        this.maxChildren = maxChildren;
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

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public HotelBookingRoom getHotelBookingRoom() {
        return hotelBookingRoom;
    }

    public void setHotelBookingRoom(HotelBookingRoom hotelBookingRoom) {
        this.hotelBookingRoom = hotelBookingRoom;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
