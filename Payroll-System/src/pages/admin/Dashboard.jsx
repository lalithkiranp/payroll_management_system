// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { FaUsers, FaBriefcase, FaBuilding } from "react-icons/fa";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalJobs: 0,
    totalDepartments: 0,
  });
  const [loading, setLoading] = useState(true);

  // Form state for adding new user
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    fetchAdminDetails();
    fetchStats();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const res = await api.get("/users/me");
      setAdmin(res.data);
    } catch (err) {
      console.error("Error fetching admin details:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const [empRes, jobRes, deptRes] = await Promise.all([
        api.get("/employees"),
        api.get("/jobs"),
        api.get("/departments"),
      ]);
      setStats({
        totalEmployees: empRes.data.length,
        totalJobs: jobRes.data.length,
        totalDepartments: deptRes.data.length,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users", newUser);
      alert(`User ${res.data.username} added successfully`);
      setNewUser({ username: "", email: "", password: "", role: "EMPLOYEE" });
      fetchStats(); // refresh stats
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Top Stats Cards */}
      <div className="d-flex justify-content-between mb-4">
        <div className="card text-center flex-fill me-3">
          <div className="card-body">
            <FaUsers size={32} className="mb-2" />
            <h5 className="card-title">Employees</h5>
            <p className="card-text">{stats.totalEmployees}</p>
          </div>
        </div>
        <div className="card text-center flex-fill me-3">
          <div className="card-body">
            <FaBriefcase size={32} className="mb-2" />
            <h5 className="card-title">Jobs</h5>
            <p className="card-text">{stats.totalJobs}</p>
          </div>
        </div>
        <div className="card text-center flex-fill">
          <div className="card-body">
            <FaBuilding size={32} className="mb-2" />
            <h5 className="card-title">Departments</h5>
            <p className="card-text">{stats.totalDepartments}</p>
          </div>
        </div>
      </div>

      {/* Admin Details */}
      {admin && (
        <div className="mb-4">
          <h4>Logged-in Admin Details</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>User ID</th>
                <td>{admin.userId}</td>
              </tr>
              <tr>
                <th>Username</th>
                <td>{admin.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{admin.email}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{admin.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Add New User Form */}
      <div className="mb-5">
        <h4>Add New User</h4>
        <form onSubmit={handleAddUser}>
          <div className="mb-2">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label>Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
