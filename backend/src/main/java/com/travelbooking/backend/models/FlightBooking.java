package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "flight_booking")
public class FlightBooking {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_code")
    private String reservationCode;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "total_passengers", nullable = true)
    private int totalPassengers;

    @Column(name = "status", nullable = true) //1: Confirm 2:Cancel
    private int status;

    @Column(name = "note", nullable = true, columnDefinition = "nvarchar(max)")
    private String note;

    @Column(name="created_at", nullable = false)
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at",nullable = true)
    private Instant updatedAt;

    @OneToMany
    @JoinColumn(name = "booking_id", referencedColumnName = "id")
    @JsonIgnoreProperties("flightBooking")
    private List<FlightBookingDetail> flightBookingDetails;

    @Column(name = "payment_method", columnDefinition = "nvarchar(100)")
    private String paymentMethod;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public FlightBooking() {
    }

    public FlightBooking(Long id, String reservationCode, Float totalPrice, int totalPassengers, int status, String note, Instant createdAt, Instant updatedAt, List<FlightBookingDetail> flightBookingDetails, String paymentMethod, boolean retired, User user) {
        this.id = id;
        this.reservationCode = reservationCode;
        this.totalPrice = totalPrice;
        this.totalPassengers = totalPassengers;
        this.status = status;
        this.note = note;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.flightBookingDetails = flightBookingDetails;
        this.paymentMethod = paymentMethod;
        this.retired = retired;
        this.user = user;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReservationCode() {
        return reservationCode;
    }

    public void setReservationCode(String reservationCode) {
        this.reservationCode = reservationCode;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getTotalPassengers() {
        return totalPassengers;
    }

    public void setTotalPassengers(int totalPassengers) {
        this.totalPassengers = totalPassengers;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<FlightBookingDetail> getFlightBookingDetails() {
        return flightBookingDetails;
    }

    public void setFlightBookingDetails(List<FlightBookingDetail> flightBookingDetails) {
        this.flightBookingDetails = flightBookingDetails;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
