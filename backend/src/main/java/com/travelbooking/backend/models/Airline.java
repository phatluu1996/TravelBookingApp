package com.travelbooking.backend.models;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "airline")
public class Airline {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "airline_name")
    private String airlineName;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "contact_title")
    private String contactTitle;

    @Column(name = "phone")
    private String phone;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "fax", nullable = true)
    private String fax;

    @Column(name = "homepage")
    private String homepage;

    @Column(name = "email")
    private String email;

    @Column(name = "created_at")
    @CreatedDate
    private Instant createdAt;

    @Column(name = "status", nullable = true)
    private boolean status;

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location address;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    private List<Flight> flights;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    public Airline() {
    }

    public Airline(Long id, String airlineName, String contactName, String contactTitle, String phone, String mobile, String fax, String homepage, String email, Instant createdAt, boolean status, Location address, Account account, List<Flight> flights, boolean retired) {
        this.id = id;
        this.airlineName = airlineName;
        this.contactName = contactName;
        this.contactTitle = contactTitle;
        this.phone = phone;
        this.mobile = mobile;
        this.fax = fax;
        this.homepage = homepage;
        this.email = email;
        this.createdAt = createdAt;
        this.status = status;
        this.address = address;
        this.account = account;
        this.flights = flights;
        this.retired = retired;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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
}