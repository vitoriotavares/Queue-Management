'use client';

import { Home, Settings, Menu, MonitorPlay, LayoutGrid, ClipboardList } from 'lucide-react';
import Link from 'next/link';

interface SideMenuProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

export default function SideMenu({ isExpanded, onExpandChange }: SideMenuProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: ClipboardList, label: 'Triagem', href: '/triage' },
    { icon: MonitorPlay, label: 'Display', href: '/display' },
    { icon: LayoutGrid, label: 'Guichês', href: '/counter' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-[#051e34] text-white transition-all duration-300 z-50 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={() => onExpandChange(!isExpanded)}
        className="w-full p-4 flex justify-center hover:bg-blue-900/20"
      >
        <Menu size={24} />
      </button>
      
      <div className="mt-8">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-blue-900/20 hover:text-white transition-colors"
          >
            <item.icon size={20} />
            {isExpanded && (
              <span className="ml-4">{item.label}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
