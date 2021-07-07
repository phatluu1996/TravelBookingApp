package com.travelbooking.backend.models;
import javax.persistence.*;


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
    @JoinColumn(name = "room",referencedColumnName = "room_id")
    private Room room;
    @OneToOne
    @JoinColumn(name = "user",referencedColumnName = "id")
    private Account user;
    public RoomRating() {
    }
    public RoomRating(Long id, double rating, String feedback, Room room, Account user) {
        this.id = id;
        this.rating = rating;
        this.feedback = feedback;
        this.room = room;
        this.user = user;
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
        return user;
    }
    public void setUser(Account user) {
        this.user = user;
    }
    
}
