package com.example.payrollsystem.dto;

public class DepartmentCostDTO {
    private String departmentName;
    private int employeeCount;
    private double totalBasic;
    private double totalBonus;
    private double totalDeductions;
    private double totalNetPay;

    // Getters and Setters
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public int getEmployeeCount() { return employeeCount; }
    public void setEmployeeCount(int employeeCount) { this.employeeCount = employeeCount; }

    public double getTotalBasic() { return totalBasic; }
    public void setTotalBasic(double totalBasic) { this.totalBasic = totalBasic; }

    public double getTotalBonus() { return totalBonus; }
    public void setTotalBonus(double totalBonus) { this.totalBonus = totalBonus; }

    public double getTotalDeductions() { return totalDeductions; }
    public void setTotalDeductions(double totalDeductions) { this.totalDeductions = totalDeductions; }

    public double getTotalNetPay() { return totalNetPay; }
    public void setTotalNetPay(double totalNetPay) { this.totalNetPay = totalNetPay; }
}
