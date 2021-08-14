package com.travelbooking.backend.controller;

import com.travelbooking.backend.BookingService.EmailService;
import com.travelbooking.backend.models.FeedBack;
import com.travelbooking.backend.repository.FeedbackRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class FeedbackController {
    private final Logger log = LoggerFactory.getLogger(HotelController.class);

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private EmailService emailService;

    //http://localhost:8080/api/feedback
    @GetMapping("/feedback")
    public ResponseEntity<List<FeedBack>> getFeedback(){
        return ResponseEntity.ok().body(feedbackRepository.findAll());
    }

    //http://localhost:8080/api/feedback
    @PostMapping("/feedback")
    public ResponseEntity<FeedBack> createFeedback(@RequestBody FeedBack feedBack){
        FeedBack result = feedbackRepository.save(feedBack);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/feedback/{id}
    @PutMapping("/feedback/{id}")
    public ResponseEntity<FeedBack> replyFeedback(@RequestBody FeedBack feedBack, @PathVariable Long id){
        feedBack.setId(id);
        FeedBack result = feedbackRepository.save(feedBack);
        Map<String, Object > emailMap = new HashMap<>();
        emailMap.put("fname", result.getName());
        emailMap.put("reply", result.getReply());
        String templateHtml = emailService.templateResolve("reply_feedback", emailMap);
        emailService.sendSimpleMessage(result.getEmail(),null, "Reply feedback", templateHtml);
        return ResponseEntity.ok().body(result);
    }

    //http://localhost:8080/api/feedback{id}
    @GetMapping("/feedback/{id}")
    public ResponseEntity<FeedBack> getFeedback(@PathVariable Long id){
        FeedBack result = feedbackRepository.getById(id);
        return ResponseEntity.ok().body(result);
    }
}
