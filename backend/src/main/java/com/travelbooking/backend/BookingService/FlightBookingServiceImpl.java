package com.travelbooking.backend.BookingService;

import com.travelbooking.backend.BookingService.BookingRequest;
import com.travelbooking.backend.BookingService.FlightBookingService;
import com.travelbooking.backend.config.PdfGenerator;
import com.travelbooking.backend.config.SendEmailItinerary;
import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
@Transactional
public class FlightBookingServiceImpl implements FlightBookingService{

    @Value("${com.travelbooking.backend.itinerary.dirpath}")
    private String ITINERARY_DIR;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightBookingDetailRepository flightBookingDetailRepository;

    @Autowired
    private FlightBookingRepository flightBookingRepository;

    @Autowired
    private PdfGenerator pdfGenerator;

    @Autowired
    private SendEmailItinerary emailUtil;


    @Override
    public FlightBooking bookFlight(BookingRequest bookingRequest)  {
        // make payment here
        // if the payment is successful proceed..
        Long flightId1=bookingRequest.getFlightId1();
        Optional<Flight> flightOptional1=flightRepository.findById(flightId1);
        Flight flight1=flightOptional1.get();

        Passenger passenger=new Passenger();
        passenger.setFirstname(bookingRequest.getFirstname());
        passenger.setLastname(bookingRequest.getLastname());
        passenger.setCardIdNumber(bookingRequest.getCardId());
        passenger.setCardExpired(bookingRequest.getCardExpired());
        passenger.setBirthday(bookingRequest.getBirthday());
        passenger.setGender(bookingRequest.getGender());
        passenger.setCardType(bookingRequest.getCardType());
        passengerRepository.save(passenger);

        Optional<User> userOptional = userRepository.findById(bookingRequest.getUserId());
        User user = userOptional.get();
        FlightBooking fltBooking = new FlightBooking();
        String code = randomString(8);
        fltBooking.setReservationCode(code);
        fltBooking.setUser(user);
        fltBooking.setTotalPassengers(bookingRequest.getTotalPassenger());
        fltBooking.setTotalPrice(bookingRequest.getTotalPrice());
        fltBooking.setStatus(1);

        FlightBookingDetail detail=new FlightBookingDetail();
        detail.setFlight(flight1);
        detail.setPassenger(passenger);
        detail.setFlightBooking(fltBooking);
        String randomTicket = randomNumber(12);
        detail.setTicketNumber(randomTicket);
        detail.setPriceType(bookingRequest.getType());
        if (detail.getPriceType() == 0) {
            detail.setPrice(flight1.getEconomyPrice());
        } else {
            detail.setPrice(flight1.getBusinessPrice());
        }
        flightBookingDetailRepository.save(detail);
//        final FlightBooking savedBooking = FlightBookingRepository.save(fltBooking);

        if (bookingRequest.getFlightId2()!=0){
            Long flightId2=bookingRequest.getFlightId2();
            Optional<Flight> flightOptional2=flightRepository.findById(flightId2);
            Flight flight2=flightOptional2.get();
            FlightBookingDetail detail2 = new FlightBookingDetail();
            detail2.setFlight(flight2);
            detail2.setPassenger(passenger);
            detail2.setFlightBooking(fltBooking);
            detail2.setTicketNumber(String.valueOf(parseInt(randomTicket)+2));
            detail2.setPriceType(bookingRequest.getType());
            if (detail2.getPriceType() == 0) {
                detail2.setPrice(flight2.getEconomyPrice());
            } else {
                detail2.setPrice(flight2.getBusinessPrice());
            }
            flightBookingDetailRepository.save(detail);
        }


        String filePath = ITINERARY_DIR + fltBooking.getId()
                + ".pdf";
        pdfGenerator.generateItinerary(fltBooking,filePath);
//        emailUtil.sendItinerary(user.getEmail(),filePath);

        return fltBooking;

    }

    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static final String CD = "0123456789";
    static SecureRandom rnd = new SecureRandom();

    String randomString(int len){
        StringBuilder sb = new StringBuilder(len);
        for(int i = 0; i < len; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }
    String randomNumber(int len){
        StringBuilder sb = new StringBuilder(len);
        for(int i = 0; i < len; i++)
            sb.append(CD.charAt(rnd.nextInt(CD.length())));
        return sb.toString();
    }

}

