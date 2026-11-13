package com.fitstore.backend.repository;

import com.fitstore.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad Usuario.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar usuario por email (usado en autenticación)
    Optional<Usuario> findByEmail(String email);

    // Verificar si ya existe un usuario con ese email
    boolean existsByEmail(String email);
}
