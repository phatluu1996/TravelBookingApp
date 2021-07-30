package com.travelbooking.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "hotel_feedback")
public class HotelFeedBack {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "rating")
    private double rating;
    @Column(name = "feedback")
    private String feedback;
    @Column(name = "user_id")
    private  int userId;
    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @ManyToOne
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotel_feedback")
    private Hotel hotel;

    public HotelFeedBack() {
    }

    public HotelFeedBack(Long id, double rating, String feedback, int userId, Boolean retired, Hotel hotel) {
        this.id = id;
        this.rating = rating;
        this.feedback = feedback;
        this.userId = userId;
        this.retired = retired;
        this.hotel = hotel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}
