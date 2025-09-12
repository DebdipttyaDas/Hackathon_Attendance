import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Filter, Download, Calendar, Users, BarChart3, AlertCircle } from 'lucide-react';
import type { User, Student, AttendanceRecord } from '../App';

interface AttendanceManagementProps {
  user: User;
}

const AttendanceManagement: React.FC<AttendanceManagementProps> = ({ user }) => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'mark' | 'view' | 'reports'>('mark');

  // Mock data
  const classes = ['10-A', '10-B', '9-A', '9-B', '8-A', '8-B'];
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];

  const [students] = useState<Student[]>([
    { id: '1', name: 'Harpreet Kaur', class: '10-A', section: 'A', rollNumber: '01', email: 'harpreet@example.com', phone: '9876543210', parentName: 'Gurmeet Singh', parentPhone: '9876543211', address: 'Amritsar', admissionDate: '2023-04-01' },
    { id: '2', name: 'Simran Singh', class: '10-A', section: 'A', rollNumber: '02', email: 'simran@example.com', phone: '9876543212', parentName: 'Jasbir Kaur', parentPhone: '9876543213', address: 'Ludhiana', admissionDate: '2023-04-01' },
    { id: '3', name: 'Arjun Sharma', class: '10-A', section: 'A', rollNumber: '03', email: 'arjun@example.com', phone: '9876543214', parentName: 'Rajesh Sharma', parentPhone: '9876543215', address: 'Jalandhar', admissionDate: '2023-04-01' },
    { id: '4', name: 'Priya Patel', class: '10-A', section: 'A', rollNumber: '04', email: 'priya@example.com', phone: '9876543216', parentName: 'Suresh Patel', parentPhone: '9876543217', address: 'Chandigarh', admissionDate: '2023-04-01' },
    { id: '5', name: 'Gurdeep Kaur', class: '10-A', section: 'A', rollNumber: '05', email: 'gurdeep@example.com', phone: '9876543218', parentName: 'Manjit Singh', parentPhone: '9876543219', address: 'Patiala', admissionDate: '2023-04-01' },
  ]);

  const [attendanceData, setAttendanceData] = useState<{ [studentId: string]: 'present' | 'absent' | 'late' }>({});

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { id: '1', studentId: '1', studentName: 'Harpreet Kaur', class: '10-A', section: 'A', date: '2025-01-20', status: 'present', subject: 'Mathematics', teacherId: 'T001', timeMarked: '09:15' },
    { id: '2', studentId: '2', studentName: 'Simran Singh', class: '10-A', section: 'A', date: '2025-01-20', status: 'late', subject: 'Mathematics', teacherId: 'T001', timeMarked: '09:25' },
    { id: '3', studentId: '3', studentName: 'Arjun Sharma', class: '10-A', section: 'A', date: '2025-01-20', status: 'absent', subject: 'Mathematics', teacherId: 'T001', timeMarked: '09:15' },
  ]);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    console.log('Submitting attendance:', {
      class: selectedClass,
      date: selectedDate,
      subject: selectedSubject,
      attendance: attendanceData
    });
    // Here you would typically send the data to your backend
    alert('Attendance submitted successfully!');
  };

  const filteredStudents = students
    .filter(student => student.class === selectedClass)
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.includes(searchTerm)
    );

  const getAttendanceStats = () => {
    const todayRecords = attendanceRecords.filter(record => record.date === selectedDate);
    const total = todayRecords.length;
    const present = todayRecords.filter(record => record.status === 'present').length;
    const absent = todayRecords.filter(record => record.status === 'absent').length;
    const late = todayRecords.filter(record => record.status === 'late').length;
    
    return { total, present, absent, late, percentage: total > 0 ? ((present + late) / total * 100).toFixed(1) : '0' };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track and manage student attendance efficiently</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('mark')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'mark' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setViewMode('view')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            View Records
          </button>
          <button
            onClick={() => setViewMode('reports')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'reports' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Late Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.late}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.percentage}%</p>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'mark' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Controls */}
          <div className="p-6 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Student</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name or Roll No."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-blue-700">{student.rollNumber}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">Roll No: {student.rollNumber} | Class: {student.class}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        attendanceData[student.id] === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        attendanceData[student.id] === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        attendanceData[student.id] === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No students found for the selected criteria</p>
              </div>
            )}
            
            {filteredStudents.length > 0 && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setAttendanceData({})}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={handleSubmitAttendance}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'view' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Records</h2>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{record.studentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{record.class}-{record.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(record.date).toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{record.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'late'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status === 'present' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {record.status === 'late' && <Clock className="h-3 w-3 mr-1" />}
                        {record.status === 'absent' && <XCircle className="h-3 w-3 mr-1" />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{record.timeMarked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Attendance Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-4">Class-wise Attendance Trends</h3>
                <div className="space-y-4">
                  {classes.map(cls => {
                    const percentage = Math.floor(Math.random() * 20) + 80; // Mock data
                    return (
                      <div key={cls} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Class {cls}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${percentage > 90 ? 'bg-green-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-4">Subject-wise Attendance</h3>
                <div className="space-y-4">
                  {subjects.slice(0, 5).map(subject => {
                    const percentage = Math.floor(Math.random() * 15) + 85; // Mock data
                    return (
                      <div key={subject} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{subject}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${percentage > 90 ? 'bg-green-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Low Attendance Alerts</h2>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-red-800">Arjun Sharma - Class 10-A</p>
                  <p className="text-sm text-red-600">Attendance: 65% (Below 75% threshold)</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Contact Parent
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <p className="font-medium text-yellow-800">Priya Patel - Class 10-A</p>
                  <p className="text-sm text-yellow-600">Attendance: 72% (Close to threshold)</p>
                </div>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  Send Warning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;