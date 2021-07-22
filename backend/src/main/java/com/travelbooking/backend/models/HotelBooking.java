package com.travelbooking.backend.models;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "hotel_booking")
public class HotelBooking {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "hotel_type")
    private String hotelType;
    @Column(name = "guest_name",columnDefinition = "nvarchar(255)")
    private String guestName;
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
    @Column(name = "create_at")
    private Date createAt;
    @LastModifiedDate
    @Column(name = "update_at")
    private Date updateAt;
    @Column(name = "payment_method", columnDefinition = "nvarchar(100)")
    private String paymentMethod;
    @Column(name = "retired", nullable = true)
    private boolean retired;

    @OneToOne
    @JoinColumn(name = "hotel_booking_Detail_id",referencedColumnName = "id")
    private HotelBookingDetail hotelBookingDetail;

    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    public HotelBooking() {
    }

    public HotelBooking(Long id, String hotelType, String guestName, int numOfGuest, boolean status, Date checkInDate, Date checkOutDate, Float totalPrice, Date createAt, Date updateAt, String paymentMethod, boolean retired, HotelBookingDetail hotelBookingDetail, User user) {
        this.id = id;
        this.hotelType = hotelType;
        this.guestName = guestName;
        this.numOfGuest = numOfGuest;
        this.status = status;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalPrice = totalPrice;
        this.createAt = createAt;
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

    public String getHotelType() {
        return hotelType;
    }

    public void setHotelType(String hotelType) {
        this.hotelType = hotelType;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
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

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
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
