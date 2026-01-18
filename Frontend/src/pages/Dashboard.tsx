import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingCart,
  Truck,
  LogOut,
  Menu,
  X,
  UserPlus,
  BarChart3,
  Bell,
  Settings,
} from 'lucide-react';
import { authService } from '../services/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats] = useState({
    totalUsers: 24,
    totalOrders: 156,
    totalStock: 342,
    pendingDeliveries: 18,
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      icon: <Users size={20} />,
      label: 'Users',
      path: '/users',
      roles: ['Master Admin', 'Admin'],
    },
    {
      icon: <Package size={20} />,
      label: 'Stock',
      path: '/stock',
      roles: ['Master Admin', 'Admin', 'SelsRep'],
    },
    {
      icon: <ShoppingCart size={20} />,
      label: 'Orders',
      path: '/orders',
      roles: ['Master Admin', 'Admin', 'SelsRep'],
    },
    {
      icon: <Truck size={20} />,
      label: 'Deliveries',
      path: '/deliveries',
      roles: ['Master Admin', 'Admin', 'Driver'],
    },
    {
      icon: <BarChart3 size={20} />,
      label: 'Reports',
      path: '/reports',
      roles: ['Master Admin', 'Admin'],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.some((role) => authService.hasRole(role))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-auto
      `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-[#3F52E3]">
              Paradise Spice
            </h1>
            <p className="text-sm text-gray-500 mt-1">Management System</p>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3F52E3] rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">
                  {user?.email || 'user@example.com'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {user?.roles?.[0]?.name || 'No Role'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-[#3F52E3] transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* Add User Button (visible only to Admins) */}
            {(authService.hasRole('Master Admin') ||
              authService.hasRole('Admin')) && (
              <button
                onClick={() => navigate('/register-user')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-[#3F52E3] hover:bg-blue-100 transition-colors mt-4"
              >
                <UserPlus size={20} />
                <span>Add New User</span>
              </button>
            )}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name || 'User'}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Stock</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.totalStock}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Package className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Deliveries</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.pendingDeliveries}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(authService.hasRole('Master Admin') ||
                authService.hasRole('Admin')) && (
                <>
                  <button
                    onClick={() => navigate('/register-user')}
                    className="p-4 border-2 border-dashed border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <UserPlus className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Add New User</p>
                  </button>
                </>
              )}
              <button
                onClick={() => navigate('/orders')}
                className="p-4 border-2 border-dashed border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">View Orders</p>
              </button>
              <button
                onClick={() => navigate('/reports')}
                className="p-4 border-2 border-dashed border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
              >
                <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">View Reports</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
