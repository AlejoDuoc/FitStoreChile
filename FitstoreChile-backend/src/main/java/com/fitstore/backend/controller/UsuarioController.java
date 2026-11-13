package com.fitstore.backend.controller;

import com.fitstore.backend.model.Usuario;
import com.fitstore.backend.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "Gestión de usuarios")
@SecurityRequirement(name = "BearerAuth")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    @Operation(summary = "Listar todos los usuarios")
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        usuarios.forEach(u -> u.setPassword("***"));
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(u -> {
                    u.setPassword("***");
                    return ResponseEntity.ok(u);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
