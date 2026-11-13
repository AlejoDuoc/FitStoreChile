package com.fitstore.backend.controller;

import com.fitstore.backend.dto.AuthResponse;
import com.fitstore.backend.dto.LoginRequest;
import com.fitstore.backend.dto.RegistroRequest;
import com.fitstore.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Endpoints de login, registro y renovación de tokens JWT")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/registro")
    @Operation(summary = "Registrar nuevo usuario")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Usuario registrado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Email ya en uso o datos inválidos")
    })
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
        try {
            AuthResponse respuesta = authService.registrar(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Login exitoso"),
        @ApiResponse(responseCode = "401", description = "Credenciales incorrectas")
    })
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse respuesta = authService.login(request);
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar token JWT")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Token renovado exitosamente"),
        @ApiResponse(responseCode = "401", description = "Token inválido o expirado")
    })
    public ResponseEntity<?> renovar(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String nuevoToken = authService.renovarToken(token);
                return ResponseEntity.ok(Map.of("token", nuevoToken, "tipo", "Bearer"));
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Cabecera Authorization no válida"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}
