export const ChatMessage = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex items-start mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            how are you
          </div>
        </div>
      </div>
    </div>
  );
};
