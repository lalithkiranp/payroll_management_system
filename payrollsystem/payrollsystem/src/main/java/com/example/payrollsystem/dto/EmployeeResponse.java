package com.example.payrollsystem.dto;

public class EmployeeResponse {
    private Long employeeId;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String designation;
    private Long departmentId;
    private String departmentName;
    private Long jobId;
    private String jobTitle;
    private double jobBasicPay;

    // getters & setters...
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
	public double getJobBasicPay() {
		return jobBasicPay;
	}
	public void setJobBasicPay(double jobBasicPay) {
		this.jobBasicPay = jobBasicPay;
	}
}
