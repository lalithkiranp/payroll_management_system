
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaFilePdf, FaPrint, FaRupeeSign } from "react-icons/fa";

export default function SalarySlip() {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const fetchSalarySlip = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
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

  
  const handlePrint = () => window.print();
 

  return (
    <div className="container mt-4">
      <h2 className="mb-4"> Salary Slip</h2>

    
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label fw-semibold">Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-semibold">Month</label>
          <select
            className="form-control"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 align-self-end">
          <button
            className="btn btn-primary mt-2 w-100"
            onClick={fetchSalarySlip}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Salary"}
          </button>
        </div>
      </div>

      {loading && <p className="text-muted">Loading salary slip...</p>}
      {error && <p className="text-danger">{error}</p>}

      {salary && (
        <div className="card shadow-lg border-0 rounded-3 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">{salary.employeeName}</h4>
            <span className="badge bg-success fs-6">
              {new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </span>
          </div>

          <p>
            <strong>Employee ID:</strong> {salary.employeeId}
          </p>

          <table className="table table-bordered align-middle mt-3">
            <tbody>
              <tr>
                <th>Basic Pay</th>
                <td>
                  <FaRupeeSign className="me-1 text-success" />
                  {salary.basicPay}
                </td>
              </tr>
              <tr>
                <th>Bonus</th>
                <td>
                  <FaRupeeSign className="me-1 text-success" />
                  {salary.bonus}
                </td>
              </tr>
              <tr>
                <th>Deductions</th>
                <td>
                  <FaRupeeSign className="me-1 text-danger" />
                  {salary.deductions}
                </td>
              </tr>
              <tr className="table-success">
                <th>Net Pay</th>
                <td>
                  <FaRupeeSign className="me-1" />
                  <strong>{salary.netPay}</strong>
                </td>
              </tr>
            </tbody>
          </table>

    
          <div className="d-flex gap-2 mt-3">
            
            <button className="btn btn-outline-secondary" onClick={handlePrint}>
              <FaPrint className="me-2" /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
