package com.backend.preguntas.controller;


import com.backend.preguntas.entity.Pregunta;
import com.backend.preguntas.service.PreguntaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8084")
@RestController
@RequestMapping("/api/preguntas")
@RequiredArgsConstructor
public class PreguntaController {

    private final PreguntaService service;

    @GetMapping(value = "/nivel/{nivel}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<Pregunta>> getPorNivel(@PathVariable int nivel) {
        return ResponseEntity.ok(service.obtenerPorNivel(nivel));
    }
    @PostMapping("/bulk")
    public ResponseEntity<List<Pregunta>> crearPreguntas(@RequestBody List<Pregunta> preguntas) {
        List<Pregunta> preguntasGuardadas = service.crearPreguntas(preguntas);
        return ResponseEntity.ok(preguntasGuardadas);
    }


}
