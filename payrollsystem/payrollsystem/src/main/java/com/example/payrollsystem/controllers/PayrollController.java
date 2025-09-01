package com.example.payrollsystem.controllers;

import com.example.payrollsystem.dto.*;
import com.example.payrollsystem.entities.PayrollRun;
import com.example.payrollsystem.services.PayrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/v1/payroll/runs")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) { this.payrollService = payrollService; }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<PayrollRunResponse>> getAllPayrollRuns() {
        return ResponseEntity.ok(payrollService.getAllPayrollRuns());
    }

  

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<PayrollRun> create(@RequestBody PayrollRunRequest req) {
        return ResponseEntity.ok(payrollService.createPayrollRun(req.getYear(), req.getMonth()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/process")
    public ResponseEntity<PayrollRun> process(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.processPayroll(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/lock")
    public ResponseEntity<PayrollRun> lock(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.lockPayroll(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/items")
    public ResponseEntity<List<PayrollItemDTO>> items(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.getPayrollItems(id));
    }
    @GetMapping("/my/{year}/{month}")
    public ResponseEntity<PayrollItemDTO> getMyPayroll(
            @PathVariable int year,
            @PathVariable int month,
            Authentication authentication) {

        String username = authentication.getName(); // gets the username from JWT
        PayrollItemDTO dto = payrollService.getEmployeePayroll(username, year, month);
        return ResponseEntity.ok(dto);
    }
   

}
