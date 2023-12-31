import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
const ChatInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [totalMessage, setTotalMessage] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObj, event) => {
    console.log(emojiObj);
    let message = totalMessage;
    message += emojiObj.emoji;
    setTotalMessage(message);
  };
  const sendChat = (event) => {
    event.preventDefault();
  };
  return (
    <section className="grid grid-cols-[5%_95%] items-center px-8 pb-6 gap-4">
      <div className="flex items-center text-primary gap-4">
        <div className="relative">
          <BsEmojiSmileFill
            className="cursor-pointer"
            onClick={handleEmojiPicker}
          />
          {showEmojiPicker && (
            <Picker
              className="!absolute -top-[480px]"
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
      <form
        onSubmit={() => sendChat(event)}
        className="w-full p-2 bg-transparent shadow-custom_1 flex flex-row justify-between items-center gap-4"
      >
        <input
          type="text"
          placeholder="Type your message here"
          className="w-[90%] bg-transparent outline-none border-none pl-4 text-tertiary"
          value={totalMessage}
          onChange={(e) => setTotalMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-4 flex justify-center items-center drop-shadow-custom_3_red text-[2rem] text-highlight2"
        >
          <IoMdSend />
        </button>
      </form>
    </section>
  );
};

export default ChatInput;
