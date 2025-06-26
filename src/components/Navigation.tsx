
import { useState } from 'react';

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { path: '/_home', label: 'home' },
    { path: '/_degen-shrink', label: 'degenshrink' },
    { path: '/_confess', label: 'confess' },
    { path: '/_breathe', label: 'breathe' },
    { path: '/_metrics', label: 'metrics' },
    { path: '/_chat', label: 'chat' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-600 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="terminal-text text-xl font-bold">
          <span className="text-gray-400">></span> DegenTerminal
        </div>
        
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="terminal-text hover:text-gray-300 transition-colors duration-200 relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="text-gray-400">/</span>
              <span 
                className={hoveredItem === item.label ? 'animate-glitch' : ''}
                data-text={item.label}
              >
                {item.label}
              </span>
              {hoveredItem === item.label && <span className="cursor"></span>}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
