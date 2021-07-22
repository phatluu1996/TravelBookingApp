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

    @OneToOne
    @JoinColumn(name = "booking_hotel_detail_id",referencedColumnName = "id")
    private HotelBookingDetail bkgDetail;
    @OneToOne
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    private Account account;
    public HotelBooking() {
    }
    public HotelBooking(Long id, String hotelType, String guestName, int numOfGuest, boolean status, Date checkInDate,
            Date checkOutDate, HotelBookingDetail bkgDetail, Account user) {
        this.id = id;
        this.hotelType = hotelType;
        this.guestName = guestName;
        this.numOfGuest = numOfGuest;
        this.status = status;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bkgDetail = bkgDetail;
        this.account = user;
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
    public HotelBookingDetail getBkgDetail() {
        return bkgDetail;
    }
    public void setBkgDetail(HotelBookingDetail bkgDetail) {
        this.bkgDetail = bkgDetail;
    }
    public Account getUser() {
        return account;
    }
    public void setUser(Account user) {
        this.account = user;
    }

}
