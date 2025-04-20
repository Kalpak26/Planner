// backend\src\main\java\com\wanderlust\controller\WeatherController.java

package com.wanderlust.controller;

import com.wanderlust.dto.weather.WeatherResponse;
import com.wanderlust.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class WeatherController {
    private final WeatherService weatherService;
    
    @GetMapping("/{location}")
    public ResponseEntity<WeatherResponse> getWeatherForLocation(@PathVariable String location) {
        return ResponseEntity.ok(weatherService.getWeatherForLocation(location));
    }
}