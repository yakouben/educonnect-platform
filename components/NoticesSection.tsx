'use client';

import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const notices = [
  {
    id: 1,
    type: 'warning',
    title: 'Payment Reminder',
    message: 'Your next payment of $2,500 is due on September 15th. Please ensure your account has sufficient funds.',
    time: '2 hours ago',
    icon: AlertCircle,
    color: 'text-orange-600 bg-orange-100',
  },
  {
    id: 2,
    type: 'success',
    title: 'Assignment Submitted',
    message: 'Your Object-Oriented Programming assignment has been successfully submitted and is under review.',
    time: '1 day ago',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100',
  },
  {
    id: 3,
    type: 'info',
    title: 'New Course Available',
    message: 'Machine Learning Fundamentals is now available for enrollment. Early bird discount of 20% applies.',
    time: '2 days ago',
    icon: Info,
    color: 'text-blue-600 bg-blue-100',
  },
];

export function NoticesSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Daily Notices</h2>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
          See all
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => {
          const Icon = notice.icon;
          return (
            <div key={notice.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notice.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{notice.title}</h4>
                  <p className="text-gray-600 text-xs mb-2 leading-relaxed">{notice.message}</p>
                  <p className="text-gray-400 text-xs">{notice.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-purple-900 text-sm mb-2">Suggested Posts</h3>
        <div className="space-y-2">
          <div className="text-xs text-purple-700">
            <span className="font-medium">Trending post:</span> "Best practices for remote learning"
          </div>
          <div className="text-xs text-purple-700">
            <span className="font-medium">For you:</span> "Advanced JavaScript techniques discussion"
          </div>
        </div>
        <button className="mt-3 text-xs text-purple-600 hover:text-purple-700 font-medium">
          See more suggestions
        </button>
      </div>
    </div>
  );
}