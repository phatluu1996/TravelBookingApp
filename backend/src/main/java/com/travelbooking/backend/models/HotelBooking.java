package com.travelbooking.backend.models;
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
    @Column(name = "guest_name")
    private String guestName;
    @Column(name = "num_of_guest")
    private int numOfGuest;
    @Column(name = "status")
    private boolean status;
    @Column(name = "check_in_date")
    private Date checkInDate;
    @Column(name = "check_out_date")
    private Date checkOutDate;

    @OneToOne
    @JoinColumn(name = "booking_detail_id",referencedColumnName = "id")
    private HotelBookingDetail hotelBookingDetail;

    @OneToOne
    @JoinColumn(name = "user",referencedColumnName = "id")
    private User user;
    public HotelBooking() {
    }

    public HotelBooking(Long id, String hotelType, String guestName, int numOfGuest, boolean status, Date checkInDate, Date checkOutDate, HotelBookingDetail hotelBookingDetail, User user) {
        this.id = id;
        this.hotelType = hotelType;
        this.guestName = guestName;
        this.numOfGuest = numOfGuest;
        this.status = status;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.hotelBookingDetail = hotelBookingDetail;
        this.user = user;
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

    public HotelBookingDetail getHotelBookingDetail() {
        return hotelBookingDetail;
    }

    public void setHotelBookingDetail(HotelBookingDetail hotelBookingDetail) {
        this.hotelBookingDetail = hotelBookingDetail;
    }

    public User getUser() {
        return user;
    }
}
