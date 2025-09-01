// src/pages/employee/SalarySlip.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SalarySlip() {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // JS months 0-11

  const fetchSalarySlip = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token"); // adjust if stored elsewhere
      const res = await api.get(`/payroll/runs/my/${year}/${month}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalary(res.data);
    } catch (err) {
      console.error("Error fetching salary slip:", err);
      setError("Failed to fetch salary slip.");
      setSalary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalarySlip();
  }, [year, month]);

  return (
    <div className="container mt-4">
      <h2>Salary Slip</h2>

      {/* Month & Year selector */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <div className="col-md-3">
          <label>Month</label>
          <select
            className="form-control"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 align-self-end">
          <button className="btn btn-primary mt-2" onClick={fetchSalarySlip}>
            Fetch Salary
          </button>
        </div>
      </div>

      {loading && <p>Loading salary slip...</p>}
      {error && <p className="text-danger">{error}</p>}

      {salary && (
        <div className="card p-3">
          <h5>{salary.employeeName}</h5>
          <p><strong>Employee ID:</strong> {salary.employeeId}</p>
          <p><strong>Basic Pay:</strong> ₹{salary.basicPay}</p>
          <p><strong>Bonus:</strong> ₹{salary.bonus}</p>
          <p><strong>Deductions:</strong> ₹{salary.deductions}</p>
          <p><strong>Net Pay:</strong> ₹{salary.netPay}</p>
        </div>
      )}
    </div>
  );
}
