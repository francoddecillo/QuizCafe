package com.backend.preguntas.controller;


import com.backend.preguntas.entity.Pregunta;
import com.backend.preguntas.service.PreguntaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/preguntas")
@RequiredArgsConstructor
public class PreguntaController {

    private final PreguntaService service;

    @GetMapping("/nivel/{nivel}")
    public ResponseEntity<List<Pregunta>> getPorNivel(@PathVariable int nivel) {
        return ResponseEntity.ok(service.obtenerPorNivel(nivel));
    }
}
