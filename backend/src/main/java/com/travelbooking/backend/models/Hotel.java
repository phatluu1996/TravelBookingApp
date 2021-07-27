package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Date;
import java.time.Instant;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "hotel")
public class Hotel {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "hotel_name",columnDefinition = "nvarchar(150)")
    private String hotelName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private int phone;
    @Column(name = "contact_name",columnDefinition = "nvarchar(150)")
    private String contactName;
    @Column(name = "contact_title",columnDefinition = "nvarchar(255)")
    private String contactTitle;
    @Column(name = "address",columnDefinition = "nvarchar(255)")
    private String address;

    @Column(name = "created_at", nullable = false)
    @CreatedDate
    private Instant createdAt;
    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @OneToMany
    @JoinColumn(name = "feed_back_id",referencedColumnName = "id")
    @JsonIgnoreProperties("hotel")
    private List<HotelFeedBack> hotelFeedBacks;

    @OneToMany
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotel")
    private List<Room> rooms;

    @OneToMany
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotel")
    private List<Image> images;

    public Hotel() {
    }

    public Hotel(Long id, String hotelName, String email, int phone, String contactName, String contactTitle, String address, Instant createdAt, Boolean retired, Location location, Account account, List<HotelFeedBack> hotelFeedBacks, List<Room> rooms) {
        this.id = id;
        this.hotelName = hotelName;
        this.email = email;
        this.phone = phone;
        this.contactName = contactName;
        this.contactTitle = contactTitle;
        this.address = address;
        this.createdAt = createdAt;
        this.retired = retired;
        this.location = location;
        this.account = account;
        this.hotelFeedBacks = hotelFeedBacks;
        this.rooms = rooms;
    }

    public List<HotelFeedBack> getHotelFeedBacks() {
        return hotelFeedBacks;
    }

    public void setHotelFeedBacks(List<HotelFeedBack> hotelFeedBacks) {
        this.hotelFeedBacks = hotelFeedBacks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }
}
