
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
          <h5 className="mb-4">Admin Panel</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/admin/dashboard" className="nav-link text-white">
                Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/employees" className="nav-link text-white">
                Employees
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/payroll-summary" className="nav-link text-white">
                Payroll 
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/department-cost" className="nav-link text-white">
                Reports
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/leave-approvals" className="nav-link text-white">
                Leave Approvals
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/departments" className="nav-link text-white">
                Departments
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/jobs" className="nav-link text-white">
                Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
