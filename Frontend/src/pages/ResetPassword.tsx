// src/pages/ResetPassword.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import api from '../services/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (!tokenParam || !emailParam) {
      setError('Invalid or missing reset link. Please request a new one.');
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);
  }, [searchParams]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/reset-password', {
        email,
        password: newPassword,
        password_confirmation: confirmPassword,
        token,
      });

      setSuccess('Password reset successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Failed to reset password. Link may be expired.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate('/forgot-password')}
          className="flex items-center text-[#3F52E3] hover:text-[#2F42D3] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3F52E3]">
            Reset Password
          </h1>
          <p className="text-gray-500 text-sm mt-2">Enter your new password</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="New password (min. 8 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full py-3 bg-[#3F52E3] text-white rounded-lg font-semibold hover:bg-[#2F42D3] transition disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>
    </div>
  );
}
