package com.travelbooking.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_name", length = 255)
    private String userName;
    @Column(name = "password", length = 30)
    private String password;
    @Column(name = "role")
    private int role;
    @Column(name = "retired")
    private boolean retired;

    public Account() {
    }

    public Account(Long id, String userName, String password, int role, boolean retired) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.retired = retired;
    }

    public Account(String userName, String password, int role, boolean retired) {
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.retired = retired;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }
}
