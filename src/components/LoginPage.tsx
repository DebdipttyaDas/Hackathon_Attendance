import React, { useState } from 'react';
import { School, User, GraduationCap, UserCheck, Eye, EyeOff } from 'lucide-react';
import type { User as UserType } from '../App';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
  users: UserType[];
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, users }) => {
  const [loginType, setLoginType] = useState<'teacher' | 'student'>('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user based on login type and email
    const user = users.find(u => 
      u.email === email && 
      (loginType === 'teacher' ? (u.role === 'teacher' || u.role === 'admin') : u.role === 'student')
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid credentials or user type mismatch');
    }
    
    setLoading(false);
  };

  // Demo credentials for easy testing
  const demoCredentials = {
    teacher: {
      email: 'preet.singh@punjabschools.edu',
      password: 'teacher123'
    },
    student: {
      email: 'simran.kaur@punjabschools.edu', 
      password: 'student123'
    }
  };

  const fillDemoCredentials = () => {
    setEmail(demoCredentials[loginType].email);
    setPassword(demoCredentials[loginType].password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="p-3 bg-blue-600 rounded-full mr-4">
              <School className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Punjab Schools</h1>
              <p className="text-lg text-gray-600">Smart Education System</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Smart Curriculum Activity & Attendance Management
          </h2>
          
          <p className="text-gray-600 mb-6">
            Comprehensive digital solution for Government Schools in Punjab to manage 
            attendance, curriculum activities, events, and generate insightful analytics.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Digital Attendance</h3>
              <p className="text-gray-600">Real-time attendance tracking</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <GraduationCap className="h-8 w-8 text-emerald-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Activity Management</h3>
              <p className="text-gray-600">Curriculum & event tracking</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          {/* Login Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginType('teacher');
                setEmail('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginType === 'teacher'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Teacher/Admin</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType('student');
                setEmail('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginType === 'student'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Student</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Fill {loginType} demo credentials
            </button>
            <div className="text-xs text-gray-500 mt-2">
              <p>{loginType === 'teacher' ? 'Teacher' : 'Student'}: {demoCredentials[loginType].email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;