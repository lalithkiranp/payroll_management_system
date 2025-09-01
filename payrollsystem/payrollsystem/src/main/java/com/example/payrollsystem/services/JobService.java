package com.example.payrollsystem.services;

import com.example.payrollsystem.entities.Job;
import com.example.payrollsystem.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepo;

    public JobService(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
    }

    public Job create(Job job) {
        return jobRepo.save(job);
    }

    public List<Job> listAll() {
        return jobRepo.findAll();
    }

    public Optional<Job> findById(Long id) {
        return jobRepo.findById(id);
    }

    public Job update(Long id, Job updated) {
        Job j = jobRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Job not found"));
        j.setTitle(updated.getTitle());
        j.setDescription(updated.getDescription());
        j.setBasicPay(updated.getBasicPay());
        return jobRepo.save(j);
    }

    public void delete(Long id) {
        jobRepo.deleteById(id);
    }
}
