package com.travelbooking.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "province")
public class Province {
    @Id
    @Column(name = "id")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "code", length = 20)
    private String code;

}
