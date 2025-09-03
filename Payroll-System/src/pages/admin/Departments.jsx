
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchDepartments = () => {
    setLoading(true);
    api.get("/departments")
      .then((res) => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

 
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    api.delete(`/departments/${id}`)
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          setDepartments(departments.filter((dep) => dep.departmentId !== id));
        } else {
          alert("Failed to delete department");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete department");
      });
  };


  const handleEdit = (dep) => {
    setForm({
      name: dep.name,
      description: dep.description,
    });
    setEditingId(dep.departmentId);
    setShowForm(true);
  };

  const handleAdd = () => {
    setForm({
      name: "",
      description: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Edit
      api.put(`/departments/${editingId}`, form)
        .then(() => {
          fetchDepartments();
          setShowForm(false);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // Add
      api.post("/departments", form)
        .then(() => {
          fetchDepartments();
          setShowForm(false);
        })
        .catch((err) => console.error("Add error:", err));
    }
  };

  if (loading) return <p>Loading departments...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Departments</h2>
      <button className="btn btn-success mb-3" onClick={handleAdd}>
        Add Department
      </button>


      {showForm && (
        <div className="card p-3 mb-4">
          <h5>{editingId ? "Edit Department" : "Add Department"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Department Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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


      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dep) => (
              <tr key={dep.departmentId}>
                <td>{dep.departmentId}</td>
                <td>{dep.name}</td>
                <td>{dep.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(dep)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(dep.departmentId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
