package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "passenger")
public class Passenger {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", columnDefinition = "nvarchar(200)")
    private String firstname;

    @Column(name = "last_name", columnDefinition = "nvarchar(200)")
    private String lastname;

    @Column(name = "birthday")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthday;

    @Column(name = "gender")
    private boolean gender;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    @Column(name = "has_infant", nullable = true)
    private boolean hasInfant;

    @Column(name = "ticket_number")
    private String ticketNumber;

    @Column(name = "price")
    private Float price;

    @Column(name = "baggage_extra", nullable = true)
    private int baggageExtra = 0;

    @Column(name = "seat_number")
    private String seatNumber;

    public Passenger() {
    }

    public Passenger(Long id, String firstname, String lastname, Date birthday, boolean gender, boolean retired, boolean hasInfant, String ticketNumber, Float price, int baggageExtra, String seatNumber) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.gender = gender;
        this.retired = retired;
        this.hasInfant = hasInfant;
        this.ticketNumber = ticketNumber;
        this.price = price;
        this.baggageExtra = baggageExtra;
        this.seatNumber = seatNumber;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public boolean isHasInfant() {
        return hasInfant;
    }

    public void setHasInfant(boolean hasInfant) {
        this.hasInfant = hasInfant;
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

    public int getBaggageExtra() {
        return baggageExtra;
    }

    public void setBaggageExtra(int baggageExtra) {
        this.baggageExtra = baggageExtra;
    }
}
