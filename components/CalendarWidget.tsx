'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Beginner sharing session creator',
    time: '10:45 - 11:30 AM',
    instructor: 'Darlene Robertson',
    type: 'session',
  },
  {
    id: 2,
    title: 'Improve performance for content ideas',
    time: '15:20 - 16:00 PM',
    instructor: 'Esther Howard',
    type: 'workshop',
  },
];

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Events</h2>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
          See All
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            className={`h-8 text-sm rounded-lg transition-colors ${
              day === 3
                ? 'bg-purple-600 text-white'
                : day === 16 || day === 21
                ? 'bg-purple-100 text-purple-700'
                : day
                ? 'hover:bg-gray-100 text-gray-900'
                : 'text-transparent cursor-default'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm mb-1">{event.title}</h4>
                <p className="text-gray-600 text-xs mb-1">{event.instructor}</p>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}