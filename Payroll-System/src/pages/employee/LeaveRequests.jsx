// src/pages/employee/LeaveRequests.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    leaveType: "sick",
  });

  // Fetch logged-in user info
  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  // Fetch leave requests for the logged-in employee
  const fetchLeaves = async (employeeId) => {
    try {
      setLoading(true);
      const res = await api.get(`/leaves/employee/${employeeId}`);
      setLeaves(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching leave requests:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchUser();
    };
    initialize();
  }, []);

  // Fetch leaves once user is loaded
  useEffect(() => {
    if (user?.employeeId) {
      fetchLeaves(user.employeeId);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.employeeId) return;

    const payload = {
      employeeId: user.employeeId,
      startDate: form.startDate,
      endDate: form.endDate,
      leaveType: form.leaveType,
    };

    try {
      await api.post("/leaves", payload);
      alert("Leave requested successfully!");
      setForm({ startDate: "", endDate: "", leaveType: "sick" });
      fetchLeaves(user.employeeId); // refresh the table
    } catch (err) {
      console.error("Error requesting leave:", err);
      alert("Failed to request leave");
    }
  };

  if (loading) return <p>Loading leave requests...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">My Leave Requests</h2>

      {/* Leave Request Form */}
      <div className="card p-3 mb-4">
        <h5>Apply for Leave</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-2">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 mb-2">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4 mb-2">
              <label>Leave Type</label>
              <select
                className="form-select"
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
              >
                <option value="sick">Sick</option>
                <option value="casual">Casual</option>
                <option value="earned">Earned</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Apply
          </button>
        </form>
      </div>

      {/* Leave Requests Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.leaveId}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.leaveType}</td>
                <td
                  style={{
                    color:
                      leave.status === "APPROVED"
                        ? "green"
                        : leave.status === "REJECTED"
                        ? "red"
                        : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {leave.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
