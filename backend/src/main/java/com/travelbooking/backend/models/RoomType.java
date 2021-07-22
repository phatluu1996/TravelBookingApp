package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "room_type")
public class RoomType {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "currency")
    private double currency;
    @Column(name = "max_adult")
    private int maxAdult;
    @Column(name = "max_children")
    private int maxChildren;
    @Column(name = "retired", nullable = true)
    private Boolean retired;

    public RoomType(long id, double currency, int maxAdult, int maxChildren, Boolean retired) {
        this.id = id;
        this.currency = currency;
        this.maxAdult = maxAdult;
        this.maxChildren = maxChildren;
        this.retired = retired;
    }

    public RoomType() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getCurrency() {
        return currency;
    }

    public void setCurrency(double currency) {
        this.currency = currency;
    }

    public int getMaxAdult() {
        return maxAdult;
    }

    public void setMaxAdult(int maxAdult) {
        this.maxAdult = maxAdult;
    }

    public int getMaxChildren() {
        return maxChildren;
    }

    public void setMaxChildren(int maxChildren) {
        this.maxChildren = maxChildren;
    }

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }
}
