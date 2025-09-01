package com.example.payrollsystem.dto;

import com.example.payrollsystem.entities.PayrollStatus;
import java.time.LocalDate;
import java.util.List;

public class PayrollRunResponse {
    private Long payrollRunId;
    private int year;
    private int month;
    private PayrollStatus status;
    private LocalDate createdAt;
    private List<PayrollItemDTO> items;

    public Long getPayrollRunId() {
        return payrollRunId;
    }

    public void setPayrollRunId(Long payrollRunId) {
        this.payrollRunId = payrollRunId;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public PayrollStatus getStatus() {
        return status;
    }

    public void setStatus(PayrollStatus status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public List<PayrollItemDTO> getItems() {
        return items;
    }

    public void setItems(List<PayrollItemDTO> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "PayrollRunResponse{" +
                "payrollRunId=" + payrollRunId +
                ", year=" + year +
                ", month=" + month +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", items=" + items +
                '}';
    }
}
