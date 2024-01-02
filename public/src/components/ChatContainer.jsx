/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { getMessages, sendMessages } from "../utils/API_routes";
import { ChatInput, Logout } from "./";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const { _id, username, avatarImage } = currentChat;
  const [messages, setMessages] = useState([]);
  const [arivalMessage, setArivalMessage] = useState(null);
  const scrollRef = useRef();
  const handleSendMessage = async (msg) => {
    await axios.post(sendMessages, {
      from: currentUser._id,
      to: _id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: _id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  const runFunc = async () => {
    if (currentChat) {
      const response = await axios.post(getMessages, {
        from: currentUser._id,
        to: _id,
      });
      setMessages(response.data);
    }
  };
  useEffect(() => {
    runFunc();
  }, [currentChat]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log({ msg });
        setArivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, []);
  useEffect(() => {
    arivalMessage && setMessages((prev) => [...prev, arivalMessage]);
  }, [arivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <section className="bg-highlight flex flex-col justify-between h-full overflow-hidden">
      <div className="px-8 py-2 sm:px-2 text-primary flex flex-row items-center justify-between shadow-custom_2">
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
      <div className="h-[80%] py-2 overflow-y-auto message-scroll">
        {messages.map((message) => {
          const { fromSelf } = message;
          return (
            <div
              ref={scrollRef}
              key={uuidv4()}
              className="lg:px-8 px-4 py-1 sm:px-2 flex flex-col gap-4 overflow-auto"
            >
              <div
                className={`relative flex items-center ${
                  fromSelf ? "justify-end sent" : "justify-start recieved"
                }`}
              >
                <div className="m-w-[40%] break-words lg:p-4 p-2 rounded-sm text-primary sm:text-[0.7rem] bg-highlight2">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </section>
  );
};

export default ChatContainer;
