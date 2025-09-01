// src/pages/admin/Employees.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    departmentId: "",
    jobId: "",
    address: "",
    dob: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch employees, jobs, and departments
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setLoading(false);
    }
  };

  const fetchJobsAndDepartments = async () => {
    try {
      const [jobsRes, deptRes] = await Promise.all([
        api.get("/jobs"),
        api.get("/departments"),
      ]);
      setJobs(jobsRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      console.error("Error fetching jobs/departments:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchJobsAndDepartments();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.employeeId !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete employee");
    }
  };

  // Open form for edit
  const handleEdit = (emp) => {
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone,
      designation: emp.designation,
      departmentId: emp.departmentId || "",
      jobId: emp.jobId || "",
      address: emp.address || "",
      dob: emp.dob || "",
    });
    setEditingId(emp.employeeId);
    setShowForm(true);
  };

  // Open form for add
  const handleAdd = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      designation: "",
      departmentId: "",
      jobId: "",
      address: "",
      dob: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, form);
      } else {
        await api.post("/employees", form);
      }
      fetchEmployees();
      setShowForm(false);
    } catch (err) {
      console.error(editingId ? "Update error:" : "Add error:", err);
    }
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      <button className="btn btn-success mb-3" onClick={handleAdd}>
        Add Employee
      </button>

      {/* Employee Form */}
      {showForm && (
        <div className="card p-3 mb-4">
          <h5>{editingId ? "Edit Employee" : "Add Employee"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <label>Department</label>
                <select
                  className="form-control"
                  value={form.departmentId}
                  onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.departmentId} value={dept.departmentId}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Job</label>
                <select
                  className="form-control"
                  value={form.jobId}
                  onChange={(e) => setForm({ ...form, jobId: e.target.value })}
                  required
                >
                  <option value="">Select Job</option>
                  {jobs.map((job) => (
                    <option key={job.jobId} value={job.jobId}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editingId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Employee Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Job</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.designation}</td>
                <td>{emp.departmentName}</td>
                <td>{emp.jobTitle}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp.employeeId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
