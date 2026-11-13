package com.fitstore.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * DTO de respuesta después de un login exitoso.
 * Contiene el token JWT y los datos básicos del usuario.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String tipo = "Bearer";
    private Long id;
    private String nombre;
    private String email;
    private String rol;
    private Boolean tieneDescuento;

    public AuthResponse(String token, Long id, String nombre, String email, String rol, Boolean tieneDescuento) {
        this.token = token;
        this.tipo = "Bearer";
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.tieneDescuento = tieneDescuento;
    }
}
