'use client';

export function MobileWelcomeBanner() {
  return (
    <div className="px-4 py-4 md:hidden">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-blue-100 text-sm mb-1">Hey, Tuesday 👋</p>
          <h2 className="text-xl font-bold mb-2">Simple, Fast Team Communication</h2>
          <p className="text-blue-100 text-sm mb-4">Continue your learning journey</p>
          
          {/* Quick Action */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter your group code"
                className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}