package com.travelbooking.backend.models;


import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @Column(name = "id")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street", length = 500)
    @Type(type="org.hibernate.type.StringNVarcharType")
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

    public Location(Long id, String street, String postalCode, Province province, District district, Ward ward) {
        this.id = id;
        this.street = street;
        this.postalCode = postalCode;
        this.province = province;
        this.district = district;
        this.ward = ward;
    }

    public Location() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }
}
