package com.travelbooking.backend.models;

import javax.persistence.*;

@Table(name = "flight_booking_detail")
public class FlightBookingDetail {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight", referencedColumnName = "id")
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "booking", referencedColumnName = "id")
    private FlightBooking flightBooking;

    @OneToOne
    @JoinColumn(name = "passenger", referencedColumnName = "id")
    private Passenger passenger;

    @Column(name = "ticket_number")
    private String ticketNumber;

    @Column(name = "seat_number")
    private String seatNumber;

    @Column
    private Float price;

    @Column(name = "package_allowance")
    private int packageAllowance;

    @Column(name = "special_request")
    private String specialRequest;

    public FlightBookingDetail() {
    }

    public FlightBookingDetail(Long id, Flight flight, FlightBooking flightBooking, Passenger passenger, String ticketNumber, String seatNumber, Float price, int packageAllowance, String specialRequest) {
        this.id = id;
        this.flight = flight;
        this.flightBooking = flightBooking;
        this.passenger = passenger;
        this.ticketNumber = ticketNumber;
        this.seatNumber = seatNumber;
        this.price = price;
        this.packageAllowance = packageAllowance;
        this.specialRequest = specialRequest;
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

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
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
}
