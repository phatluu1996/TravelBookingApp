package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    @JsonIgnoreProperties("flights")
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

    @Column(name = "description", columnDefinition = "nvarchar(max)")
    private String description;

    @Column(name = "economy_capacity")
    private Integer economyCapacity;

    @Column(name = "economy_price")
    private Float economyPrice;

    @Column(name = "infant_price")
    private Float infant_price;

    @Column(name = "child_price")
    private Float child_price;

    @Column(name = "business_capacity")
    private Integer businessCapacity;

    @Column(name = "business_price")
    private Float businessPrice;

    @Column(name = "status", columnDefinition = "nvarchar(100)")
    private String status;

    @Column(name = "date_of_departure", nullable = true)
    @Temporal(TemporalType.DATE)
    private Date dateOfDeparture;

    @Column(name = "retired",nullable = true)
    private boolean retired;

    @Column(name = "economy_baggage",nullable = true)
    private Float economyBaggage;

    @Column(name = "business_baggage",nullable = true)
    private Float businessBaggage;

    @Column(name = "economy_cabin_baggage",nullable = true) //Xách tay
    private Float economyCabinBaggage;

    @Column(name = "business_cabin_baggage",nullable = true)
    private Float businessCabinBaggage;

    @Column(name = "has_entertainment",nullable = true)
    private Boolean hasEntertainment;

    @Column(name = "aircraft_type",nullable = true)
    private String aircraftType;

    public Flight() {
    }

    public Flight(Long id, String flightCode, Airline airline, String departureCity, String arrivalCity, Date departureTime, Date arrivalTime, String description, Integer economyCapacity, Float economyPrice, Float infant_price, Float child_price, Integer businessCapacity, Float businessPrice, String status, Date dateOfDeparture, boolean retired, Float economyBaggage, Float businessBaggage, Float economyCabinBaggage, Float businessCabinBaggage, Boolean hasEntertainment, String aircraftType) {
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
        this.economyBaggage = economyBaggage;
        this.businessBaggage = businessBaggage;
        this.economyCabinBaggage = economyCabinBaggage;
        this.businessCabinBaggage = businessCabinBaggage;
        this.hasEntertainment = hasEntertainment;
        this.aircraftType = aircraftType;
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

    public void setEconomyCapacity(Integer economyCapacity) {
        this.economyCapacity = economyCapacity;
    }

    public void setBusinessCapacity(Integer businessCapacity) {
        this.businessCapacity = businessCapacity;
    }

    public Float getEconomyBaggage() {
        return economyBaggage;
    }

    public void setEconomyBaggage(Float economyBaggage) {
        this.economyBaggage = economyBaggage;
    }

    public Float getBusinessBaggage() {
        return businessBaggage;
    }

    public void setBusinessBaggage(Float businessBaggage) {
        this.businessBaggage = businessBaggage;
    }

    public Float getEconomyCabinBaggage() {
        return economyCabinBaggage;
    }

    public void setEconomyCabinBaggage(Float economyCabinBaggage) {
        this.economyCabinBaggage = economyCabinBaggage;
    }

    public Float getBusinessCabinBaggage() {
        return businessCabinBaggage;
    }

    public void setBusinessCabinBaggage(Float businessCabinBaggage) {
        this.businessCabinBaggage = businessCabinBaggage;
    }

    public Boolean getHasEntertainment() {
        return hasEntertainment;
    }

    public void setHasEntertainment(Boolean hasEntertainment) {
        this.hasEntertainment = hasEntertainment;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }
}
