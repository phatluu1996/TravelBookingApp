package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking,Long>,JpaSpecificationExecutor {
    List<HotelBooking> getHotelBookingsByUser(User user);

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
                                                "AND R.hotel.id = :id)))")
    float totalRevenueByHotelId(@Param("id")Long id);
    
    @Query(value = "WITH CTE AS\n" +
            "(SELECT CONVERT(DATE,GETDATE()) AS N\n" +
            "UNION ALL\n" +
            "SELECT DATEADD(DAY,-1,N) FROM CTE WHERE DATEADD(DD,-1,N)> DATEADD(MONTH, -1, GETDATE()))\n" +
            "SELECT CTE.N, BOOKING.PRICE FROM CTE LEFT JOIN (SELECT ISNULL(SUM(BOOK.total_price), 0) PRICE,  CONVERT(DATE,BOOK.created_at) CRE_DT FROM HOTEL_BOOKING BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM HOTEL_BOOKING_DETAIL DETAIL\n" +
            "WHERE BOOK.id = DETAIL.hotel_booking_id\n" +
            "AND EXISTS (SELECT 1 FROM HOTEL_BOOKING_ROOM BOOK_ROOM\n" +
            "WHERE DETAIL.ID = BOOK_ROOM.HOTEL_BOOKING_DETAIL_ID\n" +
            "AND EXISTS (SELECT 1 FROM ROOM R\n" +
            "WHERE BOOK_ROOM.ROOM_ID = R.ID\n" +
            "AND R.hotel_id = :hotelId)))\n" +
            "GROUP BY CONVERT(DATE,BOOK.created_at)) BOOKING ON CTE.N = CONVERT(DATE,booking.CRE_DT)\n" +
            "ORDER BY CTE.N", nativeQuery = true)
    Collection reportMonthByHotel(@Param("hotelId")Long id);

    @Query(value = "SELECT ISNULL(SUM(ISNULL(total_price,0)),0) FROM hotel_booking",nativeQuery = true)
    float totalHotelBookingAmount();

    @Query(value = "SELECT ISNULL(SUM(ISNULL(BOOK.total_price,0)),0) DAILY FROM HOTEL_BOOKING BOOK\n" +
            "WHERE CONVERT (DATE, ISNULL(BOOK.created_at, '1900-01-01')) = CONVERT (DATE, SYSDATETIME())", nativeQuery = true)
    float dailyIncomeAdminRP();

    @Query(value = "WITH CTE AS\n" +
            "(SELECT GETDATE() AS N\n" +
            "UNION ALL\n" +
            "SELECT DATEADD(MONTH,-1,N) FROM CTE WHERE DATEADD(MONTH, -1 ,N)> DATEADD(YEAR, -1, GETDATE()))\n" +
            "SELECT ISNULL(SUM(ISNULL(BOOKING.TOTAL_PRICE, 0)),0) AMOUNT FROM CTE LEFT JOIN HOTEL_BOOKING BOOKING ON MONTH(BOOKING.CREATED_AT) = MONTH(CTE.N) AND YEAR(BOOKING.created_at) = YEAR(CTE.N)\n" +
            "GROUP BY CONVERT(DATE,CTE.N)\n" +
            "ORDER BY CONVERT(DATE,CTE.N)", nativeQuery = true)
    Collection getAllAmonthPerMonth();
}
