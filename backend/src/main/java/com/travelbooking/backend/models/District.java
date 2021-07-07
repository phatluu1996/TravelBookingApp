package com.travelbooking.backend.models;

import org.hibernate.annotations.Type;

import javax.persistence.*;

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
    private Province province;

    public District() {
    }

    public District(Long id, String name, String prefix, Province province) {
        this.id = id;
        this.name = name;
        this.prefix = prefix;
        this.province = province;
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
}
