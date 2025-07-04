package com.itticket.itticketsys.controller;

import com.itticket.itticketsys.dto.LoginRequest;
import com.itticket.itticketsys.model.User;
import com.itticket.itticketsys.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ LOGIN API with Basic Auth token generation
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("➡️ Login attempt: " + loginRequest.getEmail());

        return userRepository.findByEmail(loginRequest.getEmail())
                .map(user -> {
                    System.out.println("✅ User found: " + user.getEmail());

                    if (user.getPassword().equals(loginRequest.getPassword())) {
                        System.out.println("🔐 Password match!");

                        // Generate Basic Auth token
                        String rawCreds = user.getEmail() + ":" + user.getPassword();
                        String basicAuthToken = "Basic " + Base64.getEncoder().encodeToString(rawCreds.getBytes());

                        Map<String, Object> response = new HashMap<>();
                        response.put("id", user.getId());
                        response.put("name", user.getName());
                        response.put("email", user.getEmail());
                        response.put("role", user.getRole());
                        response.put("token", basicAuthToken); // ✅ This is used by your frontend

                        // ✅ Use employeeId for both employee and support roles
                        response.put("employeeId", user.getEmployeeId());

                        // ✅ Log which ID is being returned based on role
                        String role = user.getRole().toLowerCase();
                        if (role.contains("support")) {
                            System.out.println("🧑‍🔧 Returning handlerId (employeeId): " + user.getEmployeeId());
                        } else {
                            System.out.println("👤 Returning employeeId: " + user.getEmployeeId());
                        }

                        return ResponseEntity.ok(response);
                    } else {
                        System.out.println("❌ Invalid password");
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
                    }
                })
                .orElseGet(() -> {
                    System.out.println("❌ User not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                });
    }

    // ✅ SIGNUP API
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
