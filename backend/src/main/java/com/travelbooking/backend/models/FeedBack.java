package com.travelbooking.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "feedback")
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private int id;
    @Column(name = "fb_name")
    private String name;
    @Column(name = "fb_email")
    private String email;
    @Column(name = "sub_title")
    private String subTitle;
    @Column(name = "fb_message")
    private String message;

    public FeedBack() {
    }

    public FeedBack(int id, String name, String email, String subTitle, String message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subTitle = subTitle;
        this.message = message;
    }

    public FeedBack(String name, String email, String subTitle, String message) {
        this.name = name;
        this.email = email;
        this.subTitle = subTitle;
        this.message = message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
