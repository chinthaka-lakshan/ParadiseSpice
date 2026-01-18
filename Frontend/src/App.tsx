import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import RegisterUser from './pages/RegisterUser';
import UsersList from './pages/UsersList';
import SalesRepDashboard from './pages/SalesRepDashboard';
import DriverDashboard from './pages/DriverDashboard';
import { authService } from './services/auth';

// Protected Route Component
function ProtectedRoute({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some((role) =>
      authService.hasRole(role)
    );
    if (!hasRequiredRole) {
      // Redirect to appropriate dashboard based on user's role
      const userRoles = authService.getUserRoles();
      if (userRoles.includes('SelsRep')) {
        return <Navigate to="/sales-dashboard" replace />;
      } else if (userRoles.includes('Driver')) {
        return <Navigate to="/driver-dashboard" replace />;
      } else if (userRoles.includes('Admin')) {
        return <Navigate to="/admin-dashboard" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  return <>{children}</>;
}

// Public Route Component (for routes that should only be accessible when NOT logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  if (authService.isAuthenticated()) {
    // Redirect to appropriate dashboard
    const userRoles = authService.getUserRoles();
    if (userRoles.includes('SelsRep')) {
      return <Navigate to="/sales-dashboard" replace />;
    } else if (userRoles.includes('Driver')) {
      return <Navigate to="/driver-dashboard" replace />;
    } else if (userRoles.includes('Admin')) {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Master Admin', 'Admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-dashboard"
          element={
            <ProtectedRoute allowedRoles={['SelsRep']}>
              <SalesRepDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Management Routes (Admin only) */}
        <Route
          path="/register-user"
          element={
            <ProtectedRoute allowedRoles={['Master Admin', 'Admin']}>
              <RegisterUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['Master Admin', 'Admin']}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        {/* Fallback Routes */}
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
