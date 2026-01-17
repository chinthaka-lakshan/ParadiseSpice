import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ===== Reset Password Handler =====
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return; // Stop navigation
    }

    alert('Password reset successful!');
    navigate('/'); // Go back to login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* ===== Title ===== */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3F52E3]">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Recover your account securely
          </p>
        </div>

        {/* ===== STEP 1 : ENTER EMAIL ===== */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-[#3F52E3] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* ===== STEP 2 : VERIFY OTP ===== */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
              />
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3 bg-[#3F52E3] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Verify Email
            </button>
          </div>
        )}

        {/* ===== STEP 3 : RESET PASSWORD ===== */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3F52E3] focus:outline-none"
                required
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-[#3F52E3] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Reset Password
            </button>
          </div>
        )}

        {/* ===== Back to Login ===== */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{' '}
          <button
            onClick={() => navigate('/')}
            className="text-[#3F52E3] font-semibold hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}
