package com.example.payrollsystem.services;

import com.example.payrollsystem.dto.LeaveRequestDTO;
import com.example.payrollsystem.dto.LeaveResponseDTO;
import com.example.payrollsystem.entities.Employee;
import com.example.payrollsystem.entities.Leave;
import com.example.payrollsystem.entities.LeaveStatus;
import com.example.payrollsystem.repositories.EmployeeRepository;
import com.example.payrollsystem.repositories.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveService {
    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveService(LeaveRepository leaveRepository, EmployeeRepository employeeRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
    }

    
    public List<LeaveResponseDTO> getAllLeaves() {
        return leaveRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    
    public LeaveResponseDTO applyLeave(LeaveRequestDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Leave leave = new Leave();
        leave.setEmployee(employee);
        leave.setStartDate(dto.getStartDate());
        leave.setEndDate(dto.getEndDate());
        leave.setLeaveType(dto.getLeaveType());
        leave.setStatus(LeaveStatus.PENDING);

        Leave saved = leaveRepository.save(leave);
        return mapToResponse(saved);
    }

    public List<LeaveResponseDTO> getEmployeeLeaves(Long employeeId) {
        return leaveRepository.findByEmployeeEmployeeId(employeeId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public LeaveResponseDTO updateLeaveStatus(Long leaveId, LeaveStatus status) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus(status);
        return mapToResponse(leaveRepository.save(leave));
    }

    private LeaveResponseDTO mapToResponse(Leave leave) {
        LeaveResponseDTO dto = new LeaveResponseDTO();
        dto.setLeaveId(leave.getLeaveId());
        dto.setEmployeeId(leave.getEmployee().getEmployeeId());
        dto.setStartDate(leave.getStartDate());
        dto.setEndDate(leave.getEndDate());
        dto.setLeaveType(leave.getLeaveType());
        dto.setStatus(leave.getStatus());
        return dto;
    }
}
