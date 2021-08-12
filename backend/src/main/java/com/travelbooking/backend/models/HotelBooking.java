package com.travelbooking.backend.models;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Date;
import javax.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "hotel_booking")
public class HotelBooking {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "booking_code")
    private String bookingCode;
    @Column(name = "num_of_guest")
    private int numOfGuest;
    @Column(name = "status")
    private boolean status;
    @Column(name = "check_in_date")
    private Date checkInDate;
    @Column(name = "check_out_date")
    private Date checkOutDate;
    @Column(name = "total_price")
    private Float totalPrice;
    @Column(name="created_at")
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    @Column(name = "update_at")
    private Date updateAt;
    @Column(name = "payment_method", columnDefinition = "nvarchar(100)")
    private String paymentMethod;


    @Column(name = "retired")
    private boolean retired;

    @OneToOne
    @JoinColumn(name = "hotel_booking_Detail_id",referencedColumnName = "id")
    private HotelBookingDetail hotelBookingDetail;

    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    public HotelBooking() {
    }

    public HotelBooking(Long id, String bookingCode, int numOfGuest, boolean status, Date checkInDate, Date checkOutDate, Float totalPrice, Instant createdAt, Date updateAt, String paymentMethod, boolean retired, HotelBookingDetail hotelBookingDetail, User user) {
        this.id = id;
        this.bookingCode = bookingCode;
        this.numOfGuest = numOfGuest;
        this.status = status;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.paymentMethod = paymentMethod;
        this.retired = retired;
        this.hotelBookingDetail = hotelBookingDetail;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public int getNumOfGuest() {
        return numOfGuest;
    }

    public void setNumOfGuest(int numOfGuest) {
        this.numOfGuest = numOfGuest;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public HotelBookingDetail getHotelBookingDetail() {
        return hotelBookingDetail;
    }

    public void setHotelBookingDetail(HotelBookingDetail hotelBookingDetail) {
        this.hotelBookingDetail = hotelBookingDetail;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
