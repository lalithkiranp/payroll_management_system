// // src/pages/employee/LeaveRequests.jsx
// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function LeaveRequests() {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   const [form, setForm] = useState({
//     startDate: "",
//     endDate: "",
//     leaveType: "sick",
//   });

//   // Fetch logged-in user info
//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/users/me");
//       setUser(res.data);
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//     }
//   };

//   // Fetch leave requests for the logged-in employee
//   const fetchLeaves = async (employeeId) => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/leaves/employee/${employeeId}`);
//       setLeaves(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching leave requests:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       await fetchUser();
//     };
//     initialize();
//   }, []);

//   // Fetch leaves once user is loaded
//   useEffect(() => {
//     if (user?.employeeId) {
//       fetchLeaves(user.employeeId);
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user?.employeeId) return;

//     const payload = {
//       employeeId: user.employeeId,
//       startDate: form.startDate,
//       endDate: form.endDate,
//       leaveType: form.leaveType,
//     };

//     try {
//       await api.post("/leaves", payload);
//       alert("Leave requested successfully!");
//       setForm({ startDate: "", endDate: "", leaveType: "sick" });
//       fetchLeaves(user.employeeId); // refresh the table
//     } catch (err) {
//       console.error("Error requesting leave:", err);
//       alert("Failed to request leave");
//     }
//   };

//   if (loading) return <p>Loading leave requests...</p>;

//   return (
//     <div className="container">
//       <h2 className="mb-4">My Leave Requests</h2>

//       {/* Leave Request Form */}
//       <div className="card p-3 mb-4">
//         <h5>Apply for Leave</h5>
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-4 mb-2">
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={form.startDate}
//                 onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="col-md-4 mb-2">
//               <label>End Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={form.endDate}
//                 onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="col-md-4 mb-2">
//               <label>Leave Type</label>
//               <select
//                 className="form-select"
//                 value={form.leaveType}
//                 onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
//               >
//                 <option value="sick">Sick</option>
//                 <option value="casual">Casual</option>
//                 <option value="earned">Earned</option>
//               </select>
//             </div>
//           </div>
//           <button type="submit" className="btn btn-primary mt-2">
//             Apply
//           </button>
//         </form>
//       </div>

//       {/* Leave Requests Table */}
//       <table className="table table-bordered table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Leave Type</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.length > 0 ? (
//             leaves.map((leave) => (
//               <tr key={leave.leaveId}>
//                 <td>{leave.leaveId}</td>
//                 <td>{leave.startDate}</td>
//                 <td>{leave.endDate}</td>
//                 <td>{leave.leaveType}</td>
//                 <td
//                   style={{
//                     color:
//                       leave.status === "APPROVED"
//                         ? "green"
//                         : leave.status === "REJECTED"
//                         ? "red"
//                         : "orange",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {leave.status}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No leave requests found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/pages/employee/LeaveRequests.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaCalendarAlt, FaRegClock, FaClipboardList } from "react-icons/fa";

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

  if (loading) return <p className="text-center mt-4">Loading leave requests...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Leave Requests</h2>

      {/* Leave Request Form */}
      <div className="card shadow p-4 mb-4 rounded-3 border-0">
        <h5 className="mb-3 text-primary d-flex align-items-center">
          Apply for Leave
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Start Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">End Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaRegClock />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Leave Type</label>
              <select
                className="form-select"
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
              >
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="earned">Earned Leave</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-2 px-4 rounded-pill shadow-sm">
            Apply Leave
          </button>
        </form>
      </div>

      {/* Leave Requests Table */}
      <div className="card shadow border-0 rounded-3">
        <div className="card-header bg-dark text-white fw-semibold">
          Leave History
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Leave Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave.leaveId}>
                    <td>{index + 1}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>
                      <span className="badge bg-info text-dark px-3 py-2">
                        {leave.leaveType}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          leave.status === "APPROVED"
                            ? "bg-success"
                            : leave.status === "REJECTED"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-3 text-muted">
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

