package com.travelbooking.backend.BookingService;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.travelbooking.backend.config.EmailConfiguration;
import com.travelbooking.backend.config.PdfGenerator;
import com.travelbooking.backend.config.PdfGeneratorUtil;
import com.travelbooking.backend.config.SendEmailItinerary;
import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.transaction.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailConfiguration emailConfiguration;

    @Override
    public FlightBooking bookFlight(BookingRequest bookingRequest) throws Exception {
        // make payment here
        // if the payment is successful proceed..
        Long flightId=bookingRequest.getFlightId();
        Optional<Flight> flightOptional=flightRepository.findById(flightId);
        Flight flight=flightOptional.get();

        //Add Passenger
        Passenger passenger = new Passenger();
        passenger.setFirstname(bookingRequest.getFirstname());
        passenger.setLastname(bookingRequest.getLastname());
        passenger.setCardIdNumber(bookingRequest.getCardId());
        passenger.setCardExpired(bookingRequest.getCardExpired());
        passenger.setBirthday(bookingRequest.getBirthday());
        passenger.setGender(bookingRequest.getGender());
        passenger.setCardType(bookingRequest.getCardType());
        passenger.setHasInfant(bookingRequest.isHasInfant());
        passengerRepository.save(passenger);

        // Add Booking
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

        //Add Booking Detail
        FlightBookingDetail detail=new FlightBookingDetail();
        detail.setFlight(flight);
        detail.setPassenger(passenger);
        detail.setFlightBooking(fltBooking);
        String randomTicket = randomNumber(13);
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

        // If has Return flight
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

        mapAndSaveToPDF(savedBooking, bkgDetail, user);

//        pdfGenerator.generateItinerary(savedBooking,filePath);
//        emailUtil.sendItinerary(user.getEmail(),filePath);

//        String qrcodePath = "src/main/resources/static/images/" + savedBooking.getId() + "-QRCode.png";
//        QRCodeWriter qrCodeWriter = new QRCodeWriter();
//        BitMatrix bitMatrix = qrCodeWriter.encode(savedBooking.getReservationCode()+"\n"+
//                flight.getFlightCode()+" "+detail.getDateOfDeparture() + "\n" + passenger.getFirstname()+" "+
//                passenger.getLastname()+" TKT:"+detail.getTicketNumber() , BarcodeFormat.QR_CODE, 300, 300);
//        Path path = FileSystems.getDefault().getPath(qrcodePath);
//        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

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

    public void mapAndSaveToPDF(FlightBooking flightBooking, FlightBookingDetail flightBookingDetail, User user) throws Exception{
        Map<String, Object > data = new HashMap<>();
        data.put("flightBooking", flightBooking);
        data.put("flightDetails", flightBooking.getFlightBookingDetails());

        File pdfAttachment = pdfGenaratorUtil.createPdf("itinerary",data, ITINERARY_DIR, emailUtil, user);

        Map<String, Object > emailMap = new HashMap<>();
        emailMap.put("user", user);
        String templateHtml = emailService.templateResolve("thankyouemail", emailMap);
        emailService.sendSimpleMessage(user.getEmail(),null, "Flight Itinerary", templateHtml, "Invoice.pdf", pdfAttachment);
    }


}

