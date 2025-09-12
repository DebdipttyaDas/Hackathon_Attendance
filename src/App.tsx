import React, { useState, useEffect } from 'react';
import { User, School, Calendar, Users, BarChart3, Settings, LogOut, Plus, Search, Filter, Download, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Trophy, BookOpen, FileText, GraduationCap, UserPlus } from 'lucide-react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AttendanceManagement from './components/AttendanceManagement';
import ClassManagement from './components/ClassManagement';
import EventManagement from './components/EventManagement';
import CurriculumActivities from './components/CurriculumActivities';
import Reports from './components/Reports';
import StudentDashboard from './components/StudentDashboard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'admin';
  teacherId?: string;
  studentId?: string;
  class?: string;
  section?: string;
  subjects?: string[];
  profilePicture?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  admissionDate: string;
  profilePicture?: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  students: Student[];
  totalStudents: number;
  createdDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
  teacherId: string;
  timeMarked: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'sports' | 'cultural' | 'academic' | 'competition' | 'other';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  organizerId: string;
  participants: string[];
  maxParticipants?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdDate: string;
}

export interface Activity {
  id: string;
  name: string;
  type: 'quiz' | 'debate' | 'sports' | 'cultural' | 'academic' | 'extracurricular';
  class: string;
  section: string;
  subject?: string;
  description: string;
  date: string;
  duration: string;
  teacherId: string;
  teacherName: string;
  participants: string[];
  maxScore?: number;
  scores: { [studentId: string]: number };
  status: 'planned' | 'ongoing' | 'completed';
  createdDate: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Preet Singh',
      email: 'preet.singh@punjabschools.edu',
      role: 'teacher',
      teacherId: 'T001',
      subjects: ['Mathematics', 'Science']
    },
    {
      id: '2',
      name: 'Simran Kaur',
      email: 'simran.kaur@punjabschools.edu',
      role: 'student',
      studentId: 'S001',
      class: '10',
      section: 'A'
    },
    {
      id: '3',
      name: 'Harpreet Singh',
      email: 'harpreet.singh@punjabschools.edu',
      role: 'admin',
      teacherId: 'A001'
    }
  ]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginPage onLogin={handleLogin} users={users} />;
    }

    if (currentUser.role === 'student') {
      return <StudentDashboard user={currentUser} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'attendance':
        return <AttendanceManagement user={currentUser} />;
      case 'classes':
        return <ClassManagement user={currentUser} />;
      case 'events':
        return <EventManagement user={currentUser} />;
      case 'activities':
        return <CurriculumActivities user={currentUser} />;
      case 'reports':
        return <Reports user={currentUser} />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  if (!currentUser) {
    return renderContent();
  }

  if (currentUser.role === 'student') {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <School className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Punjab Schools</h1>
                <p className="text-sm text-gray-500">Smart Education System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-gray-500 capitalize">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
          <div className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'attendance'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span>Attendance</span>
              </button>

              <button
                onClick={() => setActiveTab('classes')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'classes'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Class Management</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'events'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Event Management</span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'activities'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span>Curriculum Activities</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'reports'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Reports & Analytics</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;