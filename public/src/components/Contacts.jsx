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
  const changeCurrentChat = (index, contact) => {};
  return (
    <>
      {currentUsername && currentUserImage && (
        <section className="p-10">
          <div className="">
            <img src={logoWhite} alt="logo" />
          </div>
          <div>
            {contacts.map((contact, index) => {
              const { username, avatarImage } = contact;
              return (
                <div
                  key={index}
                  className={`${index === currentSelected ? "" : ""}`}
                >
                  <div>
                    <img
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
