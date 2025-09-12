import React, { useState } from 'react';
import { Plus, Users, Edit, Trash2, Search, Upload, Download, UserPlus, Eye, Mail, Phone } from 'lucide-react';
import type { User, Class, Student } from '../App';

interface ClassManagementProps {
  user: User;
}

const ClassManagement: React.FC<ClassManagementProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'classes' | 'students'>('classes');
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: '10',
      section: 'A',
      teacherId: 'T001',
      teacherName: 'Dr. Preet Singh',
      subject: 'Mathematics',
      students: [],
      totalStudents: 35,
      createdDate: '2024-04-01'
    },
    {
      id: '2',
      name: '10',
      section: 'B',
      teacherId: 'T002',
      teacherName: 'Prof. Simran Kaur',
      subject: 'Science',
      students: [],
      totalStudents: 32,
      createdDate: '2024-04-01'
    },
    {
      id: '3',
      name: '9',
      section: 'A',
      teacherId: 'T003',
      teacherName: 'Ms. Harpreet Kaur',
      subject: 'English',
      students: [],
      totalStudents: 38,
      createdDate: '2024-04-01'
    }
  ]);

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Harpreet Kaur',
      class: '10',
      section: 'A',
      rollNumber: '001',
      email: 'harpreet.student@example.com',
      phone: '9876543210',
      parentName: 'Gurmeet Singh',
      parentPhone: '9876543211',
      address: '123 Model Town, Amritsar, Punjab',
      admissionDate: '2024-04-01'
    },
    {
      id: '2',
      name: 'Simran Singh',
      class: '10',
      section: 'A',
      rollNumber: '002',
      email: 'simran.student@example.com',
      phone: '9876543212',
      parentName: 'Jasbir Kaur',
      parentPhone: '9876543213',
      address: '456 Civil Lines, Ludhiana, Punjab',
      admissionDate: '2024-04-01'
    },
    {
      id: '3',
      name: 'Arjun Sharma',
      class: '10',
      section: 'B',
      rollNumber: '003',
      email: 'arjun.student@example.com',
      phone: '9876543214',
      parentName: 'Rajesh Sharma',
      parentPhone: '9876543215',
      address: '789 Sarabha Nagar, Jalandhar, Punjab',
      admissionDate: '2024-04-01'
    }
  ]);

  const [newClass, setNewClass] = useState({
    name: '',
    section: '',
    teacherName: '',
    subject: ''
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: ''
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const classData: Class = {
      id: Date.now().toString(),
      ...newClass,
      teacherId: user.teacherId || user.id,
      students: [],
      totalStudents: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setClasses([...classes, classData]);
    setNewClass({ name: '', section: '', teacherName: '', subject: '' });
    setShowCreateClass(false);
  };

  const handleAddStudent = (e: React.FormForm) => {
    e.preventDefault();
    const studentData: Student = {
      id: Date.now().toString(),
      ...newStudent,
      admissionDate: new Date().toISOString().split('T')[0]
    };
    setStudents([...students, studentData]);
    setNewStudent({
      name: '',
      class: '',
      section: '',
      rollNumber: '',
      email: '',
      phone: '',
      parentName: '',
      parentPhone: '',
      address: ''
    });
    setShowAddStudent(false);
  };

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm) ||
    student.class.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600">Manage classes and student information</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'classes' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Classes
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Students
          </button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-3">
          {activeTab === 'classes' && (
            <button
              onClick={() => setShowCreateClass(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Class</span>
            </button>
          )}
          
          {activeTab === 'students' && (
            <>
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Student</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <Upload className="h-4 w-4" />
                <span>Upload CSV</span>
              </button>
            </>
          )}
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(cls => (
            <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Class {cls.name}-{cls.section}</h3>
                  <p className="text-sm text-gray-600">{cls.subject}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Teacher: {cls.teacherName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Students: {cls.totalStudents}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Created: {new Date(cls.createdDate).toLocaleDateString('en-IN')}</span>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">{student.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.rollNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.class}-{student.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{student.parentName}</div>
                      <div className="text-sm text-gray-500">{student.parentPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowStudentDetails(student)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Class</h2>
            </div>
            
            <form onSubmit={handleCreateClass} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  value={newClass.section}
                  onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., A"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name</label>
                <input
                  type="text"
                  value={newClass.teacherName}
                  onChange={(e) => setNewClass({...newClass, teacherName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Teacher's full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  value={newClass.subject}
                  onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateClass(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Student</h2>
            </div>
            
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input
                    type="text"
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone</label>
                  <input
                    type="tel"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Student Details</h2>
                <button
                  onClick={() => setShowStudentDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-blue-700">{showStudentDetails.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{showStudentDetails.name}</h3>
                  <p className="text-gray-600">Class {showStudentDetails.class}-{showStudentDetails.section}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Roll Number</label>
                  <p className="text-gray-900">{showStudentDetails.rollNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Admission Date</label>
                  <p className="text-gray-900">{new Date(showStudentDetails.admissionDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{showStudentDetails.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{showStudentDetails.phone}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Parent Contact</label>
                  <p className="text-gray-900">{showStudentDetails.parentName}</p>
                  <p className="text-sm text-gray-600">{showStudentDetails.parentPhone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{showStudentDetails.address}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowStudentDetails(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;