import { useEffect, useState } from "react";
import { logoWhite } from "../assets";

/* eslint-disable react/prop-types */
const Contacts = ({ contacts, currentUser }) => {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  // const changeCurrentChat = (index, contact) => {};
  return (
    <>
      {currentUsername && currentUserImage && (
        <section className="relative text-white">
          <div className="p-10">
            <img src={logoWhite} alt="logo" />
          </div>
          <div className="p-6">
            {contacts.map((contact, index) => {
              const { username, avatarImage } = contact;
              return (
                <div
                  key={index}
                  className={`${
                    index === currentSelected ? "" : ""
                  } flex items-center justify-center`}
                >
                  <div
                    className="bg-highlight2 mr-5"
                    style={{ clipPath: "circle(50%)" }}
                  >
                    <img
                      className="w-[60px]"
                      src={`data:image/svg+xml;base64,${avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3>{username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 p-6 w-full flex items-center justify-center bg-highlight">
            <div
              className="bg-highlight2 mr-5"
              style={{ clipPath: "circle(50%)" }}
            >
              <img
                className="w-[60px]"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="profile image"
              />
            </div>
            <div>
              <h3>{currentUsername}</h3>
            </div>
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
