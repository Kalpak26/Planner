// backend\src\main\java\com\wanderlust\dto\weather\WeatherResponse.java

package com.wanderlust.dto.weather;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeatherResponse {
    private String location;
    private String date;
    private String description;
    private Double temperature;
    private Double humidity;
    private Double windSpeed;
    private String icon;
}