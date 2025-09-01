// src/pages/admin/Jobs.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for add/edit
  const [form, setForm] = useState({
    title: "",
    description: "",
    basicPay: "",
    departmentId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch jobs and departments
  const fetchJobs = () => {
    setLoading(true);
    api.get("/jobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });

    api.get("/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    api.delete(`/jobs/${id}`)
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          setJobs(jobs.filter((job) => job.jobId !== id));
        } else {
          alert("Failed to delete job");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete job");
      });
  };

  // Open form for edit
  const handleEdit = (job) => {
    setForm({
      title: job.title,
      description: job.description,
      basicPay: job.basicPay,
      departmentId: job.departmentId,
    });
    setEditingId(job.jobId);
    setShowForm(true);
  };

  // Open form for add
  const handleAdd = () => {
    setForm({
      title: "",
      description: "",
      basicPay: "",
      departmentId: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  // Submit form (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      basicPay: parseFloat(form.basicPay),
      departmentId: parseInt(form.departmentId),
    };

    if (editingId) {
      // Edit job
      api.put(`/jobs/${editingId}`, payload)
        .then(() => {
          fetchJobs();
          setShowForm(false);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // Add job
      api.post("/jobs", payload)
        .then(() => {
          fetchJobs();
          setShowForm(false);
        })
        .catch((err) => console.error("Add error:", err));
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Jobs</h2>
      <button className="btn btn-success mb-3" onClick={handleAdd}>
        Add Job
      </button>

      {/* Job Form */}
      {showForm && (
        <div className="card p-3 mb-4">
          <h5>{editingId ? "Edit Job" : "Add Job"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Job Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Basic Pay"
                value={form.basicPay}
                onChange={(e) => setForm({ ...form, basicPay: e.target.value })}
                required
              />
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

      {/* Jobs Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Basic Pay</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => {
              return (
                <tr key={job.jobId}>
                  <td>{job.jobId}</td>
                  <td>{job.title}</td>
                  <td>{job.description}</td>
                  <td>{job.basicPay}</td>
                  
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(job.jobId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
