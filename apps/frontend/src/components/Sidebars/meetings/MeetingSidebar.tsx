import {
  PlusCircleOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const MeetingSidebar = ({ onContactClick }: any) => {
  const contacts = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      messageCount: 3,
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: "Let's catch up later.",
      messageCount: 1,
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      name: 'Fake Contact',
      lastMessage: 'This is a fake contact.',
      messageCount: 0,
      imageUrl: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <div className="flex flex-col h-[50vh] sm:h-[50vh] lg:h-[50vh] w-64 sm:w-2/3 md:w-72 bg-white dark:bg-gray-800 shadow-xl rounded-t-lg mt-4">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h1 className="text-sm sm:text-md font-semibold dark:text-white">
          Calls
        </h1>
        <div className="flex items-center">
          <PlusCircleOutlined className="text-sm sm:text-md dark:text-white" />
          <h1 className="ml-2 text-sm sm:text-md font-semibold dark:text-white">
            New Meet
          </h1>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 p-2 space-y-2 overflow-auto">
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            onClick={onContactClick}
            className={`flex items-start bg-gray-100 dark:bg-gray-700 rounded-lg p-2 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${index > 0 ? 'mt-2' : ''}`}
          >
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              src={contact.imageUrl}
              alt={contact.name}
            />
            <div className="ml-2 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xs sm:text-sm dark:text-white">
                  {contact.name}
                </span>
                <div className="flex space-x-2 text-gray-600 dark:text-gray-400">
                  <PhoneOutlined className="text-xs sm:text-sm cursor-pointer" />
                  <VideoCameraOutlined className="text-xs sm:text-sm cursor-pointer" />
                </div>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                koki
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSidebar;
