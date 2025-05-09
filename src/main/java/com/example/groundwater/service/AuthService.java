package com.example.groundwater.service;

import com.example.groundwater.User.User;
import com.example.groundwater.repository.UserRepository;
import com.example.groundwater.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already registered!");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        // Generate and return JWT token
        return jwtUtil.generateToken(email);
    }

    public String login(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // Generate and return JWT token
        return jwtUtil.generateToken(email);
    }

    public boolean validateToken(String token) {
        String email = jwtUtil.extractEmail(token);
        if (email == null) {
            return false;
        }

        // Load the user details by email
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        // Validate the token with the extracted email and user details
        return jwtUtil.validateToken(token, userDetails);
    }

    public Optional<User> getCurrentUser(String token) {
        String email = jwtUtil.extractEmail(token);
        return userRepository.findByEmail(email);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // New method to fetch all registered emails
    public List<String> getAllRegisteredEmails() {
        return userRepository.findAll()
                .stream()
                .map(User::getEmail)
                .toList();
    }
}
