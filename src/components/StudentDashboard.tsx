import React, { useState } from 'react';
import { User, Calendar, CheckCircle, BookOpen, Trophy, Clock, Bell, Award, Users, FileText, Eye, LogOut } from 'lucide-react';
import type { User as UserType } from '../App';

interface StudentDashboardProps {
  user: UserType;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'attendance' | 'activities' | 'events'>('dashboard');

  // Mock student data
  const studentStats = {
    attendancePercentage: 92.5,
    totalClasses: 120,
    classesAttended: 111,
    activitiesParticipated: 15,
    upcomingEvents: 4,
    averageScore: 85.6
  };

  const recentAttendance = [
    { date: '2025-01-20', subject: 'Mathematics', status: 'present' },
    { date: '2025-01-20', subject: 'Science', status: 'present' },
    { date: '2025-01-19', subject: 'English', status: 'late' },
    { date: '2025-01-19', subject: 'Hindi', status: 'present' },
    { date: '2025-01-18', subject: 'Mathematics', status: 'absent' }
  ];

  const myActivities = [
    { id: '1', name: 'Mathematics Quiz', type: 'quiz', date: '2025-01-25', score: 85, maxScore: 100, status: 'completed' },
    { id: '2', name: 'Science Project', type: 'academic', date: '2025-01-30', status: 'ongoing' },
    { id: '3', name: 'Debate Competition', type: 'debate', date: '2025-02-05', status: 'registered' },
    { id: '4', name: 'Cultural Dance', type: 'cultural', date: '2025-02-15', status: 'registered' }
  ];

  const upcomingEvents = [
    { id: '1', title: 'Science Exhibition', date: '2025-01-28', time: '10:00', venue: 'Science Lab', registered: true },
    { id: '2', title: 'Sports Day', date: '2025-02-15', time: '09:00', venue: 'Playground', registered: false },
    { id: '3', title: 'Inter-School Debate', date: '2025-02-05', time: '14:00', venue: 'Auditorium', registered: true },
    { id: '4', title: 'Cultural Program', date: '2025-02-20', time: '16:00', venue: 'Main Hall', registered: false }
  ];

  const achievements = [
    { title: 'Perfect Attendance', description: 'No absences for 30 days', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Quiz Champion', description: 'Scored 95% in Math Quiz', icon: Trophy, color: 'text-yellow-600' },
    { title: 'Active Participant', description: 'Joined 15+ activities', icon: Users, color: 'text-blue-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'registered':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-500">Punjab Schools System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500">Class {user.class}-{user.section}</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Attendance</span>
          </button>
          
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'activities' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Activities</span>
          </button>
          
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'events' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
              <p className="text-blue-100">Here's your academic overview for today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">{studentStats.attendancePercentage}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Classes Attended</p>
                    <p className="text-2xl font-bold text-gray-900">{studentStats.classesAttended}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{studentStats.activitiesParticipated}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Avg Score</p>
                    <p className="text-2xl font-bold text-gray-900">{studentStats.averageScore}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {myActivities.slice(0, 3).map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{activity.name}</p>
                          <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString('en-IN')}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <achievement.icon className={`h-6 w-6 ${achievement.color} mt-1`} />
                        <div>
                          <p className="font-medium text-gray-900">{achievement.title}</p>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Attendance Record</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAttendance.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{record.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.map(activity => (
                <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(activity.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span className="capitalize">{activity.type}</span>
                    </div>
                    {activity.score && (
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        <span>Score: {activity.score}/{activity.maxScore}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    {event.registered ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Registered
                      </span>
                    ) : (
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">
                        Register
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;