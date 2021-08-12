package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;


@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking,Long>,JpaSpecificationExecutor {

    @Query("SELECT COUNT(BOOK.id) FROM HotelBooking BOOK\n" +
            "WHERE CONVERT (Date, BOOK.createdAt) = CONVERT (DATE, SYSDATETIME())\n" +
            "AND EXISTS (SELECT 1 FROM HotelBookingDetail DETAIL\n" +
                            "WHERE BOOK.id = DETAIL.hotelBooking.id\n" +
                            "AND EXISTS (SELECT 1 FROM HotelBookingRoom BOOK_ROOM\n" +
                                        "WHERE DETAIL.id = BOOK_ROOM.hotelBookingDetail.id\n" +
                                        "AND EXISTS (SELECT 1 FROM Room R\n" +
                                                    "WHERE BOOK_ROOM.room = R.id\n" +
                                                    "AND R.hotel.id = :id)))")
    int countBookingPerDateByHotelId (@Param("id")Long id);

    @Query("SELECT BOOK FROM HotelBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM HotelBookingDetail DETAIL\n" +
                            "WHERE BOOK.id = DETAIL.hotelBooking.id\n" +
                            "AND EXISTS (SELECT 1 FROM HotelBookingRoom BOOK_ROOM\n" +
                                        "WHERE DETAIL.id = BOOK_ROOM.hotelBookingDetail.id\n" +
                                        "AND EXISTS (SELECT 1 FROM Room R\n" +
                                                    "WHERE BOOK_ROOM.room.id = R.id\n" +
                                                    "AND R.hotel.id = :id)))")
    Collection<HotelBooking> getAllBookingByHotelId(@Param("id")Long id);

    @Query("SELECT ISNULL(SUM(ISNULL(BOOK.totalPrice,0)),0) FROM HotelBooking BOOK\n" +
            "WHERE CONVERT(DATE, BOOK.createdAt) = CONVERT (DATE, SYSDATETIME())\n" +
                "AND EXISTS (SELECT 1 FROM HotelBookingDetail DETAIL\n" +
                            "WHERE BOOK.id = DETAIL.hotelBooking.id\n" +
                            "AND EXISTS (SELECT 1 FROM HotelBookingRoom BOOK_ROOM\n" +
                                        "WHERE DETAIL.id = BOOK_ROOM.hotelBookingDetail.id\n" +
                                        "AND EXISTS (SELECT 1 FROM Room R\n" +
                                                    "WHERE BOOK_ROOM.room.id = R.id\n" +
                                                    "AND R.hotel.id = :id)))")
    float totalDailyIncomeByHotel(@Param("id")Long id);

    @Query("SELECT ISNULL(SUM(ISNULL(BOOK.totalPrice,0)),0) FROM HotelBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM HotelBookingDetail DETAIL\n" +
                        "WHERE BOOK.id = DETAIL.hotelBooking.id\n" +
                        "AND EXISTS (SELECT 1 FROM HotelBookingRoom BOOK_ROOM\n" +
                                    "WHERE DETAIL.id = BOOK_ROOM.hotelBookingDetail.id\n" +
                                    "AND EXISTS (SELECT 1 FROM Room R\n" +
                                                "WHERE BOOK_ROOM.room.id = R.id\n" +
                                                "AND R.hotel.id = 1)))")
    float totalRevenueByHotelId(@Param("id")Long id);
}
