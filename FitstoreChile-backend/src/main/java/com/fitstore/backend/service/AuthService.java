package com.fitstore.backend.service;

import com.fitstore.backend.dto.AuthResponse;
import com.fitstore.backend.dto.LoginRequest;
import com.fitstore.backend.dto.RegistroRequest;
import com.fitstore.backend.model.Usuario;
import com.fitstore.backend.repository.UsuarioRepository;
import com.fitstore.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse registrar(RegistroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Ya existe una cuenta con el email: " + request.getEmail());
        }

        if (request.getEdad() != null && request.getEdad() < 18) {
            throw new RuntimeException("Debes ser mayor de 18 años para registrarte.");
        }

        String rol = (request.getRol() != null && request.getRol().equals("ROLE_ADMIN"))
                ? "ROLE_ADMIN"
                : "ROLE_CLIENTE";

        boolean tieneDescuento = request.getEmail().toLowerCase().contains("@duocuc.cl")
                || rol.equals("ROLE_ADMIN");

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setEmail(request.getEmail().toLowerCase());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));
        nuevoUsuario.setEdad(request.getEdad());
        nuevoUsuario.setRol(rol);
        nuevoUsuario.setTieneDescuento(tieneDescuento);

        Usuario guardado = usuarioRepository.save(nuevoUsuario);
        String token = jwtUtil.generarToken(guardado.getEmail(), guardado.getRol());

        return new AuthResponse(token, guardado.getId(), guardado.getNombre(),
                guardado.getEmail(), guardado.getRol(), guardado.getTieneDescuento());
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta.");
        }

        String token = jwtUtil.generarToken(usuario.getEmail(), usuario.getRol());

        return new AuthResponse(token, usuario.getId(), usuario.getNombre(),
                usuario.getEmail(), usuario.getRol(), usuario.getTieneDescuento());
    }

    public String renovarToken(String token) {
        return jwtUtil.renovarToken(token);
    }
}
