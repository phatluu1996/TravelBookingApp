package com.travelbooking.backend.models;
import javax.persistence.*;
import java.util.List;


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
    @Column(name = "room_status",nullable = false)
    private Boolean roomStatus;
    @Column(name = "retired", nullable = true)
    private Boolean retired;
    @ManyToOne
    @JoinColumn(name = "hotel",referencedColumnName = "hotel_id")
    private Hotel hotel;
    @OneToMany
    @JoinColumn(name = "rating_id",referencedColumnName = "id")
    List<RoomRating> ratingList;
    @ManyToOne
    @JoinColumn(name = "bkg_detail",referencedColumnName = "id")
    private HotelBookingDetail bkgDetail;
    public Room() {
    }
    public Room(long roomId, boolean extraBed, double currency, String specialConditions, int roomType,
            Boolean roomStatus, Boolean retired, Hotel hotel, List<RoomRating> ratingList,
            HotelBookingDetail bkgDetail) {
        this.roomId = roomId;
        this.extraBed = extraBed;
        this.currency = currency;
        this.specialConditions = specialConditions;
        this.roomType = roomType;
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
