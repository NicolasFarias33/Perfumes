package com.essenza.backend.controller;

import com.essenza.backend.model.Fragancia;
import com.essenza.backend.repository.FraganciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/fragancias")
@CrossOrigin(origins = "*")
public class FraganciaController {

    @Autowired
    private FraganciaRepository fraganciaRepository;

    @GetMapping
    public List<Fragancia> obtenerTodasLasFragancias() {
        return fraganciaRepository.findAllByOrderByNombreAsc();
    }

    @PostMapping
    public Fragancia crearFragancia(@RequestBody Fragancia fragancia) {
        if (fraganciaRepository.findByNombre(fragancia.getNombre()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Fragancia con nombre '" + fragancia.getNombre() + "' ya existe");
        }
        return fraganciaRepository.save(fragancia);
    }

    @DeleteMapping("/{id}")
    public void eliminarFragancia(@PathVariable Long id) {
        if (!fraganciaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fragancia con id " + id + " no encontrada");
        }
        fraganciaRepository.deleteById(id);
    }
}
