package com.example.groundwater.controller;

import com.example.groundwater.User.User;
import com.example.groundwater.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String token = authService.register(request.get("name"), request.get("email"), request.get("password"));
        response.put("token", token);
        response.put("user", Map.of(
                "email", request.get("email"),
                "name", request.get("name")
        ));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String token = authService.login(request.get("email"), request.get("password"));
        User user = authService.getUserByEmail(request.get("email"));
        response.put("token", token);
        response.put("user", Map.of(
                "email", user.getEmail(),
                "name", user.getName()
        ));
        return ResponseEntity.ok(response);
    }



    @GetMapping("/verify")
    public ResponseEntity<Map<String, Boolean>> verifyToken(@RequestHeader("Authorization") String token) {
        boolean valid = token != null &&
                token.startsWith("Bearer ") &&
                authService.validateToken(token.substring(7));
        return ResponseEntity.ok(Map.of("valid", valid));
    }

    @GetMapping("/emails")
    public List<String> getAllRegisteredEmails() {
        return authService.getAllRegisteredEmails();
    }
}