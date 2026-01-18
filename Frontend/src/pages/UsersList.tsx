import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Users as UsersIcon,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle,
  XCircle,
  Mail,
} from 'lucide-react';
import { userService, type User } from '../services/userService';
import { authService } from '../services/auth';

export default function UsersList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!authService.hasRole('Master Admin') && !authService.hasRole('Admin')) {
      navigate('/dashboard');
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err: any) {
      setError('Failed to load users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = users;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.nic.toLowerCase().includes(term) ||
          user.mobile?.toLowerCase().includes(term) ||
          user.roles.some((role) => role.name.toLowerCase().includes(term))
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter((user) =>
        user.roles.some((role) => role.name === roleFilter)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await userService.deleteUser(selectedUser.id);
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err: any) {
      setError('Failed to delete user. Please try again.');
    }
  };

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
      case 'Master Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Admin':
        return 'bg-blue-100 text-blue-800';
      case 'SelsRep':
        return 'bg-green-100 text-green-800';
      case 'Driver':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditUser = (userId: number) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleViewUser = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get unique roles for filter
  const uniqueRoles = Array.from(
    new Set(users.flatMap((user) => user.roles.map((r) => r.name)))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user{' '}
              <strong>{selectedUser.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  User Management
                </h1>
                <p className="text-gray-600">
                  Manage all system users and their permissions
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/register-user')}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <UserPlus size={20} />
              Add New User
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold">
              {
                users.filter((u) =>
                  u.roles.some(
                    (r) => r.name === 'Master Admin' || r.name === 'Admin'
                  )
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Sales Reps</p>
            <p className="text-2xl font-bold">
              {
                users.filter((u) => u.roles.some((r) => r.name === 'SelsRep'))
                  .length
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-500">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' ? (
                <p className="text-sm text-gray-400 mt-2">
                  Try adjusting your filters
                </p>
              ) : null}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-600">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center gap-2 mb-1">
                              <Mail size={14} />
                              {user.email}
                            </div>
                            <div className="text-gray-500">
                              {user.mobile || 'No phone'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.nic}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role.id}
                                className={`px-2 py-1 text-xs rounded-full ${getRoleColor(role.name)}`}
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {user.status === 'active' ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-green-600 font-medium">
                                  Active
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                <span className="text-red-600 font-medium">
                                  Inactive
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewUser(user.id)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleEditUser(user.id)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Edit User"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">
                        {indexOfFirstItem + 1}
                      </span>{' '}
                      to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredUsers.length)}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{' '}
                      users
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-1 rounded-lg ${
                                currentPage === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Export Options */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold text-gray-800 mb-3">Export Data</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Export as CSV
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Export as PDF
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Print List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
