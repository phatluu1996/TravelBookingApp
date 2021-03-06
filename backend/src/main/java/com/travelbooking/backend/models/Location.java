package com.travelbooking.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.sun.org.apache.xpath.internal.operations.Bool;
import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
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
    @JsonIgnoreProperties({"province"})
    private District district;


    @ManyToOne
    @JoinColumn(name = "ward_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"district","province"})
    private Ward ward;

    @Column(name = "retired", nullable = true)
    private Boolean retired;

    public Location(Long id, String street, String postalCode, Province province, District district, Ward ward, Boolean retired) {
        this.id = id;
        this.street = street;
        this.postalCode = postalCode;
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.retired = retired;
    }
    public Location(Location location) {
        this.id = location.getId();
        this.street = location.getStreet();
        this.postalCode = location.getPostalCode();
        this.province = location.getProvince();
        this.district = location.getDistrict();
        this.ward = location.getWard();
        this.retired = location.isRetired();
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

    public Boolean isRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }
}