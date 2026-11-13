package com.fitstore.backend.repository;

import com.fitstore.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio JPA para la entidad Producto.
 * Spring Data JPA genera automáticamente las consultas SQL.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Buscar productos por categoría (ej: "Ropa Deportiva")
    List<Producto> findByCategoria(String categoria);

    // Buscar productos por nombre (búsqueda parcial, sin importar mayúsculas)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Buscar productos con stock disponible
    List<Producto> findByStockGreaterThan(Integer stock);
}
