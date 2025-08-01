package com.backend.preguntas.service.impl;

import com.backend.preguntas.entity.Pregunta;
import com.backend.preguntas.repository.PreguntaRepository;
import com.backend.preguntas.service.PreguntaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PreguntaServiceImpl implements PreguntaService {

    private final PreguntaRepository repository;

    @Override
    public List<Pregunta> crearPreguntas(List<Pregunta> preguntas) {
        return repository.saveAll(preguntas);
    }

    @Override
    public List<Pregunta> obtenerPorNivel(int nivel) {
        return repository.findByNivel(nivel);
    }
}

