package com.travelbooking.backend.BookingService;

import com.travelbooking.backend.config.PdfGenerator;
import com.travelbooking.backend.config.PdfGeneratorUtil;
import com.travelbooking.backend.config.SendEmailItinerary;
import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.util.*;

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

    @Autowired
    PdfGeneratorUtil pdfGenaratorUtil;

    @Override
    public FlightBooking bookFlight(BookingRequest bookingRequest) throws Exception {
        // make payment here
        // if the payment is successful proceed..
        Long flightId=bookingRequest.getFlightId();
        Optional<Flight> flightOptional=flightRepository.findById(flightId);
        Flight flight=flightOptional.get();

        Passenger passenger = new Passenger();
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
        fltBooking.setPaymentMethod(bookingRequest.getPaymentMethod());

        FlightBookingDetail detail=new FlightBookingDetail();
        detail.setFlight(flight);
        detail.setPassenger(passenger);
        detail.setFlightBooking(fltBooking);
        String randomTicket = randomNumber(12);
        detail.setTicketNumber(randomTicket);
        detail.setDateOfDeparture(bookingRequest.getDateBooking());
        detail.setPriceType(bookingRequest.getType());
        if (bookingRequest.getType() == 0) {
            detail.setPrice(flight.getEconomyPrice());
        } else {
            detail.setPrice(flight.getBusinessPrice());
        }
        FlightBookingDetail bkgDetail = flightBookingDetailRepository.save(detail);
        ArrayList<FlightBookingDetail> detailList = new ArrayList<>();
        detailList.add(bkgDetail);

        if (bookingRequest.getReturnFlightId() != 0){
            Long returnFlightId=bookingRequest.getReturnFlightId();
            Optional<Flight> returnFlightOptional=flightRepository.findById(returnFlightId);
            Flight returnFlight=returnFlightOptional.get();
            FlightBookingDetail returnDetail = new FlightBookingDetail();
            returnDetail.setFlight(returnFlight);
            returnDetail.setPassenger(passenger);
            returnDetail.setFlightBooking(fltBooking);
            returnDetail.setDateOfDeparture(bookingRequest.getDateReturnBooking());
            returnDetail.setTicketNumber(String.valueOf(parseInt(randomTicket)+2));
            returnDetail.setPriceType(bookingRequest.getReturnType());
            if (returnDetail.getPriceType() == 0) {
                returnDetail.setPrice(returnFlight.getEconomyPrice());
            } else {
                returnDetail.setPrice(returnFlight.getBusinessPrice());
            }
            FlightBookingDetail returnBkgDetail = flightBookingDetailRepository.save(returnDetail);
            detailList.add(returnBkgDetail);
        }
        fltBooking.setFlightBookingDetails(detailList);;

        final FlightBooking savedBooking = flightBookingRepository.save(fltBooking);

        Map<Object, Object > data = new HashMap<>();
        data.put("booking", savedBooking);
        data.put("detailFlight", bkgDetail);
        pdfGenaratorUtil.createPdf("itinerary",data);
//        String filePath = ITINERARY_DIR +savedBooking.getId()
//                + ".pdf";
//        pdfGenerator.generateItinerary(savedBooking,filePath);
//        emailUtil.sendItinerary(user.getEmail(),filePath);

        return savedBooking;

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

