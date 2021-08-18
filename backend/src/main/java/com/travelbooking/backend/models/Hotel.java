package com.travelbooking.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.time.Instant;
import java.util.List;
import javax.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "hotel")
public class Hotel {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "hotel_name",columnDefinition = "nvarchar(150)")
    private String hotelName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "contact_name",columnDefinition = "nvarchar(150)")
    private String contactName;
    @Column(name = "contact_title",columnDefinition = "nvarchar(255)")
    private String contactTitle;

    @Column(name = "hotel_rating",nullable = true)
    private Float hotelRating;

    @Column(name = "description",columnDefinition = "nvarchar(max)",nullable = true)
    private String description;

    @Column(name = "payment_at_the_hotel")
    private Boolean paymentAtTheHotel;

    @Column(name = "number_of_room",nullable = false)
    private int  numberOfRoom;

    @Column(name = "avg_price_at_night",columnDefinition = "integer default 0")
    private int  avgPriceAtNight;

    @Column(name = "high_speed_internet")
    private boolean  highSpeedInternet;

    @Column(name = "entertaiment")
    private boolean  entertaiment;

    @Column(name = "freeParking")
    private boolean  freeParking;

    @Column(name = "pets_allowed")
    private boolean  petsAllowed;

    @Column(name = "hot_tub")
    private boolean  hotTub;

    @Column(name = "swimming_pool")
    private boolean  swimmingPool;

    @Column(name = "gym")
    private boolean  gym;

    @Column(name = "created_at")
    @CreatedDate
    private Instant createdAt;

    @Column(name = "retired", nullable = true)
    private Boolean retired;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @OneToMany
    @JoinColumn(name = "hotel_id",referencedColumnName = "id")
    @JsonIgnoreProperties(value = "hotel", allowSetters=true)
    private List<HotelFeedBack> hotelFeedBacks;

    @OneToMany
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotel")
    private List<Room> rooms;

    @OneToMany
    @JoinColumn(name = "hotel_id", referencedColumnName = "id")
    @JsonIgnoreProperties("hotel")
    private List<Image> images;

    public Hotel() {
    }

    public Hotel(Long id, String hotelName, String email, String phone, String contactName, String contactTitle, Float hotelRating, String description, Boolean paymentAtTheHotel, int numberOfRoom, int avgPriceAtNight, boolean highSpeedInternet, boolean entertaiment, boolean freeParking, boolean petsAllowed, boolean hotTub, boolean swimmingPool, boolean gym, Instant createdAt, Boolean retired, Location location, Account account, List<HotelFeedBack> hotelFeedBacks, List<Room> rooms, List<Image> images) {
        this.id = id;
        this.hotelName = hotelName;
        this.email = email;
        this.phone = phone;
        this.contactName = contactName;
        this.contactTitle = contactTitle;
        this.hotelRating = hotelRating;
        this.description = description;
        this.paymentAtTheHotel = paymentAtTheHotel;
        this.numberOfRoom = numberOfRoom;
        this.avgPriceAtNight = avgPriceAtNight;
        this.highSpeedInternet = highSpeedInternet;
        this.entertaiment = entertaiment;
        this.freeParking = freeParking;
        this.petsAllowed = petsAllowed;
        this.hotTub = hotTub;
        this.swimmingPool = swimmingPool;
        this.gym = gym;
        this.createdAt = createdAt;
        this.retired = retired;
        this.location = location;
        this.account = account;
        this.hotelFeedBacks = hotelFeedBacks;
        this.rooms = rooms;
        this.images = images;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactTitle() {
        return contactTitle;
    }

    public void setContactTitle(String contactTitle) {
        this.contactTitle = contactTitle;
    }

    public Float getHotelRating() {
        return hotelRating;
    }

    public void setHotelRating(Float hotelRating) {
        this.hotelRating = hotelRating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPaymentAtTheHotel() {
        return paymentAtTheHotel;
    }

    public void setPaymentAtTheHotel(Boolean paymentAtTheHotel) {
        this.paymentAtTheHotel = paymentAtTheHotel;
    }

    public int getNumberOfRoom() {
        return numberOfRoom;
    }

    public void setNumberOfRoom(int numberOfRoom) {
        this.numberOfRoom = numberOfRoom;
    }

    public int getAvgPriceAtNight() {
        return avgPriceAtNight;
    }

    public void setAvgPriceAtNight(int avgPriceAtNight) {
        this.avgPriceAtNight = avgPriceAtNight;
    }

    public boolean isHighSpeedInternet() {
        return highSpeedInternet;
    }

    public void setHighSpeedInternet(boolean highSpeedInternet) {
        this.highSpeedInternet = highSpeedInternet;
    }

    public boolean isEntertaiment() {
        return entertaiment;
    }

    public void setEntertaiment(boolean entertaiment) {
        this.entertaiment = entertaiment;
    }

    public boolean isFreeParking() {
        return freeParking;
    }

    public void setFreeParking(boolean freeParking) {
        this.freeParking = freeParking;
    }

    public boolean isPetsAllowed() {
        return petsAllowed;
    }

    public void setPetsAllowed(boolean petsAllowed) {
        this.petsAllowed = petsAllowed;
    }

    public boolean isHotTub() {
        return hotTub;
    }

    public void setHotTub(boolean hotTub) {
        this.hotTub = hotTub;
    }

    public boolean isSwimmingPool() {
        return swimmingPool;
    }

    public void setSwimmingPool(boolean swimmingPool) {
        this.swimmingPool = swimmingPool;
    }

    public boolean isGym() {
        return gym;
    }

    public void setGym(boolean gym) {
        this.gym = gym;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getRetired() {
        return retired;
    }

    public void setRetired(Boolean retired) {
        this.retired = retired;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<HotelFeedBack> getHotelFeedBacks() {
        return hotelFeedBacks;
    }

    public void setHotelFeedBacks(List<HotelFeedBack> hotelFeedBacks) {
        this.hotelFeedBacks = hotelFeedBacks;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
