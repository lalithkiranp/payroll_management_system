package com.example.payrollsystem.services;

import com.example.payrollsystem.dto.PayrollItemDTO;
import com.example.payrollsystem.dto.PayrollRunResponse;
import com.example.payrollsystem.entities.Employee;
import com.example.payrollsystem.entities.PayrollItem;
import com.example.payrollsystem.entities.PayrollRun;
import com.example.payrollsystem.entities.PayrollStatus;
import com.example.payrollsystem.repositories.EmployeeRepository;
import com.example.payrollsystem.repositories.PayrollItemRepository;
import com.example.payrollsystem.repositories.PayrollRunRepository;
import org.springframework.stereotype.Service;


import com.example.payrollsystem.dto.DepartmentCostDTO;
import com.example.payrollsystem.dto.PayrollSummaryDTO;
import com.example.payrollsystem.entities.PayrollItem;




import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PayrollService {

    private final PayrollRunRepository runRepo;
    private final PayrollItemRepository itemRepo;
    private final EmployeeRepository empRepo;

   

    public PayrollService(PayrollRunRepository runRepo, PayrollItemRepository itemRepo, EmployeeRepository empRepo) {
        this.runRepo = runRepo;
        this.itemRepo = itemRepo;
        this.empRepo = empRepo;
    }

    public PayrollRun createPayrollRun(int year, int month) {
        PayrollRun run = new PayrollRun();
        run.setYear(year);
        run.setMonth(month);
        run.setStatus(PayrollStatus.CREATED);
        run.setCreatedAt(LocalDate.now());
        return runRepo.save(run);
    }

    public PayrollRun processPayroll(Long runId) {
        PayrollRun run = runRepo.findById(runId).orElseThrow(() -> new RuntimeException("Payroll run not found"));

        if (run.getStatus() != PayrollStatus.CREATED) {
            throw new RuntimeException("Only CREATED runs can be processed");
        }

        List<Employee> employees = empRepo.findAll();

        List<PayrollItem> items = employees.stream().map(emp -> {
            PayrollItem item = new PayrollItem();
            item.setPayrollRun(run);

         
            item.setEmployee(emp);
           

            double basic = emp.getJob().getBasicPay();
           
            double bonus;
            if (basic > 50000) {
                bonus = basic * 0.10;
            } else if (basic > 30000) {
                bonus = basic * 0.05;
            } else {
                bonus = basic * 0.02;
            }

           
            double deductions;
            if (basic <= 25000) {
                deductions = basic * 0.05;
            } else if (basic <= 50000) {
                deductions = basic * 0.10;
            } else {
                deductions = basic * 0.20;
            }

            item.setBasicPay(basic);
            item.setBonus(bonus);
            item.setDeductions(deductions);
            item.setNetPay(basic + bonus - deductions);

            return item;
        }).collect(Collectors.toList());

        itemRepo.saveAll(items);

        run.setStatus(PayrollStatus.PROCESSED);
        return runRepo.save(run);
    }

    public PayrollRun lockPayroll(Long runId) {
        PayrollRun run = runRepo.findById(runId).orElseThrow(() -> new RuntimeException("Payroll run not found"));

        if (run.getStatus() != PayrollStatus.PROCESSED) {
            throw new RuntimeException("Only PROCESSED runs can be locked");
        }

        run.setStatus(PayrollStatus.LOCKED);
        return runRepo.save(run);
    }

    public List<PayrollItemDTO> getPayrollItems(Long runId) {
        List<PayrollItem> items = itemRepo.findByPayrollRun_PayrollRunId(runId);

        return items.stream().map(item -> {
            PayrollItemDTO dto = new PayrollItemDTO();
            dto.setEmployeeId(item.getEmployee().getEmployeeId());
            dto.setEmployeeName(item.getEmployee().getFirstName() + " " + item.getEmployee().getLastName());
            dto.setBasicPay(item.getBasicPay());
            dto.setBonus(item.getBonus());
            dto.setDeductions(item.getDeductions());
            dto.setNetPay(item.getNetPay());
            return dto;
        }).collect(Collectors.toList());
    }
    
  //newly added  
    public List<PayrollRunResponse> getAllPayrollRuns() {
        List<PayrollRun> runs = runRepo.findAll();
        return runs.stream().map(run -> {
            PayrollRunResponse resp = new PayrollRunResponse();
            resp.setPayrollRunId(run.getPayrollRunId());
            
            resp.setYear(run.getYear());
            resp.setMonth(run.getMonth());
            resp.setStatus(run.getStatus());
            resp.setCreatedAt(run.getCreatedAt());

            // Map payroll items to DTOs
            List<PayrollItemDTO> items = run.getPayrollItems() != null
                    ? run.getPayrollItems().stream().map(item -> {
                        PayrollItemDTO dto = new PayrollItemDTO();
                        dto.setEmployeeId(item.getEmployee().getEmployeeId());
                        dto.setEmployeeName(item.getEmployee().getFirstName() + " " + item.getEmployee().getLastName());
                        dto.setBasicPay(item.getBasicPay());
                        dto.setBonus(item.getBonus());
                        dto.setDeductions(item.getDeductions());
                        dto.setNetPay(item.getNetPay());
                        return dto;
                    }).collect(Collectors.toList())
                    : new ArrayList<>();

            resp.setItems(items);
            return resp;
        }).collect(Collectors.toList());
    }
    
    
    
    
    public PayrollItemDTO getEmployeePayroll(String username, int year, int month) {
        Employee emp = empRepo.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        PayrollRun run = runRepo.findByYearAndMonth(year, month)
                .orElseThrow(() -> new RuntimeException("Payroll run not found for the given period"));

        PayrollItem item = itemRepo.findByPayrollRunAndEmployee(run, emp)
                .orElseThrow(() -> new RuntimeException("Payroll item not found for employee"));

        PayrollItemDTO dto = new PayrollItemDTO();
        dto.setEmployeeId(emp.getEmployeeId());
        dto.setEmployeeName(emp.getFirstName() + " " + emp.getLastName());
        dto.setBasicPay(item.getBasicPay());
        dto.setBonus(item.getBonus());
        dto.setDeductions(item.getDeductions());
        dto.setNetPay(item.getNetPay());

        return dto;
    }
    
 // Payroll Summary Report
    
    public PayrollSummaryDTO getPayrollSummary(int year, int month) {
        List<PayrollItem> items = itemRepo.findByPayrollRun_YearAndPayrollRun_Month(year, month);

        PayrollSummaryDTO dto = new PayrollSummaryDTO();
        dto.setTotalEmployees(items.size());
        dto.setTotalBasic(items.stream().mapToDouble(PayrollItem::getBasicPay).sum());
        dto.setTotalBonus(items.stream().mapToDouble(PayrollItem::getBonus).sum());
        dto.setTotalDeductions(items.stream().mapToDouble(PayrollItem::getDeductions).sum());
        dto.setTotalNetPay(items.stream().mapToDouble(PayrollItem::getNetPay).sum());

        return dto;
    }
    
 // Department Cost Report
    
    public List<DepartmentCostDTO> getDepartmentCostReport(int year, int month) {
        List<PayrollItem> items = itemRepo.findByPayrollRun_YearAndPayrollRun_Month(year, month);

        Map<String, List<PayrollItem>> grouped = items.stream()
                .collect(Collectors.groupingBy(item -> item.getEmployee().getDepartment().getName()));

        List<DepartmentCostDTO> report = new ArrayList<>();
        for (Map.Entry<String, List<PayrollItem>> entry : grouped.entrySet()) {
            DepartmentCostDTO dto = new DepartmentCostDTO();
            dto.setDepartmentName(entry.getKey());
            List<PayrollItem> deptItems = entry.getValue();
            dto.setEmployeeCount(deptItems.size());
            dto.setTotalBasic(deptItems.stream().mapToDouble(PayrollItem::getBasicPay).sum());
            dto.setTotalBonus(deptItems.stream().mapToDouble(PayrollItem::getBonus).sum());
            dto.setTotalDeductions(deptItems.stream().mapToDouble(PayrollItem::getDeductions).sum());
            dto.setTotalNetPay(deptItems.stream().mapToDouble(PayrollItem::getNetPay).sum());
            report.add(dto);
        }

        return report;
    }
    
    
    
    
    


}
