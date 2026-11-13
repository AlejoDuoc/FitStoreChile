package com.fitstore.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * DTO para la solicitud de login.
 * Recibe email y password del frontend.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}
