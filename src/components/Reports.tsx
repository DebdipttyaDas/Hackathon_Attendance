import React, { useState } from 'react';
import { BarChart3, Download, Filter, Calendar, Users, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Trophy, FileText, PieChart } from 'lucide-react';
import type { User } from '../App';

interface ReportsProps {
  user: User;
}

const Reports: React.FC<ReportsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'activities' | 'performance' | 'analytics'>('attendance');
  const [dateRange, setDateRange] = useState('30');
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data for demonstration
  const attendanceData = {
    overall: 87.5,
    trend: 2.3,
    byClass: [
      { class: '10-A', percentage: 92.1, total: 35, present: 32, absent: 3 },
      { class: '10-B', percentage: 88.5, total: 32, present: 28, absent: 4 },
      { class: '9-A', percentage: 94.2, total: 38, present: 36, absent: 2 },
      { class: '9-B', percentage: 85.7, total: 35, present: 30, absent: 5 },
      { class: '8-A', percentage: 90.3, total: 31, present: 28, absent: 3 }
    ],
    weeklyTrend: [
      { week: 'Week 1', percentage: 89 },
      { week: 'Week 2', percentage: 86 },
      { week: 'Week 3', percentage: 91 },
      { week: 'Week 4', percentage: 88 }
    ]
  };

  const activityData = {
    totalActivities: 156,
    completedActivities: 142,
    upcomingActivities: 14,
    participationRate: 78.5,
    byType: [
      { type: 'Quiz', count: 45, participants: 1234 },
      { type: 'Sports', count: 32, participants: 987 },
      { type: 'Debate', count: 28, participants: 567 },
      { type: 'Cultural', count: 25, participants: 789 },
      { type: 'Academic', count: 26, participants: 1098 }
    ]
  };

  const performanceData = {
    topPerformers: [
      { name: 'Harpreet Kaur', class: '10-A', attendance: 98, activities: 15, avg_score: 92 },
      { name: 'Simran Singh', class: '10-A', attendance: 96, activities: 14, avg_score: 89 },
      { name: 'Arjun Sharma', class: '9-A', attendance: 94, activities: 13, avg_score: 87 },
      { name: 'Priya Patel', class: '10-B', attendance: 93, activities: 12, avg_score: 85 }
    ],
    lowAttendance: [
      { name: 'Rajesh Kumar', class: '9-B', attendance: 65, reason: 'Medical issues' },
      { name: 'Pooja Verma', class: '8-A', attendance: 68, reason: 'Family issues' },
      { name: 'Amit Singh', class: '10-B', attendance: 72, reason: 'Transport issues' }
    ]
  };

  const classes = ['all', '10-A', '10-B', '9-A', '9-B', '8-A', '8-B'];

  const exportReport = (type: string) => {
    // Mock export functionality
    alert(`Exporting ${type} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into school performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Classes</option>
            {classes.slice(1).map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          
          <button
            onClick={() => exportReport(activeTab)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'attendance' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          <span>Attendance</span>
        </button>
        
        <button
          onClick={() => setActiveTab('activities')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'activities' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Trophy className="h-4 w-4" />
          <span>Activities</span>
        </button>
        
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'performance' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Performance</span>
        </button>
        
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analytics' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <PieChart className="h-4 w-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Attendance Reports */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overall Attendance</p>
                  <p className="text-3xl font-bold text-gray-900">{attendanceData.overall}%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{attendanceData.trend}% from last period</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Present Today</p>
                  <p className="text-3xl font-bold text-gray-900">{overallStats.totalPresent.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">Out of {overallStats.totalStudents.toLocaleString()} students</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent Today</p>
                  <p className="text-3xl font-bold text-gray-900">{overallStats.totalAbsent}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">{((overallStats.totalAbsent / overallStats.totalStudents) * 100).toFixed(1)}% of total students</div>
            </div>
          </div>

          {/* Class-wise Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Class-wise Attendance</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {attendanceData.byClass.map((item) => (
                  <div key={item.class} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-medium text-blue-700">{item.class}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Class {item.class}</p>
                        <p className="text-sm text-gray-500">{item.present} present, {item.absent} absent</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.percentage > 90 ? 'bg-green-500' : item.percentage > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Attendance Trend</h2>
            </div>
            <div className="p-6">
              <div className="flex items-end space-x-4 h-64">
                {attendanceData.weeklyTrend.map((week, index) => (
                  <div key={week.week} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(week.percentage / 100) * 200}px` }}
                    />
                    <div className="mt-2 text-sm text-gray-600">{week.week}</div>
                    <div className="text-xs text-gray-500">{week.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Reports */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{activityData.totalActivities}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{activityData.completedActivities}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{activityData.upcomingActivities}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Participation</p>
                  <p className="text-2xl font-bold text-gray-900">{activityData.participationRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Types Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Activities by Type</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activityData.byType.map((type) => (
                  <div key={type.type} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{type.type}</p>
                      <p className="text-sm text-gray-500">{type.participants} total participants</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{type.count}</p>
                      <p className="text-sm text-gray-500">activities</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Reports */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Top Performers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activities</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {performanceData.topPerformers.map((student, index) => (
                    <tr key={student.name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-yellow-700">#{index + 1}</span>
                          </div>
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {student.attendance}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.activities}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {student.avg_score}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Attendance Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-900">Students Requiring Attention</h2>
                <div className="ml-2 p-1 bg-red-100 rounded-full">
                  <XCircle className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {performanceData.lowAttendance.map((student) => (
                  <div key={student.name} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <p className="font-medium text-red-900">{student.name}</p>
                      <p className="text-sm text-red-700">Class {student.class} • Attendance: {student.attendance}%</p>
                      <p className="text-xs text-red-600 mt-1">Reason: {student.reason}</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Contact Parent
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Student Engagement</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Participation</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm text-gray-900">82%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Event Attendance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="w-3/4 h-2 bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm text-gray-900">76%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Activity Completion</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="w-5/6 h-2 bg-purple-500 rounded-full" />
                      </div>
                      <span className="text-sm text-gray-900">89%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Teacher Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Events Organized</span>
                    <span className="text-2xl font-bold text-gray-900">24</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Activities Created</span>
                    <span className="text-2xl font-bold text-gray-900">156</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Response Time</span>
                    <span className="text-2xl font-bold text-gray-900">2.3h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Predictive Insights</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-blue-900">Projected Growth</p>
                  <p className="text-sm text-blue-700">Attendance likely to increase by 3.2% next month</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="font-semibold text-yellow-900">At Risk Students</p>
                  <p className="text-sm text-yellow-700">12 students need intervention this week</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-900">High Performers</p>
                  <p className="text-sm text-green-700">89 students exceeding expectations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;