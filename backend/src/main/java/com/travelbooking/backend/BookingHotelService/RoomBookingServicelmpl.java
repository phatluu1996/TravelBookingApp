package com.travelbooking.backend.BookingHotelService;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
@Transactional
public class RoomBookingServicelmpl implements RoomBookingService {

    @Autowired
    HotelBookingRepository hotelBookingRepository;
    @Autowired
    HotelBookingDetailRepository hotelBookingDetailRepository;
    @Autowired
    HotelBookingRoomRepository hotelBookingRoomRepository;
    @Autowired
    PdfGeneratorUtil pdfGenaratorUtil;
    @Autowired
    EmailService emailService;
    @Value("${com.travelbooking.backend.itinerary.dirpath}")
    private String ITINERARY_DIR;
    @Autowired
    private SendEmailItinerary emailUtil;


    @Override
    public HotelBooking bookRoom(BookingRequest bookingRequest) throws Exception {
        String randomBookingCode = randomString(8);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        //Start Booking Room
        HotelBooking hotelBooking = new HotelBooking();
        hotelBooking.setBookingCode(randomBookingCode);
        hotelBooking.setCheckInDate(bookingRequest.getCheckInDate());
        hotelBooking.setCheckOutDate(bookingRequest.getCheckOutDate());
        hotelBooking.setNumOfGuest(bookingRequest.getNumberOfGuests());
        hotelBooking.setPaymentMethod(bookingRequest.getPaymentMethod());
        hotelBooking.setTotalPrice(bookingRequest.getTotalPrice());
        hotelBooking.setUser(bookingRequest.getUser());
        hotelBooking.setRetired(false);
        HotelBooking createBkSuccess = hotelBookingRepository.save(hotelBooking);
            //Create Booking Detail
            HotelBookingDetail hotelBookingDetail = new HotelBookingDetail();
            hotelBookingDetail.setHotelBooking(createBkSuccess);
            HotelBookingDetail createBkDetailsSuccess = hotelBookingDetailRepository.save(hotelBookingDetail);
            //Create Booking Room
            for (int i = 0; i < bookingRequest.getRooms().size() ; i++) {
                HotelBookingRoom hotelBookingRoom = new HotelBookingRoom();
                hotelBookingRoom.setHotelBookingDetail(createBkDetailsSuccess);
                hotelBookingRoom.setRoom(bookingRequest.getRooms().get(i));
                hotelBookingRoomRepository.save(hotelBookingRoom);
            }

        String qrcodePath = "src/main/resources/static/images/" + createBkSuccess.getId() + "-QRCode.png";
        BitMatrix bitMatrix = qrCodeWriter.encode("SparrowCode: "+createBkSuccess.getBookingCode()+"\n"+
                        bookingRequest.getNumberOfGuests()+" "+getDateString(bookingRequest.getDateBooking())+ " " +
                        getDateString(bookingRequest.getCheckInDate())+"-"+getDateString(bookingRequest.getCheckOutDate())
                , BarcodeFormat.QR_CODE, 300, 300);
        Path path = FileSystems.getDefault().getPath(qrcodePath);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

        HotelBooking bk = hotelBookingRepository.getById(createBkSuccess.getId());
        mapAndSaveToPDF(bk, bookingRequest.getUser(), new File(qrcodePath));

        return bk;
    }


    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static final String CD = "0123456789";
    static SecureRandom rnd = new SecureRandom();

    public void mapAndSaveToPDF(HotelBooking hotelBooking, User user, File qrcode) throws Exception{
        Map<String, Object > data = new HashMap<>();
        data.put("hotelBooking", hotelBooking);
        data.put("hotelBookingRoom", hotelBooking.getHotelBookingDetail().getHotelBookingRooms());
        File pdfAttachment = pdfGenaratorUtil.createPdf("itinerary",data, ITINERARY_DIR, emailUtil, user);
        Map<String, Object > emailMap = new HashMap<>();
        emailMap.put("user", user);
        String templateHtml = emailService.templateResolve("thankyouemail", emailMap);
        emailService.sendSimpleMessage(user.getEmail(),null, "Hotel Itinerary", templateHtml, "Invoice.pdf", pdfAttachment, qrcode);
        qrcode.delete();
        pdfAttachment.delete();
    }
    String randomString(int len){
        StringBuilder sb = new StringBuilder(len);
        for(int i = 0; i < len; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }
    public String getDateString(Date date) {
        String pattern = "dd-MM-YYYY";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

        return simpleDateFormat.format(date);
    }
    String randomNumber(int len){
        StringBuilder sb = new StringBuilder(len);
        for(int i = 0; i < len; i++)
            sb.append(CD.charAt(rnd.nextInt(CD.length())));
        return sb.toString();
    }
}
