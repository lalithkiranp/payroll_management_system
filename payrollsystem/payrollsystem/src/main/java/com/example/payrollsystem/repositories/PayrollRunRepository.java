package com.example.payrollsystem.repositories;

import com.example.payrollsystem.entities.PayrollRun;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PayrollRunRepository extends JpaRepository<PayrollRun, Long> {
    Optional<PayrollRun> findByYearAndMonth(int year, int month);
}
