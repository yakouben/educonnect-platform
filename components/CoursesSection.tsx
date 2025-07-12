'use client';

import { Play, Clock, Users, Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Object Oriented Programming',
    instructor: 'Dr. Sarah Wilson',
    progress: 75,
    duration: '12 weeks',
    students: 234,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'In Progress',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Database Systems & Design',
    instructor: 'Prof. Michael Chen',
    progress: 45,
    duration: '10 weeks',
    students: 189,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'In Progress',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    title: 'Web Development Fundamentals',
    instructor: 'Jessica Martinez',
    progress: 90,
    duration: '8 weeks',
    students: 312,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'Almost Complete',
    color: 'from-emerald-500 to-teal-600',
  },
];

export function CoursesSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Enrolled Courses</h2>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
          See all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover transition-transform duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-80`} />
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Play className="w-6 h-6 ml-1" />
              </button>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {course.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}