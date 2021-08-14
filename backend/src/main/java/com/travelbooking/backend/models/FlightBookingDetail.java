package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "flight_booking_detail")
public class FlightBookingDetail {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_id", referencedColumnName = "id")
    @JsonIgnoreProperties("flightBookingDetails")
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    @JsonIgnoreProperties("flightBookingDetails")
    private FlightBooking flightBooking;

    @OneToOne
    @JoinColumn(name = "passenger_id", referencedColumnName = "id")
    private Passenger passenger;


    @Column(name = "special_request", nullable = true)
    private String specialRequest;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    @Column(name = "price_type", nullable = true) //0: Economy Type, 1: Business Type, 2: Child Type
    private Integer priceType = 0;

    @Column(name = "date_of_departure")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfDeparture;

    @Column(name = "airline_reservation_code")
    private String airlineReservationCode;

    @Column(name = "total_passengers", nullable = true)
    private int totalPassengers;

    public FlightBookingDetail() {
    }

    public FlightBookingDetail(Long id, Flight flight, FlightBooking flightBooking, Passenger passenger, String specialRequest, boolean retired, Integer priceType, Date dateOfDeparture, String airlineReservationCode) {
        this.id = id;
        this.flight = flight;
        this.flightBooking = flightBooking;
        this.passenger = passenger;
        this.specialRequest = specialRequest;
        this.retired = retired;
        this.priceType = priceType;
        this.dateOfDeparture = dateOfDeparture;
        this.airlineReservationCode = airlineReservationCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }



    public FlightBooking getFlightBooking() {
        return flightBooking;
    }

    public void setFlightBooking(FlightBooking flightBooking) {
        this.flightBooking = flightBooking;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public Integer getPriceType() {
        return priceType;
    }

    public void setPriceType(Integer priceType) {
        this.priceType = priceType;
    }

    public Date getDateOfDeparture() {
        return dateOfDeparture;
    }

    public void setDateOfDeparture(Date dateOfDeparture) {
        this.dateOfDeparture = dateOfDeparture;
    }

    public String getAirlineReservationCode() {
        return airlineReservationCode;
    }

    public void setAirlineReservationCode(String airlineReservationCode) {
        this.airlineReservationCode = airlineReservationCode;
    }
}
