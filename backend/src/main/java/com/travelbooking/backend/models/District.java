package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "district")
public class District {
    @Id
    @Column(name = "id")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100)
    @Type(type="org.hibernate.type.StringNVarcharType")
    private String name;

    @Column(name = "prefix", length = 20)
    @Type(type="org.hibernate.type.StringNVarcharType")
    private String prefix;

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    @JsonIgnoreProperties("districts")
    private Province province;

    @OneToMany
    @JoinColumn(name = "district_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"province", "district"})
    private List<Ward> wards;

    @Column(name = "retired")
    private Boolean retired;

    public District(Long id, String name, String prefix, Province province, List<Ward> wards, Boolean retired) {
        this.id = id;
        this.name = name;
        this.prefix = prefix;
        this.province = province;
        this.wards = wards;
        this.retired = retired;
    }

    public Boolean isRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public District() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public List<Ward> getWards() {
        return wards;
    }

    public void setWards(List<Ward> wards) {
        this.wards = wards;
    }
}
