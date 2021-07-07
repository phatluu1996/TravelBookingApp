package com.travelbooking.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "district")
public class District {
    @Id
    @Column(name = "id")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "prefix", length = 20)
    private String prefix;

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    private Province province;
}
