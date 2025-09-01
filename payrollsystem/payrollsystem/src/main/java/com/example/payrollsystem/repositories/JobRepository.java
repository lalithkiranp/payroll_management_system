package com.example.payrollsystem.repositories;

import com.example.payrollsystem.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByTitle(String title);
}
