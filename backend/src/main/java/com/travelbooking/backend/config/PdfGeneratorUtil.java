package com.travelbooking.backend.config;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import com.itextpdf.html2pdf.HtmlConverter;
import com.travelbooking.backend.BookingService.EmailService;
import com.travelbooking.backend.BookingService.FlightBookingServiceImpl;
import com.travelbooking.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

@Component
public class PdfGeneratorUtil {
    @Autowired
    private TemplateEngine templateEngine;


    public File createPdf(String templateName, Map<String, Object> map,String path) throws Exception {

        Assert.notNull(templateName, "The templateName can not be null");
        Context ctx = new Context();
        if (map != null) {
            for (Map.Entry<String, Object> stringObjectEntry : map.entrySet()) {
                Map.Entry pair = (Map.Entry) stringObjectEntry;
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }

        String processedHtml = templateEngine.process(templateName, ctx);
        FileOutputStream os = null;
        String fileName = UUID.randomUUID().toString();
        try {
            File directory = new File(path);
            if(!directory.exists()){
                directory.mkdir();
            }
            final File outputFile = new File(path+ fileName + ".pdf");

            os = new FileOutputStream(outputFile);

            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(processedHtml);
            renderer.layout();
            renderer.createPDF(os, false);
            renderer.finishPDF();
            System.out.println("PDF created successfully at " + outputFile.getAbsolutePath());
            return outputFile;
        }
        finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) { /*ignore*/ }
            }
        }
    }
}
