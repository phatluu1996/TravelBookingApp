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
    @Column(name = "number_of_room")
    private int numberOfRoom;
    @OneToOne
    @JoinColumn(name = "passenger_id", referencedColumnName = "id")
    private Passenger passenger;
    @OneToOne
    @JoinColumn(name = "hotel_booking_id",referencedColumnName = "id")
    private HotelBooking hotelBooking;

    @OneToMany
    @JoinColumn(name = "hotel_booking_detail_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelBookingDetail")
    private List<HotelBookingRoom> hotelBookingRooms;

    public HotelBookingDetail() {
    }

    public HotelBookingDetail(Long id, int numberOfRoom, Passenger passenger, HotelBooking hotelBooking, List<HotelBookingRoom> hotelBookingRooms) {
        this.id = id;
        this.numberOfRoom = numberOfRoom;
        this.passenger = passenger;
        this.hotelBooking = hotelBooking;
        this.hotelBookingRooms = hotelBookingRooms;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumberOfRoom() {
        return numberOfRoom;
    }

    public void setNumberOfRoom(int numberOfRoom) {
        this.numberOfRoom = numberOfRoom;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
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
