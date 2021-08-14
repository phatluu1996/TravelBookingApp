package com.travelbooking.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "hotel_booking_detail") 
public class HotelBookingDetail {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "hotel_booking_id",referencedColumnName = "id")
    @JsonIgnoreProperties("hotelBookingDetail")
    private HotelBooking hotelBooking;

    @OneToMany
    @JoinColumn(name = "hotel_booking_detail_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelBookingDetail")
    private List<HotelBookingRoom> hotelBookingRooms;

    public HotelBookingDetail() {
    }

    public HotelBookingDetail(Long id, HotelBooking hotelBooking, List<HotelBookingRoom> hotelBookingRooms) {
        this.id = id;
        this.hotelBooking = hotelBooking;
        this.hotelBookingRooms = hotelBookingRooms;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HotelBooking getHotelBooking() {
        return hotelBooking;
    }

    public void setHotelBooking(HotelBooking hotelBooking) {
        this.hotelBooking = hotelBooking;
    }

    public List<HotelBookingRoom> getHotelBookingRooms() {
        return hotelBookingRooms;
    }

    public void setHotelBookingRooms(List<HotelBookingRoom> hotelBookingRooms) {
        this.hotelBookingRooms = hotelBookingRooms;
    }
}
