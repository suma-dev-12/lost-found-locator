package edu.infosys.lostFoundLocatorApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "edu.infosys")
public class LostFoundLocatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(LostFoundLocatorApplication.class, args);
	}

}
