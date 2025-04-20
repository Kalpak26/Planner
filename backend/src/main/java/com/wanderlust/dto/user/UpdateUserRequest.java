// backend/src/main/java/com/wanderlust/dto/user/UpdateUserRequest.java

package com.wanderlust.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @Size(max = 50)
    private String firstName;
    
    @Size(max = 50)
    private String lastName;
    
    @Size(max = 100)
    @Email
    private String email;
    
    private String currentPassword;
    
    @Size(min = 6, max = 40)
    private String newPassword;
}