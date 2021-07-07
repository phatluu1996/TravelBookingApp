package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "province")
public class Province {
    @Id
    @Column(name = "id")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50)
    @Type(type="org.hibernate.type.StringNVarcharType")
    private String name;

    @Column(name = "code", length = 20)
    private String code;

    @OneToMany
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    @JsonIgnoreProperties("province")
    private List<District> districts;

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }

    public Province() {
    }

    public Province(Long id, String name, String code, List<District> districts) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.districts = districts;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
