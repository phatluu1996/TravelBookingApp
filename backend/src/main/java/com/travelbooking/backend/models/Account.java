package com.travelbooking.backend.models;

import javax.persistence.*;

@Table
public class Account {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String userName;
    @Column
    private String password;
    @Column
    private int role;

    public Account() {
    }

    public Account(Long id, String userName, String password, int role) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }
}
