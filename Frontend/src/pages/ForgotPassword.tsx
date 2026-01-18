import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import api from '../services/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/forgot-password', { email });
      setSuccess(
        response.data.message || 'Password reset link sent to your email!'
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Failed to send reset link. Please check your email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-[#3F52E3] hover:text-[#2F42D3] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>

        {/* ===== Title ===== */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3F52E3]">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* ===== Error Message ===== */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* ===== Success Message ===== */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* ===== EMAIL FORM ===== */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            onClick={handleSendResetLink}
            disabled={loading}
            className="w-full py-3 bg-[#3F52E3] text-white rounded-lg font-semibold hover:bg-[#2F42D3] transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            You will receive a link to reset your password via email. The link
            will expire in 60 minutes.
          </p>
        </div>

        {/* ===== Help Text ===== */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{' '}
          <button
            onClick={() => navigate('/')}
            className="text-[#3F52E3] font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
