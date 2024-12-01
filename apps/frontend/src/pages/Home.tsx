import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from '../components/Sidebars/Sidebar';
import { useState } from 'react';
import ContactSidebar from '../components/Sidebars/contacts/ContactSidebar';
import MeetingSidebar from '../components/Sidebars/meetings/MeetingSidebar';
import ChatComponent from '../components/Chat/ChatComponent';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarsVisible, setSidebarsVisible] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleContactClick = () => {
    setSidebarsVisible(false);
    setChatVisible(true);
  };

  const handleHomeClick = () => {
    setSidebarsVisible(true);
    setChatVisible(false);
  };

  return (
    <div className={`flex ${darkMode ? 'dark' : ''} h-screen`}>
      <div className="flex-none w-9">
        <Sidebar
          toggleDarkMode={toggleDarkMode}
          onHomeClick={handleHomeClick}
        />
      </div>
      {sidebarsVisible && (
        <div className=" flex flex-col ml-16">
          <ContactSidebar onContactClick={handleContactClick} />
          <MeetingSidebar onContactClick={handleContactClick} />
        </div>
      )}
      {/* <div className={`flex-1 ${chatVisible ? 'block' : 'hidden'} `}> */}
      <ChatComponent />
      {/* </div> */}
    </div>
  );
};

export default Home;
