// backend\src\main\java\com\wanderlust\service\WeatherService.java

package com.wanderlust.service;

import com.wanderlust.dto.weather.WeatherResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeatherService {
    private final RestTemplate restTemplate;
    
    @Value("${app.weather.api.key:demo_key}")
    private String apiKey;
    
    @Value("${app.weather.api.url:https://api.example.com/weather}")
    private String apiUrl;
    
    /**
     * Currently returns mock weather data as we don't have a real API integration
     */
    public WeatherResponse getWeatherForLocation(String location) {
        // In a real scenario, we would call an actual weather API
        // RestTemplate can be used to make HTTP calls to external APIs
        
        log.info("Fetching weather for location: {}", location);
        
        // For now, return mock data
        return WeatherResponse.builder()
                .location(location)
                .date(LocalDate.now().format(DateTimeFormatter.ISO_DATE))
                .description("Partly Cloudy")
                .temperature(22.5)
                .humidity(65.0)
                .windSpeed(12.0)
                .icon("partly-cloudy")
                .build();
    }
}