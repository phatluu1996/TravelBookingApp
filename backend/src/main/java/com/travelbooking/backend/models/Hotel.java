package com.travelbooking.backend.models;

import java.sql.Date;
import java.util.List;

import javax.persistence.*;

@Table(name = "hotel")
public class Hotel {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;
    @Column(name = "hotel_name")
    private String hotelName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private int phone;
    @Column(name = "contact_name")
    private String contactName;
    @Column(name = "contact_title")
    private String contactTitle;
    @Column(name = "number_of_rooms")
    private int numberOfRooms;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name = "retired", nullable = true)
    private Boolean retired;
    @Column(name = "standard")
    private String standard;
    @ManyToOne
    @JoinColumn(name = "address", referencedColumnName = "id")
    private Location address;
    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    List<Room> roomList;

    public Hotel() {
    }

    public Hotel(Long hotelId, String hotelName, String email, int phone, String contactName, String contactTitle,
            int numberOfRooms, Date createDate, Boolean retired, String standard, Location address, Account account,
            List<Room> roomList) {
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.email = email;
        this.phone = phone;
        this.contactName = contactName;
        this.contactTitle = contactTitle;
        this.numberOfRooms = numberOfRooms;
        this.createDate = createDate;
        this.retired = retired;
        this.standard = standard;
        this.address = address;
        this.account = account;
        this.roomList = roomList;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactTitle() {
        return contactTitle;
    }

    public void setContactTitle(String contactTitle) {
        this.contactTitle = contactTitle;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public Location getAddress() {
        return address;
    }

    public void setAddress(Location address) {
        this.address = address;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Room> getRoomList() {
        return roomList;
    }

    public void setRoomList(List<Room> roomList) {
        this.roomList = roomList;
    }

    // @OneToMany
    // @JoinColumn(name = "hotel_mess_id")
    // private HotelMess hotelMessId;
}
