package com.essenza.backend.config;

import com.essenza.backend.model.Fragancia;
import com.essenza.backend.repository.FraganciaRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final FraganciaRepository fraganciaRepository;

    public DataInitializer(FraganciaRepository fraganciaRepository) {
        this.fraganciaRepository = fraganciaRepository;
    }

    @Override
    public void run(String... args) {
        if (fraganciaRepository.count() == 0) {
            List<Fragancia> fragancias = List.of(
                createFragancia("Cítrico", "#f5c542"),
                createFragancia("Floral", "#e879f9"),
                createFragancia("Amaderado", "#a3b18a"),
                createFragancia("Oriental", "#d47c4a"),
                createFragancia("Fresco", "#4ade80"),
                createFragancia("Especiado", "#fb923c"),
                createFragancia("Verde", "#6ee7b7"),
                createFragancia("Frutal", "#fda4af"),
                createFragancia("Almizcle", "#c4b5fd"),
                createFragancia("Ámbar", "#fbbf24"),
                createFragancia("Vainilla", "#fef3c7"),
                createFragancia("Sándalo", "#d6a76e"),
                createFragancia("Bergamota", "#86efac"),
                createFragancia("Pachulí", "#9f6767"),
                createFragancia("Rosa", "#f472b6"),
                createFragancia("Jazmín", "#fdf2c9"),
                createFragancia("Lavanda", "#c4b5fd"),
                createFragancia("Cedro", "#8b7355"),
                createFragancia("Vetiver", "#5f6f52"),
                createFragancia("Haba Tonka", "#d4a574"),
                createFragancia("Oud", "#4a3728")
            );
            fraganciaRepository.saveAll(fragancias);
            logger.info("Seeded 22 base fragrances");
        }
    }

    private Fragancia createFragancia(String nombre, String color) {
        Fragancia fragancia = new Fragancia();
        fragancia.setNombre(nombre);
        fragancia.setColor(color);
        return fragancia;
    }
}