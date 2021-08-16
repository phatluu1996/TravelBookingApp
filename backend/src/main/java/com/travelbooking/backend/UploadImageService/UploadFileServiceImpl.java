package com.travelbooking.backend.UploadImageService;

import com.travelbooking.backend.models.Image;
import com.travelbooking.backend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class UploadFileServiceImpl implements  UploadImageService{


    @Value("${file.upload-dir}")
    String FILE_MAIN_DIRECTORY;

    @Autowired
    ServletContext context;

    @Autowired
    ImageRepository imageRepository;

    @Override
    public List<Image> fileUpload(MultipartFile[] files) throws Exception {

        HashMap<String, String> fileObject = new HashMap<>();

        List<Image> images = new ArrayList<>();
        Arrays.asList(files).stream().forEach(file -> {
            try {
                Image image = new Image();
                String FILE_DIRECTORY = FILE_MAIN_DIRECTORY + getFileExtension(file) + "/";
                File directory = new File(FILE_DIRECTORY);
                if (!directory.exists()) {
                    directory.mkdirs();
                }
                String convertFileName = (FILE_DIRECTORY + file.getOriginalFilename() ).replaceAll("\\s+", "_");
                File myFile = new File(convertFileName);
                myFile.createNewFile();
                FileOutputStream fos = new FileOutputStream(myFile);
                fos.write(file.getBytes());
                fos.close();

                image.imageAlt = file.getOriginalFilename();
                image.imagePath =  getFileUrl(myFile);
                Image result = imageRepository.save(image);
                images.add(result);
                TimeUnit.SECONDS.sleep(1);
            } catch (Exception e) {

            }
        });
        return images;
    }

    private String getFileExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return ""; // empty extension
        }
        return name.substring(lastIndexOf + 1);
    }

    private String getFileUrl(File file) {
        String name = file.getAbsolutePath();
        int lastIndexOf = name.lastIndexOf("storage");
        String fileUrl = "http://localhost:8080/" + name.substring(lastIndexOf).replace("\\", "/");
        return fileUrl;
    }
}
