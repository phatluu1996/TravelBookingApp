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
    @Column(name = "reset_password", length = 255)
    private String resetPassword;

    public Account() {
    }

    public Account(Long id, String userName, String password, String role, boolean retired) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.retired = retired;
    }

    public Account(String userName, String password) {
        this.userName = userName;
        this.password = password;
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

    public String getResetPassword() {
        return resetPassword;
    }

    public void setResetPassword(String resetPassword) {
        this.resetPassword = resetPassword;
    }
}
