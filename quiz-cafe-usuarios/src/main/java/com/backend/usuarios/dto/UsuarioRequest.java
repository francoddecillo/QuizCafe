package com.backend.usuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequest(
        @NotBlank String nombre,
        @NotBlank String apellido,
        @Email String email,
        @Size(min = 8) String password
        ) {}
