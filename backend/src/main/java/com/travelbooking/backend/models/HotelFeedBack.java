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
    @Column(name = "feedback" , columnDefinition = "nvarchar(max)")
    private String feedback;


    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelFeedBacks")
    private  User user;

    @ManyToOne
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelFeedBacks")
    private Hotel hotel;


    public HotelFeedBack() {
    }

    public HotelFeedBack(Long id, double rating, String feedback, Boolean retired, User user, Hotel hotel) {
        this.id = id;
        this.rating = rating;
        this.feedback = feedback;
        this.retired = retired;
        this.user = user;
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

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}
