import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMessage }) => {
  return (
    <section className="grid grid-cols-[5%_95%] items-center px-8 pb-1">
      <div className="flex items-center text-primary gap-4">
        <div className="relative">
          <BsEmojiSmileFill />
        </div>
      </div>
      <form action="" className="w-full bg-tertiary p-4">
        <input
          className="w-[80%]"
          type="text"
          placeholder="Type your message here"
        />
        <button type="submit" className="ml-4 scale-[2] text-highlight">
          <IoMdSend />
        </button>
      </form>
    </section>
  );
};

export default ChatInput;
