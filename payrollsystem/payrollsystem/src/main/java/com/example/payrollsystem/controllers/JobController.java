package com.example.payrollsystem.controllers;

import com.example.payrollsystem.dto.JobRequest;
import com.example.payrollsystem.dto.JobResponse;
import com.example.payrollsystem.entities.Job;
import com.example.payrollsystem.services.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<JobResponse> create(@RequestBody JobRequest req) {
        Job job = new Job();
        job.setTitle(req.getTitle());
        job.setDescription(req.getDescription());
        job.setBasicPay(req.getBasicPay());   

        Job saved = jobService.create(job);

        JobResponse resp = new JobResponse();
        resp.setJobId(saved.getJobId());
        resp.setTitle(saved.getTitle());
        resp.setDescription(saved.getDescription());
        resp.setBasicPay(saved.getBasicPay());
        return ResponseEntity.ok(resp);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<JobResponse>> list() {
        List<Job> jobs = jobService.listAll();

        List<JobResponse> response = jobs.stream().map(job -> {
            JobResponse resp = new JobResponse();
            resp.setJobId(job.getJobId());
            resp.setTitle(job.getTitle());
            resp.setDescription(job.getDescription());
            resp.setBasicPay(job.getBasicPay());
            return resp;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody JobRequest req) {
        try {
            Job job = new Job();
            job.setTitle(req.getTitle());
            job.setDescription(req.getDescription());
            job.setBasicPay(req.getBasicPay());
            Job updated = jobService.update(id, job);

            JobResponse resp = new JobResponse();
            resp.setJobId(updated.getJobId());
            resp.setTitle(updated.getTitle());
            resp.setDescription(updated.getDescription());
            resp.setBasicPay(updated.getBasicPay());

            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
