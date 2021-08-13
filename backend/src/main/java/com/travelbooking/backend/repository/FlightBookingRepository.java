package com.travelbooking.backend.repository;

import com.travelbooking.backend.models.Flight;
import com.travelbooking.backend.models.FlightBooking;
import com.travelbooking.backend.models.FlightBookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface FlightBookingRepository extends JpaRepository<FlightBooking, Long>, JpaSpecificationExecutor {

    @Query("SELECT BOOK FROM FlightBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM FlightBookingDetail DETAIL\n" +
                            "WHERE EXISTS (SELECT 1 FROM Flight F\n" +
                                            "WHERE DETAIL.flight.id = F.id\n" +
                                            "AND F.airline.id = :id)\n" +
                            "AND BOOK.id = DETAIL.flightBooking.id)\n" +
            "ORDER BY BOOK.createdAt DESC")
    Collection<FlightBooking> getAllBookingByAirlineId(@Param("id")Long id);

    @Query("SELECT ISNULL(SUM(ISNULL(BOOK.totalPrice,0)),0) FROM FlightBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM FlightBookingDetail DETAIL\n" +
                        "WHERE EXISTS (SELECT 1 FROM Flight F\n" +
                                    "WHERE DETAIL.flight.id = F.id\n" +
                                    "AND F.airline.id = :id)\n" +
                        "AND BOOK.id = DETAIL.flightBooking.id)\n" +
            "AND CONVERT (DATE,ISNULL( BOOK.createdAt,'1900-01-01 00:00:00')) = CONVERT (DATE, SYSDATETIME())")
    float totalDailyIncomeByAirline(@Param("id")Long id);

    @Query("SELECT ISNULL(SUM(ISNULL(BOOK.totalPrice,0)),0) FROM FlightBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM FlightBookingDetail DETAIL\n" +
                        "WHERE EXISTS (SELECT 1 FROM Flight F\n" +
                                    "WHERE DETAIL.flight.id = F.id\n" +
                                    "AND F.airline.id = :id)\n" +
                        "AND BOOK.id = DETAIL.flightBooking.id)")
    float totalRevenueByAirline(@Param("id")Long id);

    @Query("SELECT COUNT(BOOK) FROM FlightBooking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM FlightBookingDetail DETAIL\n" +
                        "WHERE EXISTS (SELECT 1 FROM Flight F\n" +
                                    "WHERE DETAIL.flight.id = F.id\n" +
                                    "AND F.airline.id = :id)\n" +
                        "AND BOOK.id = DETAIL.flightBooking.id)\n" +
            "AND CONVERT (DATE,ISNULL( BOOK.createdAt,'1900-01-01 00:00:00')) = CONVERT (DATE, SYSDATETIME())")
    int countBookingPerDayAirline(@Param("id")Long id);

    @Query(value = "WITH CTE AS\n" +
            "(SELECT CONVERT(DATE,GETDATE()) AS N\n" +
            "UNION ALL\n" +
            "SELECT DATEADD(DAY,-1,N) FROM CTE WHERE DATEADD(DD,-1,N)> DATEADD(MONTH, -1, GETDATE()))\n" +
            "SELECT CTE.N, BOOKING.PRICE FROM CTE LEFT JOIN (SELECT SUM(BOOK.total_price) PRICE, CONVERT(DATE,BOOK.created_at) CRE_DT FROM flight_booking BOOK\n" +
            "WHERE EXISTS (SELECT 1 FROM flight_booking_detail DETAIL\n" +
            "WHERE EXISTS (SELECT 1 FROM flight F\n" +
            "WHERE DETAIL.flight_id = F.id\n" +
            "AND F.airline_id = :airlineId)\n" +
            "AND BOOK.id = DETAIL.booking_id)\n" +
            "GROUP BY CONVERT(DATE,BOOK.created_at)) BOOKING ON CTE.N = CONVERT(DATE,booking.CRE_DT)\n" +
            "ORDER BY CTE.N",nativeQuery = true)
    Collection reportPerMonth(@Param("airlineId")Long id);
}
