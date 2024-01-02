import { useEffect, useRef, useState } from "react";
import { blobBg, loader } from "../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoutes, host } from "../utils/API_routes";
import { ChatContainer, Contacts, Welcome } from "../components";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    const runFunc = async () => {
      if (!localStorage.getItem("conext-user")) navigate("/login");
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem("conext-user")));
      }
    };
    runFunc();
  }, []);
  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            `${allUserRoutes}/${currentUser._id}`
          );
          setContacts(data);
          setIsLoading(false);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getContacts();
  }, [currentUser]);
  return (
    <section
      className="absolute top-0 left-0 h-full w-full flex flex-col justify-center gap-4 items-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${blobBg})`,
      }}
    >
      {isLoading ? (
        <img src={loader} alt="loader" />
      ) : (
        <div className="grid lg:grid-cols-[25%_75%] sm:grid-cols-[minmax(20px,_15%)_minmax(auto,_85%)] grid-cols-[35%_65%] w-[90vw] h-[90vh] bg-highlight_transparent backdrop-blur-lg">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Chat;
