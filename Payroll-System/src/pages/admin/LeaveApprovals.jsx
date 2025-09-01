// src/pages/admin/LeaveApprovals.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function LeaveApprovals() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null); // track which dropdown is open

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get("/leaves");
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leaves:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const getEmployeeName = (employeeId) => {
    const emp = employees.find((e) => e.employeeId === employeeId);
    return emp ? `${emp.firstName} ${emp.lastName}` : "Unknown";
  };

  const updateStatus = async (leaveId, status) => {
    try {
      const res = await api.put(`/leaves/${leaveId}/status?status=${status}`, {});
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.leaveId === leaveId ? { ...leave, status: res.data.status } : leave
        )
      );
      setOpenDropdownId(null);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update leave status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "APPROVED":
        return "green";
      case "REJECTED":
        return "red";
      default:
        return "black";
    }
  };

  if (loading) return <p>Loading leave requests...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Leave Approvals</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Leave ID</th>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.leaveId}</td>
                <td>{getEmployeeName(leave.employeeId)}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.leaveType}</td>
                <td style={{ color: getStatusColor(leave.status), fontWeight: "bold" }}>
                  {leave.status}
                </td>
                <td style={{ position: "relative" }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ backgroundColor: getStatusColor(leave.status), color: "white" }}
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === leave.leaveId ? null : leave.leaveId)
                    }
                  >
                    Change Status
                  </button>

                  {openDropdownId === leave.leaveId && (
                    <div
                      style={{
                        position: "absolute",
                        top: "35px",
                        left: 0,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        zIndex: 10,
                        minWidth: "120px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      {["PENDING", "APPROVED", "REJECTED"].map((s) => (
                        <div
                          key={s}
                          style={{
                            padding: "8px 12px",
                            cursor: leave.status === s ? "not-allowed" : "pointer",
                            color: getStatusColor(s),
                            fontWeight: leave.status === s ? "bold" : "normal",
                            backgroundColor: leave.status === s ? "#f0f0f0" : "#fff",
                          }}
                          onClick={() => leave.status !== s && updateStatus(leave.leaveId, s)}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
