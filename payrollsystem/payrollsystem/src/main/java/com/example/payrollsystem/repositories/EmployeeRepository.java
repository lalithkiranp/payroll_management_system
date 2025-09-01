package com.example.payrollsystem.repositories;

import com.example.payrollsystem.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUser_UserId(Long userId);
    Optional<Employee> findByUser_Username(String username);

}
