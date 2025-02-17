'use client';

import { Search } from 'lucide-react';

export default function TopMenu() {
  return (
    <div className="h-16 flex items-center justify-between px-4 bg-white border-b">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <button className="flex items-center space-x-2">
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Dr+Morgan&background=0D8ABC&color=fff"
              alt="Dr. Morgan"
              className="w-8 h-8 rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-gray-700">Dr. Morgan</span>
        </button>
      </div>
    </div>
  );
}
