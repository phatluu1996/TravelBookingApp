package com.travelbooking.backend.BookingService;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.travelbooking.backend.config.EmailConfiguration;
import com.travelbooking.backend.config.PdfGeneratorUtil;
import com.travelbooking.backend.config.SendEmailItinerary;
import com.travelbooking.backend.models.*;
import com.travelbooking.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.security.SecureRandom;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
    private SendEmailItinerary emailUtil;

    @Autowired
    PdfGeneratorUtil pdfGenaratorUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailConfiguration emailConfiguration;

    public FlightBookingServiceImpl() {
    }

    @Override
    public FlightBooking bookFlight(BookingRequest bookingRequest) throws Exception {
        // find Flight
        Long flightId=bookingRequest.getFlightId();
        Optional<Flight> flightOptional=flightRepository.findById(flightId);
        Flight flight=flightOptional.get();

//        User user = userRepository.getByAccountId(user.getAccount().getId());
        // Add Booking
        User user= userRepository.getByAccountId(bookingRequest.getUserId());
//        User user = userOptional.get();
        FlightBooking fltBooking = new FlightBooking();
        String randomBookingCode = randomString(8);
        fltBooking.setBookingCode(randomBookingCode);
        fltBooking.setTotalPrice(bookingRequest.getTotalPrice());
        fltBooking.setStatus(1);
        fltBooking.setUser(user);
        fltBooking.setPaymentMethod(bookingRequest.getPaymentMethod());

        ArrayList<FlightBookingDetail> bookingDetailList = new ArrayList<>();

        String randomReservationCode = randomString(6);

        //Add Passenger
        bookingRequest.getPassengers().forEach( psg ->{
            Passenger passenger = new Passenger();
            passenger.setFirstname(psg.getFirstname());
            passenger.setLastname(psg.getLastname());
            passenger.setBirthday(psg.getBirthday());
            passenger.setGender(psg.isGender());
            passenger.setHasInfant(psg.isHasInfant());
            passenger.setBaggageExtra(psg.getBaggageExtra());
            passenger.setSeatNumber(psg.getSeatNumber());
            String randomTicket = randomNumber(13);
            passenger.setTicketNumber(randomTicket);
            Integer age = getAgeTravel(psg.getBirthday(),bookingRequest.getDateBooking());
            Float infantPrice = psg.isHasInfant() ? flight.getInfant_price() : 0;
            if (bookingRequest.getType() == 1){
                passenger.setPrice(flight.getBusinessPrice()+ infantPrice);
            } else if(age<12) {
                passenger.setPrice(flight.getChild_price()+ infantPrice);
            } else {
                passenger.setPrice(flight.getEconomyPrice() + infantPrice);
            }
            passengerRepository.save(passenger);

            //Add Booking Detail
            FlightBookingDetail detail=new FlightBookingDetail();
            detail.setFlight(flight);
            detail.setPassenger(passenger);
            detail.setFlightBooking(fltBooking);
            detail.setAirlineReservationCode(randomReservationCode);
            detail.setDateOfDeparture(bookingRequest.getDateBooking());
            detail.setPriceType(bookingRequest.getType());
            FlightBookingDetail bkgDetail = flightBookingDetailRepository.save(detail);
            bookingDetailList.add(bkgDetail);


        });
        String randomReturnReservCode = null;

        if (bookingRequest.getReturnFlightId() != 0) {
            Long returnFlightId = bookingRequest.getReturnFlightId();
            Optional<Flight> returnFlightOptional = flightRepository.findById(returnFlightId);
            Flight returnFlight = returnFlightOptional.get();


            if (flight.getAirline().getId() == returnFlight.getAirline().getId()) {
                randomReturnReservCode = randomReservationCode;
            } else {
                randomReturnReservCode = randomString(6);
            }
        }
        final String randomReturnReservationCode = randomReturnReservCode;
        // If booking has Return flight
        if (bookingRequest.getReturnFlightId() != 0){
            Long returnFlightId=bookingRequest.getReturnFlightId();
            Optional<Flight> returnFlightOptional=flightRepository.findById(returnFlightId);
            Flight returnFlight=returnFlightOptional.get();


            //Add Passenger detail
            bookingRequest.getPassengers().forEach( psg ->{
                Passenger passengerReturnFlight = new Passenger();
                passengerReturnFlight.setFirstname(psg.getFirstname());
                passengerReturnFlight.setLastname(psg.getLastname());
                passengerReturnFlight.setBirthday(psg.getBirthday());
                passengerReturnFlight.setGender(psg.isGender());
                passengerReturnFlight.setHasInfant(psg.isHasInfant());
                passengerReturnFlight.setBaggageExtra(psg.getBaggageExtra());
                passengerReturnFlight.setSeatNumber(psg.getSeatNumber());
                String randomTicket = randomNumber(13);
                passengerReturnFlight.setTicketNumber(randomTicket);
                Integer age = getAgeTravel(psg.getBirthday(),bookingRequest.getDateReturnBooking());
                Float infantPrice = psg.isHasInfant() ? returnFlight.getInfant_price() : 0;
                if (bookingRequest.getReturnType() == 1){
                    passengerReturnFlight.setPrice(returnFlight.getBusinessPrice() + infantPrice);
                } else if(age<12) {
                    passengerReturnFlight.setPrice(returnFlight.getChild_price() + infantPrice);
                } else {
                    passengerReturnFlight.setPrice(returnFlight.getEconomyPrice() + infantPrice);
                }
                passengerRepository.save(passengerReturnFlight);

                //Add Booking Return Detail
                FlightBookingDetail detailReturnFlight=new FlightBookingDetail();
                detailReturnFlight.setFlight(returnFlight);
                detailReturnFlight.setPassenger(passengerReturnFlight);
                detailReturnFlight.setFlightBooking(fltBooking);
                detailReturnFlight.setAirlineReservationCode(randomReturnReservationCode);
                detailReturnFlight.setDateOfDeparture(bookingRequest.getDateReturnBooking());
                detailReturnFlight.setPriceType(bookingRequest.getReturnType());
                FlightBookingDetail bkgDetailReturn = flightBookingDetailRepository.save(detailReturnFlight);
                bookingDetailList.add(bkgDetailReturn);

            });
        }
        fltBooking.setFlightBookingDetails(bookingDetailList);;

        final FlightBooking savedBooking = flightBookingRepository.save(fltBooking);

        String qrcodePath = "src/main/resources/static/images/" + savedBooking.getId() + "-QRCode.png";
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        if (bookingRequest.getReturnFlightId() != 0){
            Long returnFlightId=bookingRequest.getReturnFlightId();
            Optional<Flight> returnFlightOptional=flightRepository.findById(returnFlightId);
            Flight returnFlight=returnFlightOptional.get();

            BitMatrix bitMatrix_2flight = qrCodeWriter.encode(
                    "User: "+ user.getFirstName()+" "+user.getLastName()+"\n"+
                            "Email: "+ user.getEmail() +"\n"+
                            "Reservation Code: "+ randomReservationCode + "\n"+
                            "Information Flight: "+flight.getFlightCode()+" "+flight.getDepartureCity()+"-"+flight.getArrivalCity()+"\n"+
                            "Day of Departure: "+ getDateString(bookingRequest.getDateBooking())+ " " +flight.getDepartureTime().getHours() + ":" + flight.getDepartureTime().getMinutes()+"\n"+
                            "Reservation Return Flight: "+randomReturnReservationCode+"\n"+
                            "Return Flight: "+returnFlight.getFlightCode()+" "+returnFlight.getDepartureCity()+"-"+returnFlight.getArrivalCity() +"\n" +
                            "Day of Return: "+getDateString(bookingRequest.getDateReturnBooking())+" "+returnFlight.getDepartureTime().getHours() + ":" + returnFlight.getDepartureTime().getMinutes()
                            , BarcodeFormat.QR_CODE, 300, 300);
            Path path = FileSystems.getDefault().getPath(qrcodePath);
            MatrixToImageWriter.writeToPath(bitMatrix_2flight, "PNG", path);
            flightBookingRepository.save(savedBooking);
            mapAndSaveToPDF(savedBooking, user, new File(qrcodePath));
        } else {
            BitMatrix bitMatrix = qrCodeWriter.encode(
                    "User: "+ user.getFirstName()+" "+user.getLastName()+"\n"+
                            "Email: "+ user.getEmail() +"\n"+
                            "Reservation Code: "+ randomReservationCode + "\n"+
                            "Information Flight: "+flight.getFlightCode()+" "+flight.getDepartureCity()+"-"+flight.getArrivalCity()+"\n"+
                            "Day of Departure: "+ getDateString(bookingRequest.getDateBooking())+ " " +flight.getDepartureTime().getHours() + ":" + flight.getDepartureTime().getMinutes()+"\n"
                    , BarcodeFormat.QR_CODE, 300, 300);
            Path path = FileSystems.getDefault().getPath(qrcodePath);
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

            flightBookingRepository.save(savedBooking);
            mapAndSaveToPDF(savedBooking, user, new File(qrcodePath));
        }

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

    public void mapAndSaveToPDF(FlightBooking flightBooking, User user, File qrcode) throws Exception{
        Map<String, Object > data = new HashMap<>();
        data.put("flightBooking", flightBooking);
        data.put("flightDetails", flightBooking.getFlightBookingDetails());

        File pdfAttachment = pdfGenaratorUtil.createPdf("itinerary",data, ITINERARY_DIR);

        Map<String, Object > emailMap = new HashMap<>();
        emailMap.put("user", user);
        String templateHtml = emailService.templateResolve("thankyouemail", emailMap);
        emailService.sendSimpleMessage(user.getEmail(),null, "Flight Itinerary", templateHtml, "Invoice.pdf", pdfAttachment, qrcode);
//        qrcode.delete();
//        pdfAttachment.delete();
    }

    public Float GetPriceByClass(BookingRequest bookingRequest, Flight flight){
        if (bookingRequest.getType() == 1){
            return flight.getBusinessPrice();
        }
        return flight.getEconomyPrice();
    }

    public String getDateString(Date date) {
        String pattern = "dd-MM-YYYY";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

        return simpleDateFormat.format(date);
    }

    public Integer getAgeTravel(Date birthday, Date dateOfTravel){
        DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        int d1 = Integer.parseInt(formatter.format(birthday));
        int d2 = Integer.parseInt(formatter.format(dateOfTravel));
        int age = (d2-d1)/10000;
        return age;
    }
}

