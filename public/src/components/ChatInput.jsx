/* eslint-disable react/prop-types */
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { createRef, useState } from "react";
const ChatInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [totalMessage, setTotalMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const inputRef = createRef();
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObj) => {
    const ref = inputRef.current;
    ref.focus();
    const start = totalMessage.substring(0, ref.selectionStart);
    const end = totalMessage.substring(ref.selectionStart);
    const message = start + emojiObj.emoji + end;
    setTotalMessage(message);
    setCursorPosition(start.length + emojiObj.emoji.length);
    // let message = totalMessage;
    // message += emojiObj.emoji;
    // setTotalMessage(message);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (totalMessage.length > 0) {
      handleSendMessage(totalMessage);
      setTotalMessage("");
    }
  };
  return (
    <section className="grid grid-cols-[5%_95%] items-center px-8 pb-6 sm:px-4 sm:pl-2 gap-4 sm:gap-3">
      <div className="flex items-center text-primary">
        <div className="relative">
          <BsEmojiSmileFill
            className="cursor-pointer text-yellow-500"
            onClick={handleEmojiPicker}
          />
          {showEmojiPicker && (
            <Picker
              className="!absolute -top-[480px] sm:-top-[400px] sm:!left-[calc(50%_+_105px)] sm:!-translate-x-1/2 sm:!w-[300px] sm:scale-75 sm:!max-w-xs !bg-highlight_transparent !backdrop-blur-md !border-none shadow-custom_1"
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
      <form
        onSubmit={(e) => sendChat(e)}
        className="w-full p-2 bg-transparent shadow-custom_1 flex flex-row justify-between items-center gap-4"
      >
        <input
          type="text"
          placeholder="Type your message here"
          className="w-[90%] bg-transparent outline-none border-none pl-4 sm:pl-2 text-tertiary sm:text-[0.8rem]"
          value={totalMessage}
          ref={inputRef}
          onChange={(e) => setTotalMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-4 flex justify-center items-center drop-shadow-custom_3_red text-[2rem] sm:text-[0.8rem] text-highlight2"
        >
          <IoMdSend />
        </button>
      </form>
    </section>
  );
};

export default ChatInput;
