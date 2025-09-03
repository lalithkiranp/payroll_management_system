
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [departmentCosts, setDepartmentCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12

  useEffect(() => {
    fetchReports();
  }, [year, month]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [summaryRes, deptRes] = await Promise.all([
        api.get(`/reports/payroll/summary?year=${year}&month=${month}`),
        api.get(`/reports/department-cost?year=${year}&month=${month}`)
      ]);

      setSummary(summaryRes.data);
      setDepartmentCosts(deptRes.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading reports...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="container">
      <h2 className="mb-4">Reports</h2>

    
      <div className="mb-3 d-flex gap-2 align-items-center">
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {[2025, 2024, 2023, 2022].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

    
      {summary && (
        <div className="mb-5">
          <h4>Payroll Summary</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Total Employees</th>
                <td>{summary.totalEmployees}</td>
              </tr>
              <tr>
                <th>Total Basic</th>
                <td>{summary.totalBasic}</td>
              </tr>
              <tr>
                <th>Total Bonus</th>
                <td>{summary.totalBonus}</td>
              </tr>
              <tr>
                <th>Total Deductions</th>
                <td>{summary.totalDeductions}</td>
              </tr>
              <tr>
                <th>Total Net Pay</th>
                <td>{summary.totalNetPay}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}


      {departmentCosts.length > 0 && (
        <div>
          <h4>Department Cost Distribution</h4>
          <PieChart width={400} height={300}>
            <Pie
              data={departmentCosts}
              dataKey="totalNetPay"
              nameKey="departmentName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {departmentCosts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
}

