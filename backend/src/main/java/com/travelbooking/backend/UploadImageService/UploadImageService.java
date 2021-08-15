package com.travelbooking.backend.UploadImageService;

import com.travelbooking.backend.BookingHotelService.BookingRequestRoom;
import com.travelbooking.backend.models.HotelBooking;
import com.travelbooking.backend.models.Image;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UploadImageService {
    public List<Image> fileUpload(MultipartFile[] file) throws Exception;
}

