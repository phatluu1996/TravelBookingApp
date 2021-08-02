package com.travelbooking.backend.BookingService;

import java.util.Date;

public class BookingRequest {
    private Long userId;
    private Long flightId;
    private Long returnflightId;
    private Date dateBooking1;
    private Date dateReturnBooking;
    private String firstname;
    private String lastname;
    private Date birthday;
    private Boolean gender;
    private String cardId;
    private int cardType;
    private Date cardExpired;
    private Integer type;  //0: Economy Type, 1: Business Type
    private Integer returnType; //0: Economy Type, 1: Business Type
    private String paymentMethod;
    private Float totalPrice;
    private int totalPassenger;

    public BookingRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public Long getReturnflightId() {
        return returnflightId;
    }

    public void setReturnflightId(Long returnflightId) {
        this.returnflightId = returnflightId;
    }

    public Date getDateBooking1() {
        return dateBooking1;
    }

    public void setDateBooking1(Date dateBooking1) {
        this.dateBooking1 = dateBooking1;
    }

    public Date getDateReturnBooking() {
        return dateReturnBooking;
    }

    public void setDateReturnBooking(Date dateReturnBooking) {
        this.dateReturnBooking = dateReturnBooking;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public int getCardType() {
        return cardType;
    }

    public void setCardType(int cardType) {
        this.cardType = cardType;
    }

    public Date getCardExpired() {
        return cardExpired;
    }

    public void setCardExpired(Date cardExpired) {
        this.cardExpired = cardExpired;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getReturnType() {
        return returnType;
    }

    public void setReturnType(Integer returnType) {
        this.returnType = returnType;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getTotalPassenger() {
        return totalPassenger;
    }

    public void setTotalPassenger(int totalPassenger) {
        this.totalPassenger = totalPassenger;
    }
}
