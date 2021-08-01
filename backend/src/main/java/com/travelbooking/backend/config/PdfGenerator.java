package com.travelbooking.backend.config;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.travelbooking.backend.models.FlightBooking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

@Component
public class PdfGenerator {
    private static final Logger LOGGER = LoggerFactory.getLogger(PdfGenerator.class);

    public void generateItinerary(FlightBooking booking, String filePath){
        Document document=new Document();
        try {
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();
            document.addTitle("Flight ticket");
            document.add(generateTable(booking));
            document.close();

        } catch (FileNotFoundException | DocumentException ex){
            ex.printStackTrace();
        }
    }
    public PdfPTable generateTable(FlightBooking booking){
        PdfPTable table=new PdfPTable(2);

        PdfPCell cell = new PdfPCell(new Phrase("Flight Itinerary"));

        cell.setColspan(2);
        table.addCell(cell);

        cell = new PdfPCell(new Phrase("Flight Details"));
        cell.setColspan(2);
        table.addCell(cell);

        table.addCell("Airlines ");
        table.addCell("Airlines ");

//        table.addCell(booking.getFlight().getOperatingAirlines());
//
//        table.addCell("Departure City");
//        table.addCell(booking.getFlightBookingDetails().getFlight(id).getDepartureCity());
//
//        table.addCell("Arrival City");
//        table.addCell(booking.getFlight().getArrivalCity());
//
//        table.addCell("Flight Number");
//        table.addCell(booking.getFlight().getFlightNumber());
//
//        table.addCell("Departure Date");
//        table.addCell(booking.getFlight().getDepartureCity());
//
//        table.addCell("Departure Time");
//        table.addCell(booking.getFlight().getDepartureTime());
//
//        cell = new PdfPCell(new Phrase("Passenger Details"));
//        cell.setColspan(2);
//        table.addCell(cell);
//
//        table.addCell("First Name");
//        table.addCell(booking.getPassenger().getFirstName());
//
//        table.addCell("Last Name");
//        table.addCell(booking.getPassenger().getLastName());
//
//        table.addCell("Email");
//        table.addCell(booking.getPassenger().getEmail());
//
//        table.addCell("Phone");
//        table.addCell(booking.getPassenger().getPhone());

        return table;
    }
}
