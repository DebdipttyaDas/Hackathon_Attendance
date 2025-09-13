import React from 'react';
import { Users, Calendar, CheckCircle, BookOpen, Trophy, TrendingUp, Clock, AlertCircle, BarChart3, PieChart } from 'lucide-react';
import type { User, useAttendance } from '../App';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { getAttendanceStats, getClassAttendance } = useAttendance();
  
  // Mock data for demonstration
  const stats = {
    totalStudents: 1247,
    totalClasses: 45,
    todayAttendance: parseFloat(getAttendanceStats().percentage),
    upcomingEvents: 12,
    activeActivities: 8,
    completedActivities: 156
  };

  const recentActivities = [
    { id: 1, type: 'attendance', message: 'Attendance marked for Class 10-A', time: '2 minutes ago', icon: CheckCircle, color: 'text-green-600' },
    { id: 2, type: 'event', message: 'Quiz Competition scheduled for tomorrow', time: '15 minutes ago', icon: Calendar, color: 'text-blue-600' },
    { id: 3, type: 'activity', message: 'Science project submission completed', time: '1 hour ago', icon: BookOpen, color: 'text-purple-600' },
    { id: 4, type: 'sports', message: 'Football tournament results updated', time: '2 hours ago', icon: Trophy, color: 'text-orange-600' },
  ];

  const attendanceTrends = [
    { class: '10-A', ...getClassAttendance('10-A') },
    { class: '10-B', ...getClassAttendance('10-B') },
    { class: '9-A', ...getClassAttendance('9-A') },
    { class: '9-B', ...getClassAttendance('9-B') },
    { class: '8-A', ...getClassAttendance('8-A') },
  ].map(item => ({
    ...item,
    change: item.trend,
    percentage: Math.round(item.percentage)
  }));

  const upcomingEvents = [
    { id: 1, title: 'Science Exhibition', date: '2025-01-25', type: 'Academic', participants: 85 },
    { id: 2, title: 'Sports Day', date: '2025-01-28', type: 'Sports', participants: 200 },
    { id: 3, title: 'Debate Competition', date: '2025-01-30', type: 'Competition', participants: 45 },
    { id: 4, title: 'Cultural Program', date: '2025-02-02', type: 'Cultural', participants: 150 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today's Date</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today's Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayAttendance}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Activities</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeActivities}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-full ${activity.color.replace('text-', 'bg-').replace('600', '100')}`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-lg transition-colors group">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-emerald-50 rounded-lg transition-colors group">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Create Event</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-purple-50 rounded-lg transition-colors group">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Activity</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-orange-50 rounded-lg transition-colors group">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200">
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Class-wise Attendance</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {attendanceTrends.map((item) => (
                <div key={item.class} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Class {item.class}</p>
                    <p className="text-sm text-gray-500">{item.percentage}% attendance</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.percentage > 90 ? 'bg-green-500' : item.percentage > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className={`text-sm ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>{event.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{event.participants}</p>
                    <p className="text-xs text-gray-500">participants</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;