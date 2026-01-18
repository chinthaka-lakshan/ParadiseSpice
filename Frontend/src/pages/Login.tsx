import { useState } from 'react';
import { Eye, EyeOff, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LOGO.png';
import { authService, type LoginData } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const data: LoginData = { email, password };
      const response = await authService.login(data);

      // Store user data and token
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect based on role
      if (
        response.roles.includes('Master Admin') ||
        response.roles.includes('Admin')
      ) {
        navigate('/dashboard');
      } else if (response.roles.includes('SelsRep')) {
        navigate('/sales-dashboard');
      } else if (response.roles.includes('Driver')) {
        navigate('/driver-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('master@example.com');
    setPassword('Masteradmin@123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* ===== Header ===== */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <img
              src={logo}
              alt="Business Logo"
              className="h-24 w-auto object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-[#3F52E3]">Login</h1>
          <p className="text-gray-500 mt-2">
            Use your credentials to access the system
          </p>
        </div>

        {/* ===== Error Message ===== */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* ===== Login Form ===== */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="master@paradisespice.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-[#3F52E3]" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[#3F52E3] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#3F52E3] text-white font-semibold hover:bg-[#2F42D3] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* ===== Divider ===== */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ===== Demo Credentials ===== */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            Demo Credentials:
          </h3>
          <p className="text-xs text-blue-600 mb-1">
            <span className="font-medium">Email:</span> master@example.com
          </p>
          <p className="text-xs text-blue-600 mb-3">
            <span className="font-medium">Password:</span> Masteradmin@123
          </p>
          <button
            onClick={handleDemoLogin}
            className="w-full py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Use Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
