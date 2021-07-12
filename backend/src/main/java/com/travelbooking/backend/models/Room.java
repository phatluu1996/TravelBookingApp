package com.travelbooking.backend.models;
import javax.persistence.*;

import java.sql.Date;
import java.util.List;

@Table(name = "room")
public class Room {
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roomId;
    @Column(name = "extra_bed")
    private boolean extraBed;
    @Column(name = "currency")
    private double currency;
    @Column(name = "special_conditions")
    private String specialConditions;
    @Column(name = "room_type")
    private int roomType;
    @Column(name = "max_adult")
    private int maxAdult;
    @Column(name = "max_children")
    private int maxChildren;
    @Column(name = "day_of_departure")
    private Date dayOfDeparture;
    @Column(name = "day_of_arrival")
    private Date dayOfArrival;
    @Column(name = "room_status",nullable = false)
    private Boolean roomStatus;
    @Column(name = "retired", nullable = true)
    private Boolean retired;
    @ManyToOne
    @JoinColumn(name = "hotel",referencedColumnName = "hotel_id")
    private Hotel hotel;
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    List<RoomRating> ratingList;
    @ManyToOne
    @JoinColumn(name = "bkg_detail",referencedColumnName = "id")
    private HotelBookingDetail bkgDetail;
    
    public Room() {
    }

    public Room(long roomId, boolean extraBed, double currency, String specialConditions, int roomType, int maxAdult,
            int maxChildren, Date dayOfDeparture, Date dayOfArrival, Boolean roomStatus, Boolean retired, Hotel hotel,
            List<RoomRating> ratingList, HotelBookingDetail bkgDetail) {
        this.roomId = roomId;
        this.extraBed = extraBed;
        this.currency = currency;
        this.specialConditions = specialConditions;
        this.roomType = roomType;
        this.maxAdult = maxAdult;
        this.maxChildren = maxChildren;
        this.dayOfDeparture = dayOfDeparture;
        this.dayOfArrival = dayOfArrival;
        this.roomStatus = roomStatus;
        this.retired = retired;
        this.hotel = hotel;
        this.ratingList = ratingList;
        this.bkgDetail = bkgDetail;
    }


    public long getRoomId() {
        return roomId;
    }
    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }
    public boolean isExtraBed() {
        return extraBed;
    }
    public void setExtraBed(boolean extraBed) {
        this.extraBed = extraBed;
    }
    public double getCurrency() {
        return currency;
    }
    public void setCurrency(double currency) {
        this.currency = currency;
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
    public Date getDayOfDeparture() {
        return dayOfDeparture;
    }
    public void setDayOfDeparture(Date dayOfDeparture) {
        this.dayOfDeparture = dayOfDeparture;
    }
    public Date getDayOfArrival() {
        return dayOfArrival;
    }
    public void setDayOfArrival(Date dayOfArrival) {
        this.dayOfArrival = dayOfArrival;
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
