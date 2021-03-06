package com.travelbooking.backend.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContext;

import com.travelbooking.backend.models.Account;
import com.travelbooking.backend.models.Image;
import com.travelbooking.backend.models.User;
import com.travelbooking.backend.repository.AccountRepository;
import com.travelbooking.backend.repository.ImageRepository;
import com.travelbooking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class FileUploadController {
	@Value("${file.upload-dir}")
	String FILE_MAIN_DIRECTORY;

	@Autowired
	ServletContext context;

	@Autowired
	ImageRepository imageRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	AccountRepository accountRepository;

	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	@PostMapping(value = "/update-profile-picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<User> updateProfilePicture(@RequestParam MultipartFile file, @RequestParam Long id) throws IOException {
		User user = userRepository.getById(id);
		try{
			String FILE_DIRECTORY = FILE_MAIN_DIRECTORY + "profile/";
			String FILE_TARGET_DIRECTORY = "target/classes/static/storage/profile/";
			File directory = new File(FILE_DIRECTORY);
			if (!directory.exists()) {
				directory.mkdirs();
			}
			String convertFileName = (FILE_DIRECTORY + file.getOriginalFilename() + "_"+id ).replaceAll("\\s+", "_");
			String convertFileNameForTargetFile = ( FILE_TARGET_DIRECTORY + file.getOriginalFilename() + "_"+id  ).replaceAll("\\s+", "_");

			File myFile = new File(convertFileName);
			File myTargetFile = new File(convertFileNameForTargetFile);

			myFile.createNewFile();
			myTargetFile.createNewFile();

			FileOutputStream fos = new FileOutputStream(myFile);
			FileOutputStream fos1 = new FileOutputStream(myTargetFile);
			fos.write(file.getBytes());
			fos1.write(file.getBytes());
			fos.close();
			fos1.close();

			user.getAccount().setThumbnail(getFileUrl(myFile));
			User result = userRepository.save(user);
			return ResponseEntity.ok().body(result);
		} catch (Exception e) {
//			return new ResponseEntity("Upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.ok().body(user);
		}

	}

	@RequestMapping(value = "/profile/{name}", method = RequestMethod.GET,
			produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<InputStreamResource> getImage(@PathVariable String name) throws IOException {

		ClassPathResource imgFile = new ClassPathResource("static/storage/profile/"+name);

		return ResponseEntity
				.ok()
				.contentType(MediaType.IMAGE_PNG)
				.body(new InputStreamResource(imgFile.getInputStream()));
	}



	@PostMapping("/upload-file")
	public ResponseEntity<Object> fileUpload( MultipartFile file // file h??nh
	) throws IOException {
		Image image = new Image();
		HashMap<String, String> fileObject = new HashMap<>();

		try {

			String FILE_DIRECTORY = FILE_MAIN_DIRECTORY + getFileExtension(file) + "/";
			File directory = new File(FILE_DIRECTORY);
			// Create a folder if not exist
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

			fileObject.put("id",result.getId().toString());
			fileObject.put("fileUrl", getFileUrl(myFile));
			fileObject.put("fileName", file.getOriginalFilename());
			fileObject.put("fileExtension", this.getFileExtension(file));
			fileObject.put("status", "Upload successfully");
			TimeUnit.SECONDS.sleep(1);
			return new ResponseEntity<Object>(fileObject, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>("Upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
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
