import { Save, Settings, Share2, Users } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/authContext.tsx';
import { useUser } from '../../contexts/userContext.tsx';
import ToggleSwitch from '../ToggleSwitch.tsx';

interface SidebarProps {
  toggleDarkMode: () => void;
  onHomeClick: () => void;
}

const Sidebar = ({ toggleDarkMode, onHomeClick }: SidebarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleDarkMode();
  };

  const { logout } = useAuth();
  const { user } = useUser();
  const handleAvatarClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Call your logout method from context
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 translate-x-0 md:max-w-[5rem] max-w-[5rem]">
      <nav className="flex flex-col h-full p-2 text-gray-700 dark:text-white">
        <div className="flex flex-col gap-2">
          {[
            {
              icon: <Users style={{ fontSize: '20px' }} />,
              onClick: onHomeClick,
              label: 'Contacts',
            },
            {
              icon: <Save style={{ fontSize: '20px' }} />,
              label: 'Save',
            },
            {
              icon: <Share2 style={{ fontSize: '20px' }} />,
              label: 'Share',
            },
            {
              icon: <Settings style={{ fontSize: '20px' }} />,
              label: 'Settings',
            },
          ].map((item, index) => (
            <div
              key={index}
              role="button"
              className="flex flex-col items-center p-2 leading-tight transition-all rounded-lg text-center hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 dark:hover:bg-gray-700 dark:hover:bg-opacity-80 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:bg-opacity-80 dark:focus:text-white dark:active:bg-gray-700 dark:active:bg-opacity-80 dark:active:text-white"
              onClick={item.onClick}
            >
              {item.icon}
              <span className="mt-0.5 text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center mt-auto mb-9">
          <ToggleSwitch darkMode={darkMode} onToggle={handleToggleDarkMode} />
        </div>

        {/* Avatar with logout */}
        <div className="relative flex flex-col items-center p-2">
          <img
            src={
              user?.avatarUrl ||
              `https://www.gravatar.com/avatar/${user?.email}?d=identicon`
            }
            alt={user?.displayName}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={handleAvatarClick}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://www.gravatar.com/avatar/?d=mp';
            }}
          />
          {showLogout && (
            <div
              className="absolute left-14 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 border dark:border-gray-600 text-sm rounded shadow px-3 py-1 cursor-pointer z-10 whitespace-nowrap"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
