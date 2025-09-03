package com.example.payrollsystem.services;

import com.example.payrollsystem.dto.UserRequest;
import com.example.payrollsystem.dto.UserResponse;
import com.example.payrollsystem.entities.User;
import com.example.payrollsystem.repositories.EmployeeRepository;
import com.example.payrollsystem.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;		//
    
    public UserService(UserRepository userRepository , EmployeeRepository employeeRepository) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(request.getRole() == null ? "EMPLOYEE" : request.getRole().toUpperCase());
        User saved = userRepository.save(user);

        UserResponse resp = new UserResponse();
        resp.setUserId(saved.getUserId());
        resp.setUsername(saved.getUsername());
        resp.setEmail(saved.getEmail());
        resp.setRole(saved.getRole());
        return resp;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
 
    public UserResponse mapToResponse(User user) {
        UserResponse resp = new UserResponse();
        resp.setUserId(user.getUserId());
        resp.setUsername(user.getUsername());
        resp.setEmail(user.getEmail());
        resp.setRole(user.getRole());

        if ("EMPLOYEE".equalsIgnoreCase(user.getRole()) && user.getEmployee() != null) {
            resp.setEmployeeId(user.getEmployee().getEmployeeId());
            resp.setJobRole(user.getEmployee().getDesignation());

            if (user.getEmployee().getDepartment() != null) {
                resp.setDepartmentName(user.getEmployee().getDepartment().getName());
            }

            if (user.getEmployee().getDob() != null) {
                resp.setDob(user.getEmployee().getDob().toString()); 
            }
            resp.setAddress(user.getEmployee().getAddress());
        
        }

        return resp;
    }
    
    
}
