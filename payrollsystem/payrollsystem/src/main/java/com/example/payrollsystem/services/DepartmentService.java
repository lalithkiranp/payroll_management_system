package com.example.payrollsystem.services;

import com.example.payrollsystem.dto.DepartmentRequest;
import com.example.payrollsystem.entities.Department;
import com.example.payrollsystem.repositories.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository deptRepo;

    public DepartmentService(DepartmentRepository deptRepo) {
        this.deptRepo = deptRepo;
    }

    public Department create(DepartmentRequest req) {
        Department d = new Department();
        d.setName(req.getName());
        d.setDescription(req.getDescription());
        return deptRepo.save(d);
    }

    public List<Department> listAll() {
        return deptRepo.findAll();
    }

    public Optional<Department> findById(Long id) {
        return deptRepo.findById(id);
    }

    public Department update(Long id, DepartmentRequest req) {
        Department dep = deptRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Department not found"));
        dep.setName(req.getName());
        dep.setDescription(req.getDescription());
        return deptRepo.save(dep);
    }

    public void delete(Long id) {
        deptRepo.deleteById(id);
    }
}
