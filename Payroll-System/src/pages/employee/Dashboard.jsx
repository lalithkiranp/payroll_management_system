
import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaBuilding,
  FaIdBadge,
  FaBirthdayCake,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

 
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
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "750px",
          width: "100%",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        }}
      >
      
        <div className="text-center mb-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
            style={{
              width: "120px",
              height: "120px",
              background: "linear-gradient(135deg, #007bff, #6c63ff)",
              color: "white",
              fontSize: "50px",
            }}
          >
            <FaUser />
          </div>
          <h3 className="mt-3 fw-bold">{employee.username}</h3>
          <span className="badge bg-primary px-3 py-2 fs-6 shadow-sm">
            {employee.role}
          </span>
        </div>

        <div className="row g-4 mt-2">
          <ProfileItem
            icon={<FaEnvelope />}
            label="Email"
            value={employee.email}
          />
          <ProfileItem
            icon={<FaIdBadge />}
            label="Employee ID"
            value={employee.employeeId || "N/A"}
          />
          <ProfileItem
            icon={<FaBriefcase />}
            label="Job Role"
            value={employee.jobRole || "N/A"}
          />
          <ProfileItem
            icon={<FaBuilding />}
            label="Department"
            value={employee.departmentName || "N/A"}
          />
          <ProfileItem
            icon={<FaBirthdayCake />}
            label="Date of Birth"
            value={employee.dob || "N/A"}
          />
          <ProfileItem
            icon={<FaMapMarkerAlt />}
            label="Location"
            value={employee.address || "N/A"}
          />
        </div>
      </div>
    </div>
  );
}


function ProfileItem({ icon, label, value }) {
  return (
    <div className="col-12 col-md-6">
      <div
        className="d-flex align-items-center p-3 h-100 shadow-sm rounded"
        style={{ background: "white" }}
      >
        <div
          className="me-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "45px",
            height: "45px",
            background: "linear-gradient(135deg, #6c63ff, #007bff)",
            color: "white",
            fontSize: "18px",
          }}
        >
          {icon}
        </div>
        <div>
          <small className="text-muted">{label}</small>
          <div className="fw-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}
