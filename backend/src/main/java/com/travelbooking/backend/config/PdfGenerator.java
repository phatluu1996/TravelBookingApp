package com.travelbooking.backend.config;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.travelbooking.backend.models.FlightBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import org.thymeleaf.TemplateEngine;

@Component
public class PdfGenerator {
//    @Autowired
//    ServletContext servletContext;
//
//    private final TemplateEngine templateEngine;
//
//    public PdfGenerator(TemplateEngine templateEngine) {
//        this.templateEngine = templateEngine;
//    }

//    public void generateItinerary(FlightBooking booking, String filePath){
//        Document document=new Document();
//        try {
//            PdfWriter.getInstance(document, new FileOutputStream(filePath));
//            document.open();
//            document.addTitle("Flight ticket");
//            document.add(generateTable(booking));
//            document.close();
//
//        } catch (FileNotFoundException | DocumentException ex){
//            ex.printStackTrace();
//        }
//    }
//    public PdfPTable generateTable(FlightBooking booking){
//        PdfPTable table=new PdfPTable(2);
////
//        PdfPCell cell = new PdfPCell(new Phrase("Flight Itinerary"));
//        cell.setBackgroundColor(Color.lightGray);
//        cell.setPadding(5);
//        cell.setColspan(2);
//        table.addCell(cell);
//
//        cell = new PdfPCell(new Phrase("Flight Details"));
//        cell.setColspan(2);
//        table.addCell(cell);
//
//        table.addCell("Airlines ");
//        table.addCell(" ");
//
//        table.addCell("");
//
//        table.addCell("Departure City");
//        table.addCell("");
//
//        table.addCell("Arrival City");
//        table.addCell("");
//
//        table.addCell("Flight Number");
//        table.addCell("");
//
//        table.addCell("Departure Date");
//        table.addCell("");
//
//        table.addCell("Departure Time");
//        table.addCell("");
//
//        cell = new PdfPCell(new Phrase("Passenger Details"));
//        cell.setColspan(2);
//        table.addCell(cell);
//
//        table.addCell("First Name");
//        table.addCell("");
//
//        table.addCell("Last Name");
//        table.addCell("");
//
//        table.addCell("Email");
//        table.addCell("");
//
//        table.addCell("Phone");
//        table.addCell("");

//        return table;
//    }
}
