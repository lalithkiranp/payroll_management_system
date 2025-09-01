package com.example.payrollsystem.controllers;

import com.example.payrollsystem.dto.DepartmentRequest;
import com.example.payrollsystem.entities.Department;
import com.example.payrollsystem.services.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    private final DepartmentService deptService;

    public DepartmentController(DepartmentService deptService) { this.deptService = deptService; }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody DepartmentRequest req) {
        Department d = deptService.create(req);
        return ResponseEntity.ok(d);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DepartmentRequest req) {
        try {
            Department d = deptService.update(id, req);
            return ResponseEntity.ok(d);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        deptService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> list() {
        List<Department> list = deptService.listAll();
        return ResponseEntity.ok(list.stream().map(d -> {
            var m = new java.util.HashMap<String, Object>();
            m.put("departmentId", d.getDepartmentId());
            m.put("name", d.getName());
            m.put("description", d.getDescription());
            return m;
        }).collect(Collectors.toList()));
    }
}
