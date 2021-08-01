package com.travelbooking.backend.BookingService;

import java.util.Date;

public class BookingRequest {
    private Long userId;
    private Long flightId1;
    private Long flightId2;
    private Date dateBooking1;
    private Date dateBooking2;
    private String firstname;
    private String lastname;
    private Date birthday;
    private Boolean gender;
    private String cardId;
    private int cardType;
    private Date cardExpired;
    private Integer type;  //0: Economy Type, 1: Business Type
    private String paymentMethod;
    private Float totalPrice;
    private int totalPassenger;

    public BookingRequest() {
    }

    public BookingRequest(Long userId, Long flightId1, Long flightId2, Date dateBooking1, Date dateBooking2, String firstname, String lastname, Date birthday, Boolean gender, String cardId, int cardType, Date cardExpired, Integer type, String paymentMethod, Float totalPrice, int totalPassenger) {
        this.userId = userId;
        this.flightId1 = flightId1;
        this.flightId2 = flightId2;
        this.dateBooking1 = dateBooking1;
        this.dateBooking2 = dateBooking2;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.gender = gender;
        this.cardId = cardId;
        this.cardType = cardType;
        this.cardExpired = cardExpired;
        this.type = type;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
        this.totalPassenger = totalPassenger;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getFlightId1() {
        return flightId1;
    }

    public void setFlightId1(Long flightId1) {
        this.flightId1 = flightId1;
    }

    public Long getFlightId2() {
        return flightId2;
    }

    public void setFlightId2(Long flightId2) {
        this.flightId2 = flightId2;
    }

    public Date getDateBooking1() {
        return dateBooking1;
    }

    public void setDateBooking1(Date dateBooking1) {
        this.dateBooking1 = dateBooking1;
    }

    public Date getDateBooking2() {
        return dateBooking2;
    }

    public void setDateBooking2(Date dateBooking2) {
        this.dateBooking2 = dateBooking2;
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
}
