package com.backend.preguntas.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "preguntas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pregunta;
    private String opcion1;
    private String opcion2;
    private String opcion3;
    private int correcta; // 1, 2 o 3
    private int nivel;    // Nivel del quiz (1, 2, 3...)
}
