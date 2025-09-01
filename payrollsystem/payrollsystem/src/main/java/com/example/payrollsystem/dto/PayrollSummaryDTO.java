package com.example.payrollsystem.dto;

public class PayrollSummaryDTO {
    private int totalEmployees;
    private double totalBasic;
    private double totalBonus;
    private double totalDeductions;
    private double totalNetPay;

    // Getters and Setters
    public int getTotalEmployees() { return totalEmployees; }
    public void setTotalEmployees(int totalEmployees) { this.totalEmployees = totalEmployees; }

    public double getTotalBasic() { return totalBasic; }
    public void setTotalBasic(double totalBasic) { this.totalBasic = totalBasic; }

    public double getTotalBonus() { return totalBonus; }
    public void setTotalBonus(double totalBonus) { this.totalBonus = totalBonus; }

    public double getTotalDeductions() { return totalDeductions; }
    public void setTotalDeductions(double totalDeductions) { this.totalDeductions = totalDeductions; }

    public double getTotalNetPay() { return totalNetPay; }
    public void setTotalNetPay(double totalNetPay) { this.totalNetPay = totalNetPay; }
}
