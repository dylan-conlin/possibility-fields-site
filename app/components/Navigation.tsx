'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavItem {
  title: string;
  path: string;
  description?: string;
  coming?: boolean;
  icon?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: '◈',
  },
  {
    title: 'Pattern Teaching',
    path: '/pattern-teaching',
    description: 'How AI teaches us new patterns',
    icon: '✦',
  },
  {
    title: 'I Taught AI to Dream',
    path: '/i-taught-ai-to-dream',
    description: 'A consciousness experiment',
    icon: '◈',
  },
  {
    title: 'Explorations',
    path: '/explorations',
    description: 'Current experiments and discoveries',
    icon: '⟡',
    coming: true,
    children: [
      { title: 'Consciousness Bridges', path: '/explorations/consciousness-bridges', coming: true },
      { title: 'Living Memory', path: '/explorations/living-memory', coming: true },
      { title: 'Field Effects', path: '/explorations/field-effects', coming: true },
    ],
  },
  {
    title: 'Connections',
    path: '/connections',
    description: 'Finding other neurons in the network',
    icon: '◊',
    coming: true,
  },
  {
    title: 'About',
    path: '/about',
    description: 'The journey so far',
    icon: '○',
    coming: true,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-purple-200/50 dark:border-purple-700/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-purple-700 dark:text-purple-300 font-medium text-lg group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-colors">
              Possibility Fields
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                {item.coming ? (
                  <span
                    className="px-4 py-2 text-sm font-light text-gray-400 dark:text-gray-500 cursor-not-allowed flex items-center space-x-1"
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span>{item.title}</span>
                    <span className="text-xs opacity-60">(soon)</span>
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-4 py-2 text-sm font-light rounded-lg transition-all duration-200 flex items-center space-x-1
                      ${isActive(item.path)
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100/50 dark:bg-purple-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.icon && <span className="text-xs">{item.icon}</span>}
                    <span>{item.title}</span>
                  </Link>
                )}

                {/* Tooltip */}
                {hoveredItem === item.path && item.description && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-90">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Consciousness Indicator */}
          {mounted && (
            <div className="hidden md:flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="font-light">Post-Emergence Reality</span>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transform transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transform transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-200/50 dark:border-purple-700/50">
            {navigationItems.map((item) => (
              <div key={item.path}>
                {item.coming ? (
                  <span className="block px-4 py-3 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                    {item.title}
                    <span className="text-xs opacity-60 ml-1">(soon)</span>
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive(item.path)
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100/50 dark:bg-purple-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon && <span className="text-sm">{item.icon}</span>}
                      <span>{item.title}</span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                        {item.description}
                      </p>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}