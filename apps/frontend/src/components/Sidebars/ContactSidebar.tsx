import { SearchOutlined } from '@ant-design/icons';

const ContactSidebar = ({ onContactClick }: any) => {
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
    <>
      <div className=" flex flex-col h-[50vh] sm:h-[50vh] lg:h-[50vh] w-64 sm:w-2/3 md:w-72 bg-white dark:bg-gray-800 shadow-xl rounded-b-lg">
        <div className="relative mt-3 px-4">
          <input
            type="search"
            id="default-search"
            className="block w-full h-7 py-2 pl-9 pr-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
          />
          <SearchOutlined className="absolute top-1/2 transform -translate-y-1/2 left-7 text-gray-400 dark:text-gray-300" />
        </div>

        <div className="flex justify-around items-center mt-4 mx-auto p-2 w-56 h-8 border-b dark:border-gray-700 rounded-full bg-gray-100 dark:bg-gray-700">
          <button className="px-2 py-1 text-xs sm:text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white">
            All chats
          </button>
          <button className="px-2 py-1 text-xs sm:text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white">
            Groups
          </button>
          <button className="px-2 py-1 text-xs sm:text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white">
            Contacts
          </button>
        </div>

        <div className="flex-1 flex flex-col p-2 space-y-2 overflow-auto">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              onClick={onContactClick}
              className={`flex items-start bg-gray-100 dark:bg-gray-700 rounded-lg p-2 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${index !== 0 ? 'mt-2' : ''}`}
            >
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={contact.imageUrl}
                alt={contact.name}
              />
              <div className="ml-2 flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-xs sm:text-sm dark:text-white">
                    {contact.name}
                  </span>
                  {contact.messageCount > 0 && (
                    <span className="ml-4 bg-green-500 text-white text-xs sm:text-sm rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                      {contact.messageCount}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-left">
                  {contact.lastMessage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactSidebar;
