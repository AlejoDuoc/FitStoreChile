package com.fitstore.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "La categoría es obligatoria")
    @Column(nullable = false)
    private String categoria;

    @NotNull(message = "El precio es obligatorio")
    @Min(value = 100, message = "El precio mínimo es $100 CLP")
    @Column(nullable = false)
    private Integer precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Column(nullable = false)
    private Integer stock;

    @Column(length = 500)
    private String descripcion;

    @Column(length = 1000)
    private String imagen;
}
