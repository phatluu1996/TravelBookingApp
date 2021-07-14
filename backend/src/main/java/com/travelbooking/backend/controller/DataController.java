package com.travelbooking.backend.controller;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.aspectj.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DataController {
    @Autowired
    private Environment env;

    //http://localhost:8080/api/database/import
    @PostMapping("/database/import")
    public ResponseEntity<?> importData(){
        String URL = env.getProperty("spring.datasource.url");
        String USER = env.getProperty("spring.datasource.username");
        String PASS = env.getProperty("spring.datasource.password");
        int result = 1000;
        InputStream inputStream = null;
        String script = "";
        try {
            File importFile = ResourceUtils.getFile("classpath:data/data.sql");

            if(importFile.canRead()){
                script = FileUtil.readAsString(importFile);
            }

            Connection conn = DriverManager.getConnection(URL, USER, PASS);
            Statement stmt = conn.createStatement();

            // Execute a query
            System.out.println("Inserting records into the table...");
            String sql = script;
            result = stmt.executeUpdate(sql);
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok().body(e.getStackTrace());
        }
        return ResponseEntity.ok().body("Hehe boi :)!");
    }

    //http://localhost:8080/api/database/drop
    @PostMapping("/database/drop")
    public ResponseEntity<?> dropAllTables(){
        String URL = env.getProperty("spring.datasource.url");
        String USER = env.getProperty("spring.datasource.username");
        String PASS = env.getProperty("spring.datasource.password");
        int result = 1000;
        InputStream inputStream = null;
        String script = "";
        try {
            File importFile = ResourceUtils.getFile("classpath:data/delete_all_tables.sql");
            if(importFile.canRead()){
                script = FileUtil.readAsString(importFile);
            }
            Connection conn = DriverManager.getConnection(URL, USER, PASS);
            Statement stmt = conn.createStatement();
            String[] statements = script.split("GO");
            for (int i = 0; i < statements.length; i++) {
                String statement = statements[i];
                stmt.executeUpdate(statement);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok().body(e.getStackTrace());
        }
        return ResponseEntity.ok().body("Hehe boi :)!");
    }
}
