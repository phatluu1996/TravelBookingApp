package com.travelbooking.backend.models;


import javax.persistence.*;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @Column(name = "id")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street", length = 500)
    private String street;

    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "district_id", referencedColumnName = "id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "ward_id", referencedColumnName = "id")
    private Ward ward;
}
