// src/pages/admin/PayrollSummary.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PayrollSummary() {
  const [payrollRuns, setPayrollRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchPayrollRuns();
  }, []);

  const fetchPayrollRuns = async () => {
    try {
      const res = await api.get("/payroll/runs");
      setPayrollRuns(res.data);
    } catch (err) {
      console.error("Error fetching payroll runs:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPayrollRun = async () => {
    try {
      const res = await api.post("/payroll/runs", { year, month });
      setPayrollRuns((prev) => [res.data, ...prev]);
      alert("Payroll run created!");
    } catch (err) {
      console.error("Error creating payroll run:", err);
      alert("Failed to create payroll run");
    }
  };

  const processPayroll = async (id) => {
    try {
      await api.post(`/payroll/runs/${id}/process`);
      setPayrollRuns((prev) =>
        prev.map((run) =>
          run.payrollRunId === id ? { ...run, status: "PROCESSED" } : run
        )
      );
      alert("Payroll processed successfully!");
    } catch (err) {
      console.error("Error processing payroll:", err);
      alert("Failed to process payroll");
    }
  };

  const lockPayroll = async (id) => {
    try {
      await api.post(`/payroll/runs/${id}/lock`);
      setPayrollRuns((prev) =>
        prev.map((run) =>
          run.payrollRunId === id ? { ...run, status: "LOCKED" } : run
        )
      );
      alert("Payroll locked!");
    } catch (err) {
      console.error("Error locking payroll:", err);
      alert("Failed to lock payroll");
    }
  };

  const viewItems = async (id) => {
    try {
      const res = await api.get(`/payroll/runs/${id}/items`);
      alert(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error("Error fetching payroll items:", err);
      alert("Failed to fetch payroll items");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CREATED":
        return "orange";
      case "PROCESSED":
        return "green";
      case "LOCKED":
        return "red";
      default:
        return "black";
    }
  };

  if (loading) return <p>Loading payroll runs...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">Payroll Summary</h2>

      <div className="mb-3 d-flex align-items-center gap-2">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="form-control"
          style={{ width: "100px" }}
          placeholder="Year"
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="form-control"
          style={{ width: "100px" }}
          placeholder="Month"
        />
        <button className="btn btn-primary" onClick={createPayrollRun}>
          Create Payroll Run
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Year</th>
            <th>Month</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrollRuns.length > 0 ? (
            payrollRuns.map((run) => (
              <tr key={run.payrollRunId}>
                <td>{run.payrollRunId}</td>
                <td>{run.year}</td>
                <td>{run.month}</td>
                <td style={{ color: getStatusColor(run.status), fontWeight: "bold" }}>
                  {run.status}
                </td>
                <td>
                  {run.status === "CREATED" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => processPayroll(run.payrollRunId)}
                    >
                      Process
                    </button>
                  )}
                  {run.status === "PROCESSED" && (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => lockPayroll(run.payrollRunId)}
                    >
                      Lock
                    </button>
                  )}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => viewItems(run.payrollRunId)}
                  >
                    View Items
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No payroll runs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
