package com.example.payrollsystem.repositories;

import com.example.payrollsystem.entities.Employee;
import com.example.payrollsystem.entities.PayrollItem;
import com.example.payrollsystem.entities.PayrollRun;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PayrollItemRepository extends JpaRepository<PayrollItem, Long> {
	List<PayrollItem> findByPayrollRun_PayrollRunId(Long payrollRunId);
	Optional<PayrollItem> findByPayrollRunAndEmployee(PayrollRun run, Employee emp);

	List<PayrollItem> findByPayrollRun_YearAndPayrollRun_Month(int year, int month);

}
