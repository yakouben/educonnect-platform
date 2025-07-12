'use client';

const instructors = [
  {
    id: 1,
    name: 'Alex Rivera',
    subject: 'Digital Marketing',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    students: 2847,
    online: true,
    emoji: '🚀',
    specialty: 'Growth Hacking',
  },
  {
    id: 2,
    name: 'Maya Patel',
    subject: 'UX/UI Design',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    students: 1923,
    online: true,
    emoji: '🎨',
    specialty: 'Design Systems',
  },
  {
    id: 3,
    name: 'Jordan Kim',
    subject: 'Content Creation',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    students: 3456,
    online: false,
    emoji: '📱',
    specialty: 'Social Media',
  },
  {
    id: 4,
    name: 'Sam Chen',
    subject: 'Data Analytics',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.7,
    students: 1567,
    online: true,
    emoji: '📊',
    specialty: 'Business Intelligence',
  },
];

export function InstructorsSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-gray-900">Community Coaches</h2>
          <span className="text-2xl">👥</span>
        </div>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
          See all
        </button>
      </div>

      <div className="space-y-4">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-purple-200">
            <div className="relative">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm ${
                instructor.online ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-sm">{instructor.emoji}</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900 text-sm">{instructor.name}</h4>
                {instructor.online && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Live ✨
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs mb-1">{instructor.subject}</p>
              <p className="text-purple-600 text-xs font-medium mb-2">{instructor.specialty}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span className="font-medium">{instructor.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <span>👨‍🎓</span>
                  <span>{instructor.students.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md transform">
                Connect 🤝
              </button>
              <button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Coach Spotlight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg">🌟</span>
          <h3 className="font-semibold text-purple-900 text-sm">Coach Spotlight</h3>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-purple-700">
            <span className="font-medium">This week:</span> "Building Your Personal Brand" masterclass with Alex Rivera 🚀
          </div>
          <div className="text-xs text-purple-700">
            <span className="font-medium">Trending:</span> Maya's design system workshop has 500+ attendees! 🎨
          </div>
        </div>
        <button className="mt-3 text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
          <span>Join featured sessions</span>
          <span>✨</span>
        </button>
      </div>
    </div>
  );
}