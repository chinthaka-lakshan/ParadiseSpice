import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Bell,
  Navigation,
  Calendar,
  TrendingUp,
  LogOut,
  Menu,
  X,
  AlertCircle,
} from 'lucide-react';
import { authService } from '../services/auth';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deliveries] = useState([
    {
      id: '#D1001',
      address: '123 Main St, City',
      status: 'Pending',
      time: '10:00 AM',
      priority: 'High',
    },
    {
      id: '#D1002',
      address: '456 Oak Ave, Town',
      status: 'In Progress',
      time: '11:30 AM',
      priority: 'Medium',
    },
    {
      id: '#D1003',
      address: '789 Pine Rd, Village',
      status: 'Pending',
      time: '1:00 PM',
      priority: 'Low',
    },
    {
      id: '#D1004',
      address: '321 Elm St, Suburb',
      status: 'Completed',
      time: '9:00 AM',
      priority: 'High',
    },
  ]);

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
      label: "Today's Deliveries",
      value: '8',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: '4',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    { label: 'Pending', value: '3', icon: Clock, color: 'bg-yellow-500' },
    {
      label: 'On Time Rate',
      value: '92%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
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
            <p className="text-sm text-gray-500 mt-1">Delivery Driver</p>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'D'}
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'Driver'}</p>
                <p className="text-sm text-gray-500">Delivery Driver</p>
                <p className="text-xs text-gray-400 mt-1">Vehicle: VAN-001</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              {
                icon: <Truck size={20} />,
                label: 'Deliveries',
                path: '/deliveries',
              },
              { icon: <MapPin size={20} />, label: 'Routes', path: '/routes' },
              {
                icon: <Package size={20} />,
                label: 'Packages',
                path: '/packages',
              },
              {
                icon: <Calendar size={20} />,
                label: 'Schedule',
                path: '/schedule',
              },
              {
                icon: <Navigation size={20} />,
                label: 'Navigation',
                path: '/navigation',
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Status */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                On Duty
              </span>
            </div>
            <button className="w-full p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Start New Route
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
                Driver Dashboard
              </h2>
              <p className="text-sm text-gray-500">
                Ready to deliver, {user?.name || 'Driver'}!
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

          {/* Current Deliveries */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Today's Deliveries</h3>
                <button
                  onClick={() => navigate('/deliveries')}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {deliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${
                          delivery.status === 'Completed'
                            ? 'bg-green-100'
                            : delivery.status === 'In Progress'
                              ? 'bg-blue-100'
                              : 'bg-yellow-100'
                        }`}
                      >
                        <Truck
                          className={`w-5 h-5 ${
                            delivery.status === 'Completed'
                              ? 'text-green-600'
                              : delivery.status === 'In Progress'
                                ? 'text-blue-600'
                                : 'text-yellow-600'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{delivery.id}</p>
                        <p className="text-sm text-gray-600">
                          {delivery.address}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {delivery.time}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              delivery.priority === 'High'
                                ? 'bg-red-100 text-red-800'
                                : delivery.priority === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {delivery.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          delivery.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : delivery.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {delivery.status}
                      </span>
                      {delivery.status === 'Pending' && (
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700">
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/routes')}
                    className="w-full p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    View Route Map
                  </button>
                  <button
                    onClick={() => navigate('/packages')}
                    className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Scan Package
                  </button>
                  <button className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Report Issue
                  </button>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <h3 className="text-lg font-semibold">Alerts</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">
                      Traffic on Main St
                    </p>
                    <p className="text-xs text-red-600">
                      Consider alternate route
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">
                      Package #D1002
                    </p>
                    <p className="text-xs text-yellow-600">
                      Fragile - Handle with care
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Weather Update
                    </p>
                    <p className="text-xs text-blue-600">
                      Rain expected after 4 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Status */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-6">Vehicle Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="text-xl font-bold">VAN-001</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-500">Fuel Level</p>
                <p className="text-xl font-bold text-green-700">85%</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-500">Odometer</p>
                <p className="text-xl font-bold text-blue-700">45,238 km</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-500">Next Service</p>
                <p className="text-xl font-bold text-yellow-700">500 km</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
