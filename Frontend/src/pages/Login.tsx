import { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import logo from '../assets/LOGO.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    alert('Login submitted (frontend only)');
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

          <h1 className="text-4xl font-bold text-[#3F52E3] ">
            Login
          </h1>
         
        </div>

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
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
            <a href="#" className="text-[#3F52E3] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#3F52E3] text-white font-semibold hover:opacity-90 transition-all"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="#" className="text-[#F12D2D] font-semibold hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
