package com.travelbooking.backend;

import com.travelbooking.backend.models.Room;
import com.travelbooking.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.xml.crypto.Data;
import java.beans.ConstructorProperties;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class BackendApplication implements WebMvcConfigurer {

    @Autowired
    RoomRepository roomRepository;


    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }



    @Scheduled(initialDelayString ="PT1M" ,fixedDelayString = "PT1H")
    void roomJob(){
        Date now = new Date();
//        List<Room> rooms = new ArrayList<>();
        List<Room> room = roomRepository.findAll();
        if(room.size() > 0){
            for (int i = 0; i < room.size() ; i++) {
                if(room.get(i).getAvailableTime() != null){
                    if(room.get(i).getAvailableTime().before(now)){
                        room.get(i).setAvailableTime(null);
                        roomRepository.save(room.get(i));
                    }
                }
            }
            System.out.println("Success.....");
        }
        System.out.println("Waiting.....");
    }
}

@Configuration
@EnableScheduling
@ConditionalOnProperty(name = "scheduling.enabled",matchIfMissing = true)
class SchedulingConfiguration{

}
