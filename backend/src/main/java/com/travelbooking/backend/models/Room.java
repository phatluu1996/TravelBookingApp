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
    @Column(name = "extra_bed")
    private boolean extraBed;
    @Column(name = "amount")
    private double amount;
    @Column(name = "special_conditions")
    private String specialConditions;
    @Column(name = "room_type")
    private int roomType;
    @Column(name = "max_adult")
    private int maxAdult;
    @Column(name = "max_children")
    private int maxChildren;
    @Column(name = "room_status",nullable = false)
    private Boolean roomStatus;
    @Column(name = "retired", nullable = true)
    private Boolean retired;
    @ManyToOne
    @JoinColumn(name = "hotel_id",referencedColumnName = "id")
    @JsonIgnoreProperties("rooms")
    private Hotel hotel;
    @OneToMany
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("room")
    List<RoomRating> ratingList;
    @ManyToOne
    @JoinColumn(name = "booking_hotel_detail_id",referencedColumnName = "id")
    @JsonIgnoreProperties("rooms")
    private HotelBookingDetail bkgDetail;
    
    public Room() {
    }

    public Room(long id, boolean extraBed, double amount, String specialConditions, int roomType, int maxAdult, int maxChildren, Boolean roomStatus, Boolean retired, Hotel hotel, List<RoomRating> ratingList, HotelBookingDetail bkgDetail) {
        this.id = id;
        this.extraBed = extraBed;
        this.amount = amount;
        this.specialConditions = specialConditions;
        this.roomType = roomType;
        this.maxAdult = maxAdult;
        this.maxChildren = maxChildren;
        this.roomStatus = roomStatus;
        this.retired = retired;
        this.hotel = hotel;
        this.ratingList = ratingList;
        this.bkgDetail = bkgDetail;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isExtraBed() {
        return extraBed;
    }

    public void setExtraBed(boolean extraBed) {
        this.extraBed = extraBed;
    }

    public double getamount() {
        return amount;
    }

    public void setamount(double amount) {
        this.amount = amount;
    }

    public String getSpecialConditions() {
        return specialConditions;
    }

    public void setSpecialConditions(String specialConditions) {
        this.specialConditions = specialConditions;
    }

    public int getRoomType() {
        return roomType;
    }

    public void setRoomType(int roomType) {
        this.roomType = roomType;
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

    public List<RoomRating> getRatingList() {
        return ratingList;
    }

    public void setRatingList(List<RoomRating> ratingList) {
        this.ratingList = ratingList;
    }

    public HotelBookingDetail getBkgDetail() {
        return bkgDetail;
    }

    public void setBkgDetail(HotelBookingDetail bkgDetail) {
        this.bkgDetail = bkgDetail;
    }
}
