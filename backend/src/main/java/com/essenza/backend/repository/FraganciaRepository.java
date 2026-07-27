package com.essenza.backend.repository;

import com.essenza.backend.model.Fragancia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FraganciaRepository extends JpaRepository<Fragancia, Long> {
    Optional<Fragancia> findByNombre(String nombre);
    List<Fragancia> findAllByOrderByNombreAsc();
}
