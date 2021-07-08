package com.travelbooking.backend.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "flight")
public class Flight {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flight_code")
    private String flightCode;

    @ManyToOne
    @JoinColumn(name = "airline_id", referencedColumnName = "id")
    private Airline airline;

    @Column(name = "departure_city")
    private String departureCity;

    @Column(name = "arrival_city")
    private String arrivalCity;

    @Column(name = "departure_time")
    private String departureTime;

    @Column(name = "arrival_time")
    private String arrivalTime;

    @Column(name = "description")
    private String description;

    @Column(name = "economy_capacity")
    private int economyCapacity;

    @Column(name = "economy_price")
    private Float economyPrice;

    @Column(name = "business_capacity")
    private int businessCapacity;

    @Column(name = "business_price")
    private Float businessPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "date_of_departure", nullable = true)
    private Date dateOfDeparture;

    @Column(name = "retired",nullable = true)
    private boolean retired;

    public Flight() {
    }

    public Flight(Long id, String flightCode, Airline airline, String departureCity, String arrivalCity, String departureTime, String arrivalTime, String description, int economyCapacity, Float economyPrice, int businessCapacity, Float businessPrice, String status, Date dateOfDeparture, boolean retired) {
        this.id = id;
        this.flightCode = flightCode;
        this.airline = airline;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.description = description;
        this.economyCapacity = economyCapacity;
        this.economyPrice = economyPrice;
        this.businessCapacity = businessCapacity;
        this.businessPrice = businessPrice;
        this.status = status;
        this.dateOfDeparture = dateOfDeparture;
        this.retired = retired;
    }

    public Date getDateOfDeparture() {
        return dateOfDeparture;
    }

    public void setDateOfDeparture(Date dateOfDeparture) {
        this.dateOfDeparture = dateOfDeparture;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightCode() {
        return flightCode;
    }

    public void setFlightCode(String flightCode) {
        this.flightCode = flightCode;
    }

    public Airline getAirline() {
        return airline;
    }

    public void setAirline(Airline airline) {
        this.airline = airline;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public void setArrivalCity(String arrivalCity) {
        this.arrivalCity = arrivalCity;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEconomyCapacity() {
        return economyCapacity;
    }

    public void setEconomyCapacity(int economyCapacity) {
        this.economyCapacity = economyCapacity;
    }

    public Float getEconomyPrice() {
        return economyPrice;
    }

    public void setEconomyPrice(Float economyPrice) {
        this.economyPrice = economyPrice;
    }

    public int getBusinessCapacity() {
        return businessCapacity;
    }

    public void setBusinessCapacity(int businessCapacity) {
        this.businessCapacity = businessCapacity;
    }

    public Float getBusinessPrice() {
        return businessPrice;
    }

    public void setBusinessPrice(Float businessPrice) {
        this.businessPrice = businessPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
