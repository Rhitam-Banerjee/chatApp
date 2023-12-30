/* eslint-disable react/prop-types */
import { ChatInput, Logout, Messages } from "./";

const ChatContainer = ({ currentChat }) => {
  const { username, avatarImage } = currentChat;
  const handleSendMessage = async (msg) => {};
  return (
    <section className="bg-highlight">
      <div className="flex flex-col justify-center h-full">
        <div className="px-8 py-2 min-h-[92px] sm:min-h-[30px] text-primary flex flex-row items-center justify-between shadow-custom_2">
          <div className="flex flex-row items-center justify-center">
            <div className="mr-4 sm:hidden">
              <img
                className="h-16"
                src={`data:image/svg+xml;base64,${avatarImage}`}
                alt=""
              />
            </div>
            <h1 className="sm:text-[0.8rem]">{username}</h1>
          </div>
          <Logout />
        </div>
        <Messages />
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </section>
  );
};

export default ChatContainer;
