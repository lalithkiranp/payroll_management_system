
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
import { 
  FaUserCircle,   // Profile
  FaCalendarAlt,  // Leave Requests
  FaFileInvoiceDollar // Salary Slip
} from "react-icons/fa";

export default function EmployeeLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="bg-dark border-end p-3" style={{ width: "220px" }}>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-white d-flex align-items-center" to="/employee/dashboard">
                <FaUserCircle className="me-2" /> Profile
              </Link>
            </li>
            
            <li className="nav-item mb-2">
              <Link className="nav-link text-white d-flex align-items-center" to="/employee/leave-requests">
                <FaCalendarAlt className="me-2" /> Leave Requests
              </Link>
            </li>
            
            <li className="nav-item mb-2">
              <Link className="nav-link text-white d-flex align-items-center" to="/employee/salary-slip">
                <FaFileInvoiceDollar className="me-2" /> Salary Slip
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
