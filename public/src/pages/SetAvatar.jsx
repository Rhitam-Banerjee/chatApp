import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { loader } from "../assets";
import { setAvatarRoute } from "../utils/API_routes";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
const SetAvatar = () => {
  const api = `https://api.dicebear.com/7.x/avataaars/svg`;
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastPreference = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {};
  useEffect(() => {
    const runFunc = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const img = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(img.data);
        data.push(buffer.toString("base64"));
      }
      console.log(data);
      setAvatar(data);
      setIsLoading(false);
    };
    runFunc();
  }, []);
  return (
    <section>
      <div className="">
        <h1>Pick an Avatar</h1>
      </div>
      <div className="">
        {avatars.map((avatar, index) => {
          return (
            <div key={index}>
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => {
                  setSelectedAvatar(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </section>
  );
};

export default SetAvatar;
