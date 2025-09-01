package com.example.payrollsystem.repositories;

import com.example.payrollsystem.entities.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployeeEmployeeId(Long employeeId);
}
