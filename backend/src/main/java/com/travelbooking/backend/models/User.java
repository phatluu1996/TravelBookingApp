package com.travelbooking.backend.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "[user]")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name", length = 100, columnDefinition = "nvarchar(100)")
    private String firstName;
    @Column(name = "last_name", length = 100, columnDefinition = "nvarchar(100)")
    private String lastName;
    @Column(name = "gender", length = 20)
    private String gender;
    @Column(name = "birth_day", length = 20)
    private Date dateOfBirth;
    @Column(name = "email", length = 255)
    private String email;
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;
    @Column(name = "retired")
    private boolean retired;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private RoomRating roomRatings;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String gender, Date dateOfBirth, String email, String phoneNumber, boolean retired, Account account, Location location, RoomRating roomRatings) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.retired = retired;
        this.account = account;
        this.location = location;
        this.roomRatings = roomRatings;
    }

    public User(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public RoomRating getRoomRatings() {
        return roomRatings;
    }

    public void setRoomRatings(RoomRating roomRatings) {
        this.roomRatings = roomRatings;
    }
}
