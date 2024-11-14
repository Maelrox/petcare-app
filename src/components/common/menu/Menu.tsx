import React, { useState } from 'react';
import { menuItems } from './MenuItems';
import usePermission from '../../../hooks/modules/usePermission';

const Menu: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { hasAnyActionInModule } = usePermission();

  return (
    <div id="menu-container" className="bg-white overflow-hidden">
      <div 
        id="menu-content" 
        className={`flex justify-between items-center p-0 sm:p-0 ${!isMenuVisible ? 'hidden' : ''}`}
      >
        <nav className="flex-1 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4 item mt-4 sm:mt-0 items-center text-center">
            {menuItems.map((item, index) => (
              hasAnyActionInModule(item.roleAccesibles) && (
                <a
                  key={index}
                  href={item.path}
                  className="flex items-center text-gray-600 hover:bg-slate-100 px-2 md:px-4 py-3 rounded-lg transition-colors"
                >
                  <img src={item.icon.src} alt={item.name} className="w-12 h-12 mr-2" />
                  <span className="text-xs md:text-sm font-semibold">{item.name}</span>
                </a>
              )
            ))}
          </div>
        </nav>
      </div>
      <button 
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        className="w-full text-xs text-white bg-rose-500 py-0 focus:outline-none"
      >
        <span>{isMenuVisible ? '▲' : '▼'}</span>
      </button>
    </div>
  );
};

export default Menu;