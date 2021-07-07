package com.travelbooking.backend.models;

import org.hibernate.annotations.Type;

import javax.persistence.*;

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

    public Province() {
    }

    public Province(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
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
