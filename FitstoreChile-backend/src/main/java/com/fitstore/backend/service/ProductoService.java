package com.fitstore.backend.service;

import com.fitstore.backend.model.Producto;
import com.fitstore.backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    public List<Producto> obtenerPorCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria);
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }

    public Optional<Producto> actualizar(Long id, Producto datosNuevos) {
        return productoRepository.findById(id).map(productoExistente -> {
            productoExistente.setNombre(datosNuevos.getNombre());
            productoExistente.setCategoria(datosNuevos.getCategoria());
            productoExistente.setPrecio(datosNuevos.getPrecio());
            productoExistente.setStock(datosNuevos.getStock());
            productoExistente.setDescripcion(datosNuevos.getDescripcion());
            productoExistente.setImagen(datosNuevos.getImagen());
            return productoRepository.save(productoExistente);
        });
    }

    public boolean eliminar(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Producto> descontarStock(Long id, int cantidad) {
        return productoRepository.findById(id).map(producto -> {
            if (producto.getStock() < cantidad) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }
            producto.setStock(producto.getStock() - cantidad);
            return productoRepository.save(producto);
        });
    }
}
