package com.example.payrollsystem.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "payroll_runs")
public class PayrollRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payrollRunId;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private int month;

    @Enumerated(EnumType.STRING)
    private PayrollStatus status = PayrollStatus.CREATED;

    @OneToMany(mappedBy = "payrollRun", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PayrollItem> payrollItems;

    private LocalDate createdAt = LocalDate.now();

    // getters & setters
    public Long getPayrollRunId() { return payrollRunId; }
    public void setPayrollRunId(Long payrollRunId) { this.payrollRunId = payrollRunId; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }

    public PayrollStatus getStatus() { return status; }
    public void setStatus(PayrollStatus status) { this.status = status; }

    public List<PayrollItem> getPayrollItems() { return payrollItems; }
    public void setPayrollItems(List<PayrollItem> payrollItems) { this.payrollItems = payrollItems; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
}
