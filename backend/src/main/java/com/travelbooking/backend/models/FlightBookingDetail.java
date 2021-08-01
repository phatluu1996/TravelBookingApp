package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;

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
    private FlightBooking flightBooking;

    @OneToOne
    @JoinColumn(name = "passenger_id", referencedColumnName = "id")
    private Passenger passenger;

    @Column(name = "ticket_number")
    private String ticketNumber;

    @Column(name = "price")
    private Float price;

    @Column(name = "package_allowance", nullable = true)
    private int packageAllowance = 0;

    @Column(name = "special_request", nullable = true)
    private String specialRequest;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    @Column(name = "price_type", nullable = true) //0: Economy Type, 1: Business Type
    private Integer priceType = 0;

    public FlightBookingDetail() {
    }

    public FlightBookingDetail(Long id, Flight flight, FlightBooking flightBooking, Passenger passenger, String ticketNumber, String seatNumber, Float price, int packageAllowance, String specialRequest, boolean retired, Integer priceType) {
        this.id = id;
        this.flight = flight;
        this.flightBooking = flightBooking;
        this.passenger = passenger;
        this.ticketNumber = ticketNumber;
        this.price = price;
        this.packageAllowance = packageAllowance;
        this.specialRequest = specialRequest;
        this.retired = retired;
        this.priceType = priceType;
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

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public int getPackageAllowance() {
        return packageAllowance;
    }

    public void setPackageAllowance(int packageAllowance) {
        this.packageAllowance = packageAllowance;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public Integer getPriceType() {
        return priceType;
    }

    public void setPriceType(Integer priceType) {
        this.priceType = priceType;
    }
}
