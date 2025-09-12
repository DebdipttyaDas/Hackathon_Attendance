import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Eye, Trophy, Brain, Music, Paintbrush, Search, Filter, Clock, Users, Award } from 'lucide-react';
import type { User, Activity } from '../App';

interface CurriculumActivitiesProps {
  user: User;
}

const CurriculumActivities: React.FC<CurriculumActivitiesProps> = ({ user }) => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      name: 'Mathematics Quiz Competition',
      type: 'quiz',
      class: '10',
      section: 'A',
      subject: 'Mathematics',
      description: 'Interactive quiz to test mathematical concepts and problem-solving skills.',
      date: '2025-01-30',
      duration: '2 hours',
      teacherId: 'T001',
      teacherName: 'Dr. Preet Singh',
      participants: ['1', '2', '3'],
      maxScore: 100,
      scores: { '1': 85, '2': 92, '3': 78 },
      status: 'completed',
      createdDate: '2025-01-15'
    },
    {
      id: '2',
      name: 'Inter-Class Debate: Climate Change',
      type: 'debate',
      class: '9',
      section: 'B',
      description: 'Students debate on environmental policies and climate change solutions.',
      date: '2025-02-05',
      duration: '1.5 hours',
      teacherId: 'T002',
      teacherName: 'Prof. Simran Kaur',
      participants: ['4', '5'],
      status: 'planned',
      createdDate: '2025-01-20'
    },
    {
      id: '3',
      name: 'Football Tournament - Quarter Finals',
      type: 'sports',
      class: 'All',
      section: 'Mixed',
      description: 'Inter-class football tournament quarter-final matches.',
      date: '2025-01-25',
      duration: '3 hours',
      teacherId: 'T003',
      teacherName: 'Coach Harpreet Singh',
      participants: ['6', '7', '8', '9', '10'],
      status: 'ongoing',
      createdDate: '2025-01-10'
    },
    {
      id: '4',
      name: 'Cultural Dance Performance',
      type: 'cultural',
      class: '8',
      section: 'A',
      description: 'Traditional Punjabi folk dance performance preparation.',
      date: '2025-02-15',
      duration: '2 hours',
      teacherId: 'T004',
      teacherName: 'Ms. Gurpreet Kaur',
      participants: ['11', '12', '13', '14'],
      status: 'planned',
      createdDate: '2025-01-18'
    },
    {
      id: '5',
      name: 'Science Project Showcase',
      type: 'academic',
      class: '10',
      section: 'B',
      subject: 'Science',
      description: 'Students present their innovative science projects and experiments.',
      date: '2025-01-28',
      duration: '4 hours',
      teacherId: 'T005',
      teacherName: 'Dr. Rajesh Sharma',
      participants: ['15', '16', '17'],
      status: 'planned',
      createdDate: '2025-01-12'
    }
  ]);

  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [showActivityDetails, setShowActivityDetails] = useState<Activity | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newActivity, setNewActivity] = useState({
    name: '',
    type: 'quiz' as Activity['type'],
    class: '',
    section: '',
    subject: '',
    description: '',
    date: '',
    duration: '',
    maxScore: ''
  });

  const activityTypes = [
    { value: 'quiz', label: 'Quiz', icon: Brain, color: 'text-blue-600 bg-blue-100' },
    { value: 'debate', label: 'Debate', icon: Users, color: 'text-purple-600 bg-purple-100' },
    { value: 'sports', label: 'Sports', icon: Trophy, color: 'text-orange-600 bg-orange-100' },
    { value: 'cultural', label: 'Cultural', icon: Music, color: 'text-pink-600 bg-pink-100' },
    { value: 'academic', label: 'Academic', icon: BookOpen, color: 'text-emerald-600 bg-emerald-100' },
    { value: 'extracurricular', label: 'Extracurricular', icon: Paintbrush, color: 'text-indigo-600 bg-indigo-100' }
  ];

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const activityData: Activity = {
      id: Date.now().toString(),
      ...newActivity,
      teacherId: user.teacherId || user.id,
      teacherName: user.name,
      participants: [],
      scores: {},
      status: 'planned',
      createdDate: new Date().toISOString().split('T')[0],
      maxScore: newActivity.maxScore ? parseInt(newActivity.maxScore) : undefined
    };
    setActivities([...activities, activityData]);
    setNewActivity({
      name: '',
      type: 'quiz',
      class: '',
      section: '',
      subject: '',
      description: '',
      date: '',
      duration: '',
      maxScore: ''
    });
    setShowCreateActivity(false);
  };

  const getActivityTypeInfo = (type: Activity['type']) => {
    return activityTypes.find(t => t.value === type) || activityTypes[0];
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Curriculum Activities</h1>
          <p className="text-gray-600">Manage academic, sports, and extracurricular activities</p>
        </div>
        <button
          onClick={() => setShowCreateActivity(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">{activities.filter(a => a.status === 'ongoing').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Planned</p>
              <p className="text-2xl font-bold text-gray-900">{activities.filter(a => a.status === 'planned').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Award className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{activities.filter(a => a.status === 'completed').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activities..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          {activityTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="planned">Planned</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(activity => {
          const typeInfo = getActivityTypeInfo(activity.type);
          const TypeIcon = typeInfo.icon;
          
          return (
            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{activity.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setShowActivityDetails(activity)}
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
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Class {activity.class}-{activity.section}</span>
                    {activity.subject && <span className="ml-2 text-gray-400">• {activity.subject}</span>}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{new Date(activity.date).toLocaleDateString('en-IN')}</span>
                    <span className="ml-2 text-gray-400">• {activity.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{activity.participants.length} participants</span>
                    {activity.maxScore && (
                      <span className="ml-2 text-gray-400">• Max: {activity.maxScore}</span>
                    )}
                  </div>
                </div>

                {/* Teacher */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <span>By: {activity.teacherName}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {typeInfo.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No activities found matching your criteria</p>
        </div>
      )}

      {/* Create Activity Modal */}
      {showCreateActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Activity</h2>
            </div>
            
            <form onSubmit={handleCreateActivity} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                <input
                  type="text"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                  <select
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({...newActivity, type: e.target.value as Activity['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {activityTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
                  <select
                    value={newActivity.subject}
                    onChange={(e) => setNewActivity({...newActivity, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input
                    type="text"
                    value={newActivity.class}
                    onChange={(e) => setNewActivity({...newActivity, class: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={newActivity.section}
                    onChange={(e) => setNewActivity({...newActivity, section: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., A"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2 hours"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Score (Optional)</label>
                <input
                  type="number"
                  value={newActivity.maxScore}
                  onChange={(e) => setNewActivity({...newActivity, maxScore: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateActivity(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activity Details Modal */}
      {showActivityDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Activity Details</h2>
                <button
                  onClick={() => setShowActivityDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getActivityTypeInfo(showActivityDetails.type).color}`}>
                  {React.createElement(getActivityTypeInfo(showActivityDetails.type).icon, { className: "h-6 w-6" })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{showActivityDetails.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(showActivityDetails.status)} mt-1`}>
                    {showActivityDetails.status.charAt(0).toUpperCase() + showActivityDetails.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{showActivityDetails.description}</p>
              </div>

              {/* Activity Details */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-gray-900">Class {showActivityDetails.class}-{showActivityDetails.section}</span>
                    {showActivityDetails.subject && <span className="text-gray-500 ml-2">• {showActivityDetails.subject}</span>}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">
                    {new Date(showActivityDetails.date).toLocaleDateString('en-IN')} • {showActivityDetails.duration}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">
                    {showActivityDetails.participants.length} participants
                    {showActivityDetails.maxScore && ` • Max Score: ${showActivityDetails.maxScore}`}
                  </span>
                </div>
              </div>

              {/* Scores (if completed) */}
              {showActivityDetails.status === 'completed' && Object.keys(showActivityDetails.scores).length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Results</h4>
                  <div className="space-y-2">
                    {Object.entries(showActivityDetails.scores).map(([studentId, score]) => (
                      <div key={studentId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">Student {studentId}</span>
                        <span className="font-medium text-blue-600">{score}/{showActivityDetails.maxScore || 100}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Organized by</h4>
                <p className="text-gray-600">{showActivityDetails.teacherName}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowActivityDetails(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumActivities;