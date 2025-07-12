'use client';

import { DollarSign, BookOpen, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Paid',
    value: '$10,000',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    title: 'Total Due',
    value: '$5,000',
    change: '-8.2%',
    changeType: 'negative' as const,
    icon: DollarSign,
    color: 'bg-orange-500',
  },
  {
    title: 'Courses Enrolled',
    value: '12',
    change: '+3',
    changeType: 'positive' as const,
    icon: BookOpen,
    color: 'bg-blue-500',
  },
  {
    title: 'Community Members',
    value: '2,847',
    change: '+142',
    changeType: 'positive' as const,
    icon: Users,
    color: 'bg-purple-500',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}