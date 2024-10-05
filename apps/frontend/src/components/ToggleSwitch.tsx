import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const ToggleSwitch = ({ darkMode, onToggle }: any) => {
  return (
    <div className="flex flex-row items-center rotate-90 justify-center">
      <button
        className={`relative inline-flex flex-shrink-0 h-6 w-12 mx-2 transition-colors duration-200 ease-in-out rounded-full p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-400'}`}
        onClick={onToggle}
        aria-pressed={darkMode}
        role="switch"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}
        />
        {darkMode ? (
          <MoonOutlined className="text-yellow-400 absolute left-1" />
        ) : (
          <SunOutlined className="text-yellow-400 absolute right-1" />
        )}
      </button>
    </div>
  );
};

export default ToggleSwitch;
