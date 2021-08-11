package com.travelbooking.backend.BookingHotelService;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.models.User;

import java.util.Date;
import java.util.List;

public class BookingRequest {
    private User user;
    private Hotel hotel;
    private List<Room> rooms;
    private Date dateBooking;
    private Date checkInDate;
    private Date checkOutDate;
    private int numberOfGuests;
    private Float totalPrice;
    private String paymentMethod;


    public BookingRequest() {
    }

    public BookingRequest(User user, Hotel hotel, List<Room> rooms, Date dateBooking, Date checkInDate, Date checkOutDate, int numberOfGuests, Float totalPrice, String paymentMethod) {
        this.user = user;
        this.hotel = hotel;
        this.rooms = rooms;
        this.dateBooking = dateBooking;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.numberOfGuests = numberOfGuests;
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public Date getDateBooking() {
        return dateBooking;
    }

    public void setDateBooking(Date dateBooking) {
        this.dateBooking = dateBooking;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
