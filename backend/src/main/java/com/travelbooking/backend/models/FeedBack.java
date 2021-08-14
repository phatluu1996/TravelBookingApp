package com.travelbooking.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "feedback")
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "fb_name", columnDefinition = "nvarchar(150)")
    private String name;
    @Column(name = "fb_email")
    private String email;
    @Column(name = "sub_title", columnDefinition = "nvarchar(150)")
    private String subTitle;
    @Column(name = "fb_message", columnDefinition = "nvarchar(max)")
    private String message;
    @Column(name = "fb_reply", columnDefinition = "nvarchar(max)")
    private String reply;

    public FeedBack() {
    }

    public FeedBack(Long id, String name, String email, String subTitle, String message, String reply) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subTitle = subTitle;
        this.message = message;
        this.reply = reply;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }
}
