package com.travelbooking.backend.controller;

import com.travelbooking.backend.config.PdfGeneratorUtil;
import com.travelbooking.backend.models.FlightBooking;
import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.repository.FlightBookingRepository;
import com.travelbooking.backend.repository.HotelBookingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DownloadFileController {
    private static final Logger logger = LoggerFactory.getLogger(DownloadFileController.class);

    @Value("${com.travelbooking.backend.itinerary.dirpath}")
    private String ITINERARY_DIR;

    @Autowired
    FlightBookingRepository flightBookingRepository;

    @Autowired
    HotelBookingRepository hotelBookingRepository;

    @Autowired
    PdfGeneratorUtil pdfGeneratorUtil;

    //http://localhost:8080/api/downloadFlightInvoice/{id}
    @GetMapping("/downloadFlightInvoice/{id}")
    public ResponseEntity<Resource> downloadFlightItinerary(@PathVariable Long id) throws Exception {
        // Load file as Resource

        FlightBooking flightBooking = flightBookingRepository.getById(id);

        Map<String, Object > data = new HashMap<>();
        data.put("flightBooking", flightBooking);
        data.put("flightDetails", flightBooking.getFlightBookingDetails());

        File pdfFile = pdfGeneratorUtil.createPdf("itinerary",data, ITINERARY_DIR);

        InputStreamResource resource = new InputStreamResource(new FileInputStream(pdfFile));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "flight-itinerary-" + flightBooking.getBookingCode()+".pdf" + "\"")
                .contentLength(pdfFile.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    //http://localhost:8080/api/downloadHotelInvoice/{id}
    @GetMapping("/downloadHotelInvoice/{id}")
    public ResponseEntity<Resource> downloadHotelInvoicey(@PathVariable Long id) throws Exception {
        // Load file as Resource

        HotelBooking hotelBooking = hotelBookingRepository.getById(id);

        long diffInMillies = Math.abs(hotelBooking.getCheckInDate().getTime() - hotelBooking.getCheckOutDate().getTime());
        long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

        Map<String, Object > data = new HashMap<>();
        data.put("hotelBooking", hotelBooking);
        data.put("nightCount", diff);
        data.put("createDate",hotelBooking.getCreatedAt());
        data.put("name",hotelBooking.getUser().getFirstName() + hotelBooking.getUser().getLastName());
        File pdfFile = pdfGeneratorUtil.createPdf("invoicebookingroom",data, ITINERARY_DIR);

        InputStreamResource resource = new InputStreamResource(new FileInputStream(pdfFile));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +"hotel-invoice-" + hotelBooking.getBookingCode()+".pdf" + "\"")
                .contentLength(pdfFile.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
