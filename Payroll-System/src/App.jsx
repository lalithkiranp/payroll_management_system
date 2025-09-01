// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login";

// Layouts & Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import PayrollSummary from "./pages/admin/PayrollSummary";
import LeaveApprovals from "./pages/admin/LeaveApprovals";
import Departments from "./pages/admin/Departments";
import Jobs from "./pages/admin/Jobs";
import Reports from "./pages/admin/Reports";
// Employee Layout & Pages
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/Dashboard";
import LeaveRequests from "./pages/employee/LeaveRequests";

import SalarySlip from "./pages/employee/SalarySlip";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Default redirect based on role */}
      <Route
        path="/"
        element={
          user ? (
            user.role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/employee/dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes (role="ADMIN") */}
      <Route
        path="/admin"
        element={
          <PrivateRoute role="ADMIN">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="payroll-summary" element={<PayrollSummary />} />
        <Route path="department-cost" element={<Reports />} />
        <Route path="leave-approvals" element={<LeaveApprovals />} />
        <Route path="departments" element={<Departments />} />
        <Route path="jobs" element={<Jobs />} />
      </Route>

      {/* Employee Routes (role="EMPLOYEE") */}
      <Route
        path="/employee"
        element={
          <PrivateRoute role="EMPLOYEE">
            <EmployeeLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        
        <Route path="leave-requests" element={<LeaveRequests />} />
        <Route path="salary-slip" element={<SalarySlip />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
