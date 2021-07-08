package com.travelbooking.backend.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "passenger")
public class Passenger {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "gender")
    private boolean gender;

    @Column(name = "card_id_number")
    private String cardIdNumber;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "card_expired")
    private Date cardExpired;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    public Passenger() {
    }

    public Passenger(Long id, String firstname, String lastname, Date birthday, boolean gender, String cardIdNumber, String cardType, Date cardExpired, boolean retired) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.gender = gender;
        this.cardIdNumber = cardIdNumber;
        this.cardType = cardType;
        this.cardExpired = cardExpired;
        this.retired = retired;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getCardIdNumber() {
        return cardIdNumber;
    }

    public void setCardIdNumber(String cardIdNumber) {
        this.cardIdNumber = cardIdNumber;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public Date getCardExpired() {
        return cardExpired;
    }

    public void setCardExpired(Date cardExpired) {
        this.cardExpired = cardExpired;
    }
}
