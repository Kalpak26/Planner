// backend\src\main\java\com\wanderlust\dto\auth\JwtResponse.java

package com.wanderlust.dto.auth;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class JwtResponse {
    private String token;
    private String type;
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
}