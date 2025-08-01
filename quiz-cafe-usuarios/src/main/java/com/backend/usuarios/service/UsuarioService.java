package com.backend.usuarios.service;

import com.backend.usuarios.dto.AuthResponse;
import com.backend.usuarios.dto.LoginRequest;
import com.backend.usuarios.dto.UsuarioRequest;

public interface UsuarioService {
    AuthResponse registrar(UsuarioRequest request);
    AuthResponse login(LoginRequest request);
}

