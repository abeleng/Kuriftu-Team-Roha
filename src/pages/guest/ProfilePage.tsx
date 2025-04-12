import { useState } from 'react';
import { User, Calendar, Mail, Phone, MapPin, Coffee, Edit, Save } from 'lucide-react';

interface GuestProfile {
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  preferences: string[];
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<GuestProfile>({
    name: "Emma Thompson",
    email: "emma.t@example.com",
    phone: "+251 912 345 678",
    roomNumber: "301",
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    preferences: ["Ocean View", "Early Check-in", "Spa Package", "Quiet Room"]
  });

  const [editedProfile, setEditedProfile] = useState<GuestProfile>(profile);
  const [newPreference, setNewPreference] = useState('');

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const addPreference = () => {
    if (newPreference.trim() && !editedProfile.preferences.includes(newPreference.trim())) {
      setEditedProfile({
        ...editedProfile,
        preferences: [...editedProfile.preferences, newPreference.trim()]
      });
      setNewPreference('');
    }
  };

  const removePreference = (prefToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      preferences: editedProfile.preferences.filter(pref => pref !== prefToRemove)
    });
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-12 bg-brand-900 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-brand-100 rounded-full p-6">
                  <User className="h-12 w-12 text-brand-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-serif text-white">{profile.name}</h1>
                  <p className="text-brand-200 font-serif">Room {profile.roomNumber}</p>
                </div>
              </div>
              <button
                onClick={isEditing ? handleSave : handleEdit}
                className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition flex items-center space-x-2"
              >
                {isEditing ? (
                  <>
                    <Save className="h-5 w-5" />
                    <span className="font-serif">Save</span>
                  </>
                ) : (
                  <>
                    <Edit className="h-5 w-5" />
                    <span className="font-serif">Edit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-brand-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-brand-600" />
                    <div className="flex-1">
                      <p className="text-sm text-brand-600 font-serif">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                          className="w-full mt-1 px-3 py-2 border border-brand-200 rounded-lg focus:ring-brand-500 focus:border-brand-500 font-serif"
                        />
                      ) : (
                        <p className="text-lg text-brand-900 font-serif">{profile.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-brand-600" />
                    <div className="flex-1">
                      <p className="text-sm text-brand-600 font-serif">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                          className="w-full mt-1 px-3 py-2 border border-brand-200 rounded-lg focus:ring-brand-500 focus:border-brand-500 font-serif"
                        />
                      ) : (
                        <p className="text-lg text-brand-900 font-serif">{profile.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-brand-900 mb-6">Stay Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm text-brand-600 font-serif">Room</p>
                      <p className="text-lg text-brand-900 font-serif">{profile.roomNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm text-brand-600 font-serif">Stay Period</p>
                      <p className="text-lg text-brand-900 font-serif">
                        {profile.checkIn} to {profile.checkOut}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="mt-12">
              <h2 className="text-2xl font-serif text-brand-900 mb-6">Preferences</h2>
              {isEditing && (
                <div className="mb-4 flex space-x-2">
                  <input
                    type="text"
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    placeholder="Add new preference"
                    className="flex-1 px-4 py-2 border border-brand-200 rounded-lg focus:ring-brand-500 focus:border-brand-500 font-serif"
                  />
                  <button
                    onClick={addPreference}
                    className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-serif"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {(isEditing ? editedProfile : profile).preferences.map((pref, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-brand-50 text-brand-800 px-4 py-2 rounded-full group"
                  >
                    <Coffee className="h-4 w-4 text-brand-600" />
                    <span className="font-serif">{pref}</span>
                    {isEditing && (
                      <button
                        onClick={() => removePreference(pref)}
                        className="ml-2 text-brand-600 hover:text-brand-800 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}