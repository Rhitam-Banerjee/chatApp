import { welcome } from "../assets";

/* eslint-disable react/prop-types */
const Welcome = ({ currentUser }) => {
  const { username } = currentUser;
  return (
    <div className="bg-highlight">
      <div className="relative w-full h-full">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={welcome}
          alt="welcome GIF"
        />
        <h1 className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          Hello, {username}!!!
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
