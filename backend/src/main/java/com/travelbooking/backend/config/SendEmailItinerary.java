package com.travelbooking.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Component
public class SendEmailItinerary  {

    @Value("${com.travelbooking.backend.itinerary.email.body}")
    private String EMAIL_BODY = "Please find your Itinerary attached.";

    @Value("${com.travelbooking.backend.itinerary.email.subject")
    private String EMAIL_SUBJECT = "Itinerary for your Flight";

    @Autowired
    public JavaMailSender javaMailSender;

    public void sendItinerary(String toAddress, String filePath) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setTo(toAddress);
            messageHelper.setSubject(EMAIL_SUBJECT);
            messageHelper.setText(EMAIL_BODY);
            messageHelper.addAttachment("Itinerary", new File(filePath));
            javaMailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("Exception inside sendItinerary" + e);
        }
    }
}
