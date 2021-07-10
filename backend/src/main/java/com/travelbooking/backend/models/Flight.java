package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    @JsonFormat(pattern = "HH:mm")
    private Date departureTime;

    @Column(name = "arrival_time")
    @JsonFormat(pattern = "HH:mm")
    private Date arrivalTime;

    @Column(name = "description")
    private String description;

    @Column(name = "economy_capacity")
    private int economyCapacity;

    @Column(name = "economy_price")
    private Float economyPrice;

    @Column(name = "infant_price")
    private Float infant_price;

    @Column(name = "child_price")
    private Float child_price;

    @Column(name = "business_capacity")
    private int businessCapacity;

    @Column(name = "business_price")
    private Float businessPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "date_of_departure", nullable = true)
    @Temporal(TemporalType.DATE)
    private Date dateOfDeparture;

    @Column(name = "retired",nullable = true)
    private boolean retired;

    public Flight() {
    }

    public Flight(Long id, String flightCode, Airline airline, String departureCity, String arrivalCity, Date departureTime, Date arrivalTime, String description, int economyCapacity, Float economyPrice, Float infant_price, Float child_price, int businessCapacity, Float businessPrice, String status, Date dateOfDeparture, boolean retired) {
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
        this.infant_price = infant_price;
        this.child_price = child_price;
        this.businessCapacity = businessCapacity;
        this.businessPrice = businessPrice;
        this.status = status;
        this.dateOfDeparture = dateOfDeparture;
        this.retired = retired;
    }

    public Float getInfant_price() {
        return infant_price;
    }

    public void setInfant_price(Float infant_price) {
        this.infant_price = infant_price;
    }

    public Float getChild_price() {
        return child_price;
    }

    public void setChild_price(Float child_price) {
        this.child_price = child_price;
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

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public Date getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Date arrivalTime) {
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
