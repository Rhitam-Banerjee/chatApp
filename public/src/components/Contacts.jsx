import { useEffect, useState } from "react";
import { logoWhite } from "../assets";

/* eslint-disable react/prop-types */
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isMobile, setIsMobile] = useState(false);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  return (
    <>
      {currentUsername && currentUserImage && (
        <section className="grid grid-rows-[10%_75%_15%] overflow-hidden text-primary">
          <div className="flex items-center justify-center gap-4 p-12 sm:p-3">
            <img src={logoWhite} alt="logo" />
          </div>
          <div className="mt-12 flex flex-col items-center overflow-auto gap-3 scrollbar">
            {contacts.map((contact, index) => {
              const { username, avatarImage } = contact;
              return (
                <div
                  key={index}
                  className={`${
                    index === currentSelected ? "bg-highlight" : ""
                  } p-4 w-full flex sm:grid items-center sm:place-items-center hover:bg-highlight min-h-[5rem] cursor-pointer gap-4`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="w-max">
                    <img
                      className="h-12 sm:h-8"
                      src={`data:image/svg+xml;base64,${avatarImage}`}
                      alt=""
                    />
                  </div>
                  {!isMobile && (
                    <div>
                      <h3>{username}</h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="p-4 flex sm:block items-center gap-8 bg-highlight_transparent backdrop-blur-lg">
            <div className="">
              <img
                className="h-16 sm:h-12"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="profile image"
              />
            </div>
            <div>{!isMobile && <h3>{currentUsername}</h3>}</div>
          </div>
        </section>
      )}
      {/* <h1>{currentUsername}</h1>
      <img
        src={`data:image/svg+xml;base64,${currentUserImage}`}
        alt="user profile"
      /> */}
    </>
  );
};

export default Contacts;
