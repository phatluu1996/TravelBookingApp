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

    @Column(name = "first_name", columnDefinition = "nvarchar(200)")
    private String firstname;

    @Column(name = "last_name", columnDefinition = "nvarchar(200)")
    private String lastname;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "gender")
    private boolean gender;

    @Column(name = "card_id_number")
    private String cardIdNumber;

    @Column(name = "card_type")//0: Cmnd, 1: Driver licenses, 2: Passport
    private int cardType;

    @Column(name = "card_expired")
    private Date cardExpired;

    @Column(name = "retired", nullable = true)
    private boolean retired;

    @Column(name = "has_infant", nullable = true)
    private boolean hasInfant;

    public Passenger() {
    }

    public Passenger(Long id, String firstname, String lastname, Date birthday, boolean gender, String cardIdNumber, int cardType, Date cardExpired, boolean retired, boolean hasInfant) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.gender = gender;
        this.cardIdNumber = cardIdNumber;
        this.cardType = cardType;
        this.cardExpired = cardExpired;
        this.retired = retired;
        this.hasInfant = hasInfant;
    }

    public int getCardType() {
        return cardType;
    }

    public boolean isHasInfant() {
        return hasInfant;
    }

    public void setHasInfant(boolean hasInfant) {
        this.hasInfant = hasInfant;
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

    public int getCardType(int cardType) {
        return this.cardType;
    }

    public void setCardType(int cardType) {
        this.cardType = cardType;
    }

    public Date getCardExpired() {
        return cardExpired;
    }

    public void setCardExpired(Date cardExpired) {
        this.cardExpired = cardExpired;
    }
}
