'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CreditCard, CheckCircle, AlertCircle, Star, Award, BookOpen, Code, Palette, TrendingUp } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Advanced React Workshop',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'September 15, 2023',
    time: '2:00 PM - 5:00 PM PST',
    duration: '3 hours',
    location: 'Virtual Event',
    price: '$89',
    originalPrice: '$129',
    spots: 12,
    totalSpots: 25,
    category: 'Development',
    level: 'Advanced',
    description: 'Deep dive into advanced React patterns, hooks, and performance optimization techniques.',
    features: ['Live coding session', 'Q&A with expert', 'Certificate of completion', 'Recording access'],
    icon: Code,
    isPopular: true,
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    instructor: 'Maya Patel',
    instructorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'September 18, 2023',
    time: '10:00 AM - 1:00 PM PST',
    duration: '3 hours',
    location: 'Virtual Event',
    price: '$79',
    originalPrice: '$99',
    spots: 8,
    totalSpots: 20,
    category: 'Design',
    level: 'Intermediate',
    description: 'Learn modern design principles and create stunning user interfaces that convert.',
    features: ['Design system templates', 'Figma resources', 'Portfolio review', '1-on-1 feedback'],
    icon: Palette,
    isPopular: false,
  },
  {
    id: 3,
    title: 'Growth Marketing Bootcamp',
    instructor: 'Jordan Kim',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: 'September 22, 2023',
    time: '1:00 PM - 6:00 PM PST',
    duration: '5 hours',
    location: 'Hybrid (SF + Virtual)',
    price: '$149',
    originalPrice: '$199',
    spots: 5,
    totalSpots: 30,
    category: 'Marketing',
    level: 'Beginner',
    description: 'Complete growth marketing strategy from acquisition to retention and everything in between.',
    features: ['Growth toolkit', 'Case study analysis', 'Networking session', 'Action plan template'],
    icon: TrendingUp,
    isPopular: true,
  },
];

const registeredEvents = [
  {
    id: 4,
    title: 'Data Science Fundamentals',
    instructor: 'Sam Chen',
    date: 'September 10, 2023',
    time: '3:00 PM - 6:00 PM PST',
    status: 'confirmed',
    paymentStatus: 'paid',
    price: '$99',
    icon: BookOpen,
  },
  {
    id: 5,
    title: 'Startup Pitch Workshop',
    instructor: 'Lisa Wang',
    date: 'September 12, 2023',
    time: '11:00 AM - 2:00 PM PST',
    status: 'waitlist',
    paymentStatus: 'pending',
    price: '$129',
    icon: TrendingUp,
  },
];

export function RegistrationPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    experience: '',
    goals: '',
    paymentMethod: 'card',
  });

  const handleRegister = (eventId: number) => {
    setSelectedEvent(eventId);
    setRegistrationStep(1);
  };

  const nextStep = () => {
    setRegistrationStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setRegistrationStep(prev => Math.max(prev - 1, 1));
  };

  const selectedEventData = upcomingEvents.find(event => event.id === selectedEvent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <span>Event Registration</span>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
          </h1>
          <p className="text-gray-600 mt-1">Register for upcoming workshops and events</p>
        </div>
      </div>

      {/* Registration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{upcomingEvents.length}</h3>
          <p className="text-purple-100">Upcoming Events</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{registeredEvents.length}</h3>
          <p className="text-emerald-100">Registered Events</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">8</h3>
          <p className="text-blue-100">Certificates Earned</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">24</h3>
          <p className="text-orange-100">Hours Completed</p>
        </div>
      </div>

      {/* My Registrations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span>My Registrations</span>
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </h2>

        <div className="space-y-4">
          {registeredEvents.map((event) => {
            const IconComponent = event.icon;
            return (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.instructor}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {event.status === 'confirmed' ? (
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Confirmed</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Waitlist</span>
                        </span>
                      )}
                    </div>
                    <div className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                      event.paymentStatus === 'paid' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {event.paymentStatus === 'paid' ? (
                        <span className="flex items-center space-x-1">
                          <CreditCard className="w-3 h-3" />
                          <span>Paid</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{event.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span>Upcoming Events</span>
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-4 h-4 text-white" />
          </div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => {
            const IconComponent = event.icon;
            return (
              <div
                key={event.id}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-purple-300 relative"
              >
                {event.isPopular && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Popular</span>
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {event.category}
                        </span>
                        <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {event.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <img
                      src={event.instructorAvatar}
                      alt={event.instructor}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <p className="text-gray-600 text-sm">{event.instructor}</p>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{event.spots} spots left of {event.totalSpots}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">What's included:</p>
                    <div className="space-y-1">
                      {event.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {event.features.length > 2 && (
                        <p className="text-xs text-gray-500">+{event.features.length - 2} more</p>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{event.price}</span>
                      <span className="text-sm text-gray-500 line-through">{event.originalPrice}</span>
                    </div>
                    <div className="text-right">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                          style={{ width: `${((event.totalSpots - event.spots) / event.totalSpots) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">{Math.round(((event.totalSpots - event.spots) / event.totalSpots) * 100)}% filled</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(event.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Register Now</span>
                    <Star className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && selectedEventData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Register for Event</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= registrationStep 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        step < registrationStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            {registrationStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            )}

            {registrationStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What are your goals for this event?</label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    rows={4}
                    placeholder="Tell us what you hope to achieve..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {registrationStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">Payment Information</h4>
                
                {/* Event Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <selectedEventData.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{selectedEventData.title}</h5>
                      <p className="text-sm text-gray-600">{selectedEventData.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 line-through">{selectedEventData.originalPrice}</span>
                      <span className="text-lg font-bold text-gray-900">{selectedEventData.price}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-4 h-4 text-purple-600"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your payment information is encrypted and secure. You'll receive a confirmation email after successful registration.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={registrationStep === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {registrationStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Handle registration completion
                    setSelectedEvent(null);
                    setRegistrationStep(1);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                >
                  <span>Complete Registration</span>
                  <Star className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}