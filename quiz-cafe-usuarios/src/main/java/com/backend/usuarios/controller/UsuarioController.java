package com.backend.usuarios.controller;

import com.backend.usuarios.dto.AuthResponse;
import com.backend.usuarios.dto.LoginRequest;
import com.backend.usuarios.dto.UsuarioRequest;
import com.backend.usuarios.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = usuarioService.login(request);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON) // UTF-8 por defecto
                .body(response);
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registrarUsuario(@Valid @RequestBody UsuarioRequest usuarioRequest) {
        AuthResponse response = usuarioService.registrar(usuarioRequest);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}
