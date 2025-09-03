
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaTachometerAlt,
  FaUsers,           
  FaMoneyCheckAlt,   
  FaChartPie,        
  FaClipboardCheck,  
  FaBuilding,
  FaBriefcase        
} from "react-icons/fa";

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
              <Link to="/admin/dashboard" className="nav-link text-white d-flex align-items-center">
                <FaTachometerAlt className="me-2" /> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/employees" className="nav-link text-white d-flex align-items-center">
                <FaUsers className="me-2" /> Employees
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/payroll-summary" className="nav-link text-white d-flex align-items-center">
                <FaMoneyCheckAlt className="me-2" /> Payroll
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/department-cost" className="nav-link text-white d-flex align-items-center">
                <FaChartPie className="me-2" /> Reports
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/leave-approvals" className="nav-link text-white d-flex align-items-center">
                <FaClipboardCheck className="me-2" /> Leave Approvals
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/departments" className="nav-link text-white d-flex align-items-center">
                <FaBuilding className="me-2" /> Departments
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/jobs" className="nav-link text-white d-flex align-items-center">
                <FaBriefcase className="me-2" /> Jobs
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
