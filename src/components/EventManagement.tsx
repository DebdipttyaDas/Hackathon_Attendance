import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Eye, Users, MapPin, Clock, Filter, Search, Trophy, BookOpen, Music, Award } from 'lucide-react';
import type { User, Event } from '../App';

interface EventManagementProps {
  user: User;
}

const EventManagement: React.FC<EventManagementProps> = ({ user }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Annual Sports Day',
      description: 'Inter-class sports competition including athletics, football, cricket, and other games.',
      type: 'sports',
      date: '2025-02-15',
      time: '09:00',
      venue: 'School Playground',
      organizer: 'Sports Department',
      organizerId: 'T003',
      participants: ['1', '2', '3', '4', '5'],
      maxParticipants: 200,
      status: 'upcoming',
      createdDate: '2025-01-15'
    },
    {
      id: '2',
      title: 'Science Exhibition',
      description: 'Students showcase their science projects and experiments.',
      type: 'academic',
      date: '2025-01-28',
      time: '10:00',
      venue: 'Science Laboratory',
      organizer: 'Dr. Preet Singh',
      organizerId: 'T001',
      participants: ['1', '3', '5'],
      maxParticipants: 50,
      status: 'upcoming',
      createdDate: '2025-01-10'
    },
    {
      id: '3',
      title: 'Inter-School Debate Competition',
      description: 'Debate competition between different schools on current social issues.',
      type: 'competition',
      date: '2025-02-05',
      time: '14:00',
      venue: 'Auditorium',
      organizer: 'English Department',
      organizerId: 'T002',
      participants: ['2', '4'],
      maxParticipants: 20,
      status: 'upcoming',
      createdDate: '2025-01-12'
    },
    {
      id: '4',
      title: 'Cultural Program',
      description: 'Traditional dance and music performances by students.',
      type: 'cultural',
      date: '2025-01-22',
      time: '16:00',
      venue: 'Main Hall',
      organizer: 'Cultural Committee',
      organizerId: 'T004',
      participants: ['1', '2', '3', '4', '5'],
      status: 'completed',
      createdDate: '2025-01-01'
    }
  ]);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState<Event | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'academic' as Event['type'],
    date: '',
    time: '',
    venue: '',
    maxParticipants: ''
  });

  const eventTypes = [
    { value: 'sports', label: 'Sports', icon: Trophy, color: 'text-orange-600 bg-orange-100' },
    { value: 'cultural', label: 'Cultural', icon: Music, color: 'text-purple-600 bg-purple-100' },
    { value: 'academic', label: 'Academic', icon: BookOpen, color: 'text-blue-600 bg-blue-100' },
    { value: 'competition', label: 'Competition', icon: Award, color: 'text-emerald-600 bg-emerald-100' },
    { value: 'other', label: 'Other', icon: Calendar, color: 'text-gray-600 bg-gray-100' }
  ];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: Event = {
      id: Date.now().toString(),
      ...newEvent,
      organizer: user.name,
      organizerId: user.id,
      participants: [],
      status: 'upcoming',
      createdDate: new Date().toISOString().split('T')[0],
      maxParticipants: parseInt(newEvent.maxParticipants) || undefined
    };
    setEvents([...events, eventData]);
    setNewEvent({
      title: '',
      description: '',
      type: 'academic',
      date: '',
      time: '',
      venue: '',
      maxParticipants: ''
    });
    setShowCreateEvent(false);
  };

  const getEventTypeInfo = (type: Event['type']) => {
    return eventTypes.find(t => t.value === type) || eventTypes[4];
  };

  const filteredEvents = events.filter(event => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600">Organize and manage school events and activities</p>
        </div>
        <button
          onClick={() => setShowCreateEvent(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          {eventTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const typeInfo = getEventTypeInfo(event.type);
          const TypeIcon = typeInfo.icon;
          
          return (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setShowEventDetails(event)}
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
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                    <Clock className="h-4 w-4 ml-3 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.participants.length} participants</span>
                    {event.maxParticipants && (
                      <span className="text-gray-400">/ {event.maxParticipants} max</span>
                    )}
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <span>Organized by: {event.organizer}</span>
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

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No events found matching your criteria</p>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
            </div>
            
            <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as Event['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <input
                    type="text"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Participants (Optional)</label>
                <input
                  type="number"
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateEvent(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getEventTypeInfo(showEventDetails.type).color}`}>
                  {React.createElement(getEventTypeInfo(showEventDetails.type).icon, { className: "h-6 w-6" })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{showEventDetails.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(showEventDetails.status)} mt-1`}>
                    {showEventDetails.status.charAt(0).toUpperCase() + showEventDetails.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{showEventDetails.description}</p>
              </div>

              {/* Event Details */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-gray-900">{new Date(showEventDetails.date).toLocaleDateString('en-IN')}</span>
                    <span className="text-gray-500 ml-2">at {showEventDetails.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{showEventDetails.venue}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">
                    {showEventDetails.participants.length} participants
                    {showEventDetails.maxParticipants && ` / ${showEventDetails.maxParticipants} max`}
                  </span>
                </div>
              </div>

              {/* Organizer */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Organized by</h4>
                <p className="text-gray-600">{showEventDetails.organizer}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;