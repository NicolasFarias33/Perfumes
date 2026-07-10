package com.essenza.backend.controller;

import com.essenza.backend.model.Producto;
import com.essenza.backend.repository.ProductoRepository;
import com.essenza.backend.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto crearProducto(
        @ModelAttribute Producto producto,
        @RequestParam(value = "imagen", required = false) MultipartFile imagen) throws IOException {
        
        if (imagen != null && !imagen.isEmpty()) {
            String url = cloudinaryService.subirImagen(imagen);
            producto.setUrlImagen(url);
        }
        
        return productoRepository.save(producto);
    }
   
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}