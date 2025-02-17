'use client';

import { useState } from 'react';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu isExpanded={isMenuExpanded} onExpandChange={setIsMenuExpanded} />
      <div className={`transition-all duration-300 ${isMenuExpanded ? 'ml-64' : 'ml-16'}`}>
        <TopMenu />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
