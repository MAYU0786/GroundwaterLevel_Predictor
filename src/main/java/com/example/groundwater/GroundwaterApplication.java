package com.example.groundwater;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = "com.example.groundwater")
public class GroundwaterApplication {

	public static void main(String[] args) {
		SpringApplication.run(GroundwaterApplication.class, args);
	}

}
