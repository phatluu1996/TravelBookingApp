package com.travelbooking.backend.models;
import javax.persistence.*;
import java.util.List;


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
    @JoinColumn(name = "bkg_hotel",referencedColumnName = "id")
    private HotelBooking bkgHotel;
    @OneToMany
    @JoinColumn(name = "rooms",referencedColumnName = "room_id")
    List<Room> rooms;
    public HotelBookingDetail() {
    }
    public HotelBookingDetail(Long id, int roomType, int numberOfRoom, HotelBooking bkgHotel, List<Room> rooms) {
        this.id = id;
        this.roomType = roomType;
        this.numberOfRoom = numberOfRoom;
        this.bkgHotel = bkgHotel;
        this.rooms = rooms;
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
    public HotelBooking getBkgHotel() {
        return bkgHotel;
    }
    public void setBkgHotel(HotelBooking bkgHotel) {
        this.bkgHotel = bkgHotel;
    }
    public List<Room> getRooms() {
        return rooms;
    }
    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }
    
}
