package com.backend.preguntas.service;

import com.backend.preguntas.entity.Pregunta;
import java.util.List;

public interface PreguntaService {
    List<Pregunta> obtenerPorNivel(int nivel);
}