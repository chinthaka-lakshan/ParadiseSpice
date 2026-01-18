import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Bell,
  Calendar,
  BarChart,
  DollarSign,
  LogOut,
  Menu,
  X,
  PlusCircle,
} from 'lucide-react';
import { authService } from '../services/auth';

export default function SalesRepDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const stats = [
    {
      label: "Today's Orders",
      value: '24',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      label: 'Monthly Target',
      value: '85%',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Products Sold',
      value: '156',
      icon: Package,
      color: 'bg-purple-500',
    },
    { label: 'Active Shops', value: '42', icon: Users, color: 'bg-yellow-500' },
  ];

  const recentOrders = [
    {
      id: '#1001',
      shop: 'Spice World',
      amount: '$245.50',
      status: 'Delivered',
    },
    {
      id: '#1002',
      shop: 'Flavor Fusion',
      amount: '$189.99',
      status: 'Processing',
    },
    { id: '#1003', shop: 'Taste Buds', amount: '$312.75', status: 'Pending' },
    { id: '#1004', shop: 'Aroma Hub', amount: '$156.25', status: 'Delivered' },
  ];

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
            <p className="text-sm text-gray-500 mt-1">Sales Representative</p>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'Sales Rep'}</p>
                <p className="text-sm text-gray-500">Sales Representative</p>
                <p className="text-xs text-gray-400 mt-1">Commission: 5%</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              {
                icon: <ShoppingCart size={20} />,
                label: 'Orders',
                path: '/orders',
              },
              {
                icon: <Package size={20} />,
                label: 'Products',
                path: '/products',
              },
              { icon: <Users size={20} />, label: 'Shops', path: '/shops' },
              {
                icon: <BarChart size={20} />,
                label: 'Reports',
                path: '/reports',
              },
              {
                icon: <Calendar size={20} />,
                label: 'Schedule',
                path: '/schedule',
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            <button
              onClick={() => navigate('/new-order')}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors mb-3"
            >
              <PlusCircle size={20} />
              <span>New Order</span>
            </button>
          </div>

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
              <h2 className="text-xl font-semibold text-gray-800">
                Sales Dashboard
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name || 'Sales Rep'}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 ${stat.color} bg-opacity-20 rounded-lg`}
                    >
                      <Icon
                        className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <button
                  onClick={() => navigate('/orders')}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Order ID
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Shop
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Amount
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 text-sm font-medium">{order.id}</td>
                        <td className="py-4 text-sm text-gray-600">
                          {order.shop}
                        </td>
                        <td className="py-4 text-sm font-medium">
                          {order.amount}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Processing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/new-order')}
                  className="w-full p-4 border-2 border-dashed border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create New Order
                </button>
                <button
                  onClick={() => navigate('/shops')}
                  className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Visit Shops
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Daily Report
                </button>
              </div>

              {/* Commission Card */}
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-medium text-yellow-800">
                    Commission This Month
                  </h4>
                </div>
                <p className="text-2xl font-bold text-yellow-700 mt-2">
                  $1,245.50
                </p>
                <p className="text-sm text-yellow-600">Earned from 42 orders</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-6">Today's Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Meeting with Spice World</p>
                  <p className="text-sm text-gray-600">10:00 AM - 11:00 AM</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Shop Visit
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">
                    Product Delivery - Flavor Fusion
                  </p>
                  <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Delivery
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium">Monthly Target Review</p>
                  <p className="text-sm text-gray-600">4:00 PM - 5:00 PM</p>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Meeting
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
