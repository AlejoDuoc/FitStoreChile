package com.fitstore.backend.controller;

import com.fitstore.backend.model.Producto;
import com.fitstore.backend.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "Gestión del catálogo de productos de FitStore Chile")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    @Operation(summary = "Listar todos los productos")
    @ApiResponse(responseCode = "200", description = "Lista de productos obtenida")
    public ResponseEntity<List<Producto>> listarTodos() {
        return ResponseEntity.ok(productoService.obtenerTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto encontrado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoria}")
    @Operation(summary = "Filtrar productos por categoría")
    public ResponseEntity<List<Producto>> porCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(productoService.obtenerPorCategoria(categoria));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar productos por nombre")
    public ResponseEntity<List<Producto>> buscar(@RequestParam String nombre) {
        return ResponseEntity.ok(productoService.buscarPorNombre(nombre));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo producto")
    @SecurityRequirement(name = "BearerAuth")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Producto creado"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        Producto nuevo = productoService.crear(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto existente")
    @SecurityRequirement(name = "BearerAuth")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto actualizado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<Producto> actualizar(@PathVariable Long id,
                                               @Valid @RequestBody Producto producto) {
        return productoService.actualizar(id, producto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto")
    @SecurityRequirement(name = "BearerAuth")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Producto eliminado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (productoService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/stock")
    @Operation(summary = "Descontar stock de producto")
    @SecurityRequirement(name = "BearerAuth")
    public ResponseEntity<Producto> actualizarStock(@PathVariable Long id,
                                                     @RequestParam int cantidad) {
        return productoService.descontarStock(id, cantidad)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
