import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
  Menu,
  X,
  UserPlus,
  Settings,
  Bell,
  DollarSign,
  Store,
  TrendingUp,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { authService } from '../services/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMasterAdmin, setIsMasterAdmin] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);
    setIsMasterAdmin(authService.hasRole('Master Admin'));
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

  const stats = [
    {
      label: 'Total Users',
      value: '156',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      label: 'Active Orders',
      value: '42',
      icon: ShoppingCart,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      label: 'Stock Items',
      value: '1,245',
      icon: Package,
      color: 'bg-purple-500',
      change: '-2%',
    },
    {
      label: 'Monthly Revenue',
      value: '$24,580',
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+18%',
    },
  ];

  const adminMenuItems = [
    {
      icon: <Users size={20} />,
      label: 'User Management',
      path: '/users',
      roles: ['Master Admin', 'Admin'],
    },
    {
      icon: <Store size={20} />,
      label: 'Shops',
      path: '/shops',
      roles: ['Master Admin', 'Admin'],
    },
    {
      icon: <Package size={20} />,
      label: 'Stock',
      path: '/stock',
      roles: ['Master Admin', 'Admin'],
    },
    {
      icon: <ShoppingCart size={20} />,
      label: 'Orders',
      path: '/orders',
      roles: ['Master Admin', 'Admin'],
    },
    {
      icon: <BarChart3 size={20} />,
      label: 'Reports',
      path: '/reports',
      roles: ['Master Admin', 'Admin'],
    },
  ];

  const masterAdminMenuItems = [
    {
      icon: <Shield size={20} />,
      label: 'System Settings',
      path: '/settings',
      roles: ['Master Admin'],
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Financial Reports',
      path: '/finance',
      roles: ['Master Admin'],
    },
    {
      icon: <AlertCircle size={20} />,
      label: 'Audit Logs',
      path: '/audit',
      roles: ['Master Admin'],
    },
    {
      icon: <Users size={20} />,
      label: 'Admin Management',
      path: '/admins',
      roles: ['Master Admin'],
    },
  ];

  const filteredMenuItems = adminMenuItems.filter((item) =>
    item.roles.some((role) => authService.hasRole(role))
  );

  const filteredMasterAdminItems = isMasterAdmin ? masterAdminMenuItems : [];

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
            <p className="text-sm text-gray-500 mt-1">
              {isMasterAdmin ? 'Master Admin Panel' : 'Admin Panel'}
            </p>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  isMasterAdmin ? 'bg-purple-500' : 'bg-blue-500'
                }`}
              >
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'Admin'}</p>
                <p className="text-sm text-gray-500">
                  {user?.email || 'admin@example.com'}
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      isMasterAdmin
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {isMasterAdmin ? 'Master Admin' : 'Admin'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {/* Regular Admin Navigation */}
            {filteredMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* Master Admin Only Navigation */}
            {filteredMasterAdminItems.length > 0 && (
              <>
                <div className="pt-4 mt-4 border-t">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Master Admin Only
                  </p>
                  {filteredMasterAdminItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Add User Button */}
            <button
              onClick={() => navigate('/register-user')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors mt-4"
            >
              <UserPlus size={20} />
              <span>Add New User</span>
            </button>
          </nav>

          {/* Settings and Logout */}
          <div className="p-4 border-t space-y-2">
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
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
              <h2 className="text-xl font-semibold text-gray-800">
                {isMasterAdmin ? 'Master Admin Dashboard' : 'Admin Dashboard'}
              </h2>
              <p className="text-sm text-gray-500">
                {isMasterAdmin
                  ? 'Full system control and monitoring'
                  : 'Manage users, orders, and inventory'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {isMasterAdmin && (
                <div className="hidden md:flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Shield size={14} className="mr-1" />
                  Master Admin
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.change.startsWith('+');
              return (
                <div key={index} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-2 ${stat.color} bg-opacity-20 rounded-lg`}
                    >
                      <Icon
                        className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/register-user')}
                  className="p-4 border-2 border-dashed border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <UserPlus className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Add New User</p>
                </button>

                <button
                  onClick={() => navigate('/stock')}
                  className="p-4 border-2 border-dashed border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                >
                  <Package className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Manage Stock</p>
                </button>

                <button
                  onClick={() => navigate('/orders')}
                  className="p-4 border-2 border-dashed border-yellow-200 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">View Orders</p>
                </button>

                <button
                  onClick={() => navigate('/reports')}
                  className="p-4 border-2 border-dashed border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Generate Reports</p>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-6">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">System Health</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Excellent
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending Orders</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Low Stock Items</span>
                  <span className="font-medium text-red-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium">99.8%</span>
                </div>
              </div>

              {/* Master Admin Only Section */}
              {isMasterAdmin && (
                <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-purple-600 mr-2" />
                    <h4 className="font-medium text-purple-800">
                      Master Admin Tools
                    </h4>
                  </div>
                  <p className="text-sm text-purple-600 mb-3">
                    You have full system access and administrative privileges.
                  </p>
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    System Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-600">
                      John Doe (Sales Rep) was added
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">10 min ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Large order placed</p>
                    <p className="text-sm text-gray-600">
                      Order #10045 for $1,245.50
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Low stock alert</p>
                    <p className="text-sm text-gray-600">
                      Cinnamon powder stock below minimum
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
