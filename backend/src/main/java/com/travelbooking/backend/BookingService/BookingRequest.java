package com.travelbooking.backend.BookingService;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelbooking.backend.models.Passenger;

import java.util.Date;
import java.util.List;

public class BookingRequest {
    private Long userId;
    private Long flightId;
    private Long returnFlightId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateBooking;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateReturnBooking;
    private Float totalPrice;
    private String paymentMethod;
    private Integer type;  //0: Economy Type, 1: Business Type
    private Integer returnType; //0: Economy Type, 1: Business Type

    private List<Passenger> passengers;


//    private String firstname;
//    private String lastname;
//    private Date birthday;
//    private Boolean gender;
//    private Integer baggageExtra;
//    private Integer returnBaggageExtra;
//    private boolean hasInfant;

    public BookingRequest() {
    }

    public BookingRequest(Long userId, Long flightId, Long returnFlightId, Date dateBooking, Date dateReturnBooking, Float totalPrice, String paymentMethod, Integer type, Integer returnType, List<Passenger> passengers) {
        this.userId = userId;
        this.flightId = flightId;
        this.returnFlightId = returnFlightId;
        this.dateBooking = dateBooking;
        this.dateReturnBooking = dateReturnBooking;
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.type = type;
        this.returnType = returnType;
        this.passengers = passengers;
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

    public Long getReturnFlightId() {
        return returnFlightId;
    }

    public void setReturnFlightId(Long returnFlightId) {
        this.returnFlightId = returnFlightId;
    }

    public Date getDateBooking() {
        return dateBooking;
    }

    public void setDateBooking(Date dateBooking) {
        this.dateBooking = dateBooking;
    }

    public Date getDateReturnBooking() {
        return dateReturnBooking;
    }

    public void setDateReturnBooking(Date dateReturnBooking) {
        this.dateReturnBooking = dateReturnBooking;
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

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }
}
