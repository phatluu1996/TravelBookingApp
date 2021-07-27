package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "room_type")
public class RoomType {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "room_type")
    private String roomType;
    @Column(name = "currency")
    private double currency;
    @Column(name = "max_adult")
    private int maxAdult;
    @Column(name = "max_children")
    private int maxChildren;
    @Column(name = "retired", nullable = true)
    private Boolean retired;
    @OneToMany
    @JoinColumn(name = "room_type_id", referencedColumnName = "id")
    @JsonIgnoreProperties("roomType")
    private List<Room> rooms;
}
