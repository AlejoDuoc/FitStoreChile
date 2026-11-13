package com.fitstore.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * DTO para la solicitud de registro de un nuevo usuario.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroRequest {
    private String nombre;
    private String email;
    private String password;
    private Integer edad;
    private String rol; // "ROLE_CLIENTE" o "ROLE_ADMIN"
}
