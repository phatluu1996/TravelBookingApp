package com.travelbooking.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_name", length = 50)
    private String userName;
    @Column(name = "password", length = 255)
    private String password;
    @Column(name = "role", length = 20)
    private String role;
    @Column(name = "retired", nullable = true)
    private boolean retired;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Account() {
    }

    public Account(Long id, String userName, String password, String role, boolean retired, User user) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.retired = retired;
        this.user = user;
    }

    public Account(String userName, String password, User user) {
        this.userName = userName;
        this.password = password;
        this.user = user;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isRetired() {
        return retired;
    }

    public void setRetired(boolean retired) {
        this.retired = retired;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
