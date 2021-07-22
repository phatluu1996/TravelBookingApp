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
    @Column(name = "room_type")
    private int roomType;
    @Column(name = "number_of_room")
    private int numberOfRoom;

    @OneToOne
    @JoinColumn(name = "hotel_booking_id",referencedColumnName = "id")
    private HotelBooking hotelBooking;

    @OneToMany
    @JoinColumn(name = "hotel_booking_detail_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotelBookingDetail")
    private List<HotelBookingRoom> hotelBookingRooms;

    public HotelBookingDetail() {
    }

    public HotelBookingDetail(Long id, int roomType, int numberOfRoom, HotelBooking bkgHotel, List<Room> rooms) {
        this.id = id;
        this.roomType = roomType;
        this.numberOfRoom = numberOfRoom;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getRoomType() {
        return roomType;
    }
    public void setRoomType(int roomType) {
        this.roomType = roomType;
    }
    public int getNumberOfRoom() {
        return numberOfRoom;
    }
    public void setNumberOfRoom(int numberOfRoom) {
        this.numberOfRoom = numberOfRoom;
    }
}
