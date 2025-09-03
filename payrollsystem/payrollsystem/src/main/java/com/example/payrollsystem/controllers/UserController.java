package com.example.payrollsystem.controllers;

import com.example.payrollsystem.dto.UserRequest;
import com.example.payrollsystem.dto.UserResponse;
import com.example.payrollsystem.entities.User;
import com.example.payrollsystem.services.UserService;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) { this.userService = userService; }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserRequest req) {
        try {
            UserResponse resp = userService.createUser(req);
            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }



    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String username = auth.getName();
        Optional<User> optUser = userService.findByUsername(username);

        if (optUser.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        UserResponse resp = userService.mapToResponse(optUser.get());
        return ResponseEntity.ok(resp);
    }

    
}
