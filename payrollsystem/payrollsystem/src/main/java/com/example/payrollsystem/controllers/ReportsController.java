package com.example.payrollsystem.controllers;

import com.example.payrollsystem.dto.DepartmentCostDTO;
import com.example.payrollsystem.dto.PayrollSummaryDTO;
import com.example.payrollsystem.services.PayrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportsController {

    private final PayrollService payrollService;

    public ReportsController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/payroll/summary")
    public ResponseEntity<PayrollSummaryDTO> payrollSummary(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(payrollService.getPayrollSummary(year, month));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/department-cost")
    public ResponseEntity<List<DepartmentCostDTO>> departmentCost(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(payrollService.getDepartmentCostReport(year, month));
    }
}
