// src/pages/employee/EmployeeDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaUser, FaEnvelope, FaBriefcase, FaBuilding } from "react-icons/fa";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in employee details
  const fetchEmployee = async () => {
    try {
      const res = await api.get("/users/me");
      setEmployee(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employee details:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (loading) return <p>Loading employee details...</p>;
  if (!employee) return <p>No employee data available.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Profile</h2>

      <div className="card shadow p-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="text-center mb-4">
          <FaUser size={60} className="text-primary" />
          <h3 className="mt-2">{employee.username}</h3>
          <span className="badge bg-secondary">{employee.role}</span>
        </div>

        <div className="row mt-3">
          <div className="col-6 mb-3">
            <div className="d-flex align-items-center">
              <FaEnvelope className="me-2 text-primary" />
              <div>
                <small className="text-muted">Email</small>
                <div>{employee.email}</div>
              </div>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="d-flex align-items-center">
              <FaBriefcase className="me-2 text-primary" />
              <div>
                <small className="text-muted">Job Role</small>
                <div>{employee.jobRole || "N/A"}</div>
              </div>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="d-flex align-items-center">
              <FaBuilding className="me-2 text-primary" />
              <div>
                <small className="text-muted">Department</small>
                <div>{employee.departmentName || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
