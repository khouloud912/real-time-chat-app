import Sidebar from '../components/common/Sidebar.tsx';
import { useState } from 'react';
import ContactSidebar from '../components/sidebars/contacts/ContactSidebar';
import MeetingSidebar from '../components/sidebars/meetings/MeetingSidebar';
import ChatComponent from '../components/chat/ChatComponent';
import {SelectedChatProvider} from "../contexts/selectedChatContext.tsx";

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
      <SelectedChatProvider>
    <div className={`flex ${darkMode ? 'dark' : ''} h-screen`}>
      <div className="flex-none w-9">
        <Sidebar
          toggleDarkMode={toggleDarkMode}
          onHomeClick={handleHomeClick}
        />
      </div>
      {sidebarsVisible && (
        <div className=" flex flex-col ml-16">
          <ContactSidebar  />
          <MeetingSidebar  />
        </div>
      )}
      {/* <div className={`flex-1 ${chatVisible ? 'block' : 'hidden'} `}> */}
      <ChatComponent />
      {/* </div> */}
    </div>
      </SelectedChatProvider>
  );
};

export default Home;
