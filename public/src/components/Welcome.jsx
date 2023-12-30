import { welcome } from "../assets";

/* eslint-disable react/prop-types */
const Welcome = ({ currentUser }) => {
  const { username } = currentUser;
  return (
    <div className="bg-highlight flex flex-col items-center justify-center p-4">
      <div className="relative w-full h-full">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={welcome}
          alt="welcome GIF"
        />
        <h1 className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          Hello, <span className="text-highlight2">{username}</span> !!!
        </h1>
      </div>
      <div className="mb-8 text-secondary_transparent">
        <p className="font-bold text-sm">Select a Contact to start Messaging</p>
      </div>
    </div>
  );
};

export default Welcome;
