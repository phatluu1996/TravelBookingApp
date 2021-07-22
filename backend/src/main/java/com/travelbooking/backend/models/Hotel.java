package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Date;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "hotel")
public class Hotel {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "hotel_name")
    private String hotelName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private int phone;
    @Column(name = "contact_name",columnDefinition = "nvarchar(150)")
    private String contactName;
    @Column(name = "contact_title",columnDefinition = "nvarchar(255)")
    private String contactTitle;
    @Column(name = "number_of_rooms")
    private int numberOfRooms;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name = "retired", nullable = true)
    private Boolean retired;
    @Column(name = "standard",columnDefinition = "nvarchar(50)")
    private String standard;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @OneToMany
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotel")
    private List<Room> rooms;

    public Hotel() {
    }
            
    public Hotel(Long id, String hotelName, String email, int phone, String contactName, String contactTitle, int numberOfRooms, Date createDate, Boolean retired, String standard, Location location, Account account, List<Room> rooms) {
        this.id = id;
        this.hotelName = hotelName;
        this.email = email;
        this.phone = phone;
        this.contactName = contactName;
        this.contactTitle = contactTitle;
        this.numberOfRooms = numberOfRooms;
        this.createDate = createDate;
        this.retired = retired;
        this.standard = standard;
        this.location = location;
        this.account = account;
        this.rooms = rooms;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }
}
