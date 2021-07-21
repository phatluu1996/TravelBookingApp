package com.travelbooking.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "room_rating")
public class RoomRating {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "rating")
    private double rating;
    @Column(name = "feedback")
    private String feedback;
    @ManyToOne
    @JoinColumn(name = "room_id",referencedColumnName = "id")
    @JsonIgnoreProperties("ratings")
    private Room room;

    @OneToOne
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    private Account account;
    public RoomRating() {
    }
    public RoomRating(Long id, double rating, String feedback, Room room, Account user) {
        this.id = id;
        this.rating = rating;
        this.feedback = feedback;
        this.room = room;
        this.account = user;
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
    public Room getRoom() {
        return room;
    }
    public void setRoom(Room room) {
        this.room = room;
    }
    public Account getUser() {
        return account;
    }
    public void setUser(Account user) {
        this.account = user;
    }
    
}
