package com.example.payrollsystem.services;

import com.example.payrollsystem.dto.EmployeeRequest;
import com.example.payrollsystem.dto.EmployeeResponse;
import com.example.payrollsystem.entities.Department;
import com.example.payrollsystem.entities.Employee;
import com.example.payrollsystem.entities.Job;
import com.example.payrollsystem.entities.User;
import com.example.payrollsystem.repositories.DepartmentRepository;
import com.example.payrollsystem.repositories.EmployeeRepository;
import com.example.payrollsystem.repositories.JobRepository;
import com.example.payrollsystem.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository empRepo;
    private final UserRepository userRepo;
    private final DepartmentRepository deptRepo;
    private final JobRepository jobRepo;

    public EmployeeService(EmployeeRepository empRepo, UserRepository userRepo,
                           DepartmentRepository deptRepo, JobRepository jobRepo) {
        this.empRepo = empRepo;
        this.userRepo = userRepo;
        this.deptRepo = deptRepo;
        this.jobRepo = jobRepo;
    }

    @Transactional
    public EmployeeResponse create(EmployeeRequest req) {
        User user = userRepo.findById(req.getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Employee emp = new Employee();
        emp.setUser(user);
        emp.setFirstName(req.getFirstName());
        emp.setLastName(req.getLastName());
        emp.setDob(req.getDob());
        emp.setPhone(req.getPhone());
        emp.setAddress(req.getAddress());
        emp.setDesignation(req.getDesignation());

        if (req.getDepartmentId() != null) {
            Department dep = deptRepo.findById(req.getDepartmentId()).orElseThrow(() -> new IllegalArgumentException("Department not found"));
            emp.setDepartment(dep);
        }
        if (req.getJobId() != null) {
            Job job = jobRepo.findById(req.getJobId()).orElseThrow(() -> new IllegalArgumentException("Job not found"));
            emp.setJob(job);
        }

        Employee saved = empRepo.save(emp);
        return mapToResponse(saved);
    }

    public List<EmployeeResponse> listAll() {
        List<Employee> list = empRepo.findAll();
        return list.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public Optional<EmployeeResponse> findById(Long id) {
        return empRepo.findById(id).map(this::mapToResponse);
    }

    @Transactional
    public EmployeeResponse update(Long id, EmployeeRequest req) {
        Employee emp = empRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        emp.setFirstName(req.getFirstName());
        emp.setLastName(req.getLastName());
        emp.setDob(req.getDob());
        emp.setPhone(req.getPhone());
        emp.setAddress(req.getAddress());
        emp.setDesignation(req.getDesignation());

        if (req.getDepartmentId() != null) {
            Department dep = deptRepo.findById(req.getDepartmentId()).orElseThrow(() -> new IllegalArgumentException("Department not found"));
            emp.setDepartment(dep);
        }
        if (req.getJobId() != null) {
            Job job = jobRepo.findById(req.getJobId()).orElseThrow(() -> new IllegalArgumentException("Job not found"));
            emp.setJob(job);
        }
        Employee saved = empRepo.save(emp);
        return mapToResponse(saved);
    }

    public void delete(Long id) {
        empRepo.deleteById(id);
    }

    private EmployeeResponse mapToResponse(Employee e) {
        EmployeeResponse r = new EmployeeResponse();
        r.setEmployeeId(e.getEmployeeId());
        r.setUserId(e.getUser().getUserId());
        r.setFirstName(e.getFirstName());
        r.setLastName(e.getLastName());
        r.setEmail(e.getUser().getEmail());
        r.setPhone(e.getPhone());
        r.setDesignation(e.getDesignation());
        if (e.getDepartment() != null) {
            r.setDepartmentId(e.getDepartment().getDepartmentId());
            r.setDepartmentName(e.getDepartment().getName());
        }
        if (e.getJob() != null) {
            r.setJobId(e.getJob().getJobId());
            r.setJobTitle(e.getJob().getTitle());
            r.setJobBasicPay(e.getJob().getBasicPay());
        }
        return r;
    }
}
