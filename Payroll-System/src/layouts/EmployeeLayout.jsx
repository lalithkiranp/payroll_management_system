// src/layouts/EmployeeLayout.jsx
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="bg-dark border-end p-3" style={{ width: "220px" }}>
      
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/employee/dashboard">
                Profile
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white" to="/employee/leave-requests">
                Leave Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/employee/salary-slip">
                Salary Slip
              </Link>
            </li>
          </ul>
        </aside>

        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
