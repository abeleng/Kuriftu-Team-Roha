import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Star, MessageSquare, Coffee } from 'lucide-react';

interface GuestProfile {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'checked-in' | 'checked-out' | 'arriving';
  preferences: string[];
  rating: number;
}

const mockGuests: GuestProfile[] = [
  {
    id: '1',
    name: 'Liya Tesfaye',
    room: '301',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    status: 'checked-in',
    preferences: ['Lake View', 'Early Check-in', 'Traditional Coffee Service'],
    rating: 5
  },
  {
    id: '2',
    name: 'Abebe Bekele',
    room: '405',
    checkIn: '2024-03-16',
    checkOut: '2024-03-22',
    status: 'arriving',
    preferences: ['Airport Pickup', 'Late Check-out'],
    rating: 4
  },
  {
    id: '3',
    name: 'Kalkidan Mekonnen',
    room: '205',
    checkIn: '2024-03-14',
    checkOut: '2024-03-19',
    status: 'checked-in',
    preferences: ['Quiet Room', 'Dietary Restrictions - Vegetarian'],
    rating: 5
  },
  {
    id: '4',
    name: 'Yared Alemayehu',
    room: '506',
    checkIn: '2024-03-17',
    checkOut: '2024-03-23',
    status: 'arriving',
    preferences: ['Spa Package', 'Traditional Ethiopian Breakfast'],
    rating: 4
  }
];

export function GuestProfilesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.room.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || guest.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewProfile = (guestId: string) => {
    navigate(`/guests/${guestId}`);
  };

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-serif font-light text-brand-900">Guest Profiles</h1>
          <p className="text-brand-600 font-serif mt-1">Manage guest information and preferences</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search guests or room numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-brand-200 rounded-lg bg-white shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-400" />
            </div>
            <div className="flex gap-4">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-4 pr-8 py-3 border border-brand-200 rounded-lg bg-white shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif"
              >
                <option value="all">All Statuses</option>
                <option value="checked-in">Checked In</option>
                <option value="arriving">Arriving</option>
                <option value="checked-out">Checked Out</option>
              </select>
              <button className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-serif">
                Add Guest
              </button>
            </div>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-brand-100">
            {filteredGuests.map((guest) => (
              <div key={guest.id} className="p-6 hover:bg-brand-50 transition duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-100 rounded-full p-3">
                      <User className="h-8 w-8 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-brand-900">{guest.name}</h3>
                      <p className="text-brand-600 font-serif">Room {guest.room}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="flex items-center text-sm text-brand-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {guest.checkIn} - {guest.checkOut}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-serif ${
                          guest.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                          guest.status === 'arriving' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {guest.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleViewProfile(guest.id)}
                      className="px-4 py-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition font-serif text-sm"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                
                {/* Guest Preferences */}
                <div className="mt-4">
                  <h4 className="text-sm font-serif text-brand-600 mb-2">Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {guest.preferences.map((pref, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-serif">
                        <Coffee className="h-4 w-4 mr-1" />
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Guest Rating */}
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < guest.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-brand-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-brand-600 font-serif">
                    Previous Stay Rating
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}