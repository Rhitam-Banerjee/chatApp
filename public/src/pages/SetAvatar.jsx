import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { logoWhite } from "../assets";
import { setAvatarRoute } from "../utils/API_routes";
import axios from "axios";
import { Buffer } from "buffer";
import { blobBg, loader } from "../assets";
import { ButtonContainer } from "../components";
const SetAvatar = () => {
  const api = `https://api.dicebear.com/7.x/adventurer/svg`;
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
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined)
      toast.error("Please select an avatar", toastPreference);
    else {
      const user = await JSON.parse(localStorage.getItem("conext-user"));
      console.log("works1");
      console.log(user);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("conext-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastPreference);
      }
    }
  };

  const runFunc = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const img = await axios.get(
        `${api}/seed=${Math.round(Math.random() * 100)}`
      );
      const buffer = new Buffer(img.data);
      data.push(buffer.toString("base64"));
    }
    setAvatar(data);
    setIsLoading(false);
  };
  useEffect(() => {
    runFunc();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("conext-user")) navigate("/login");
  }, []);
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${blobBg})`,
        }}
        className="absolute top-0 left-0 h-full w-full flex flex-col justify-center gap-4 items-center bg-no-repeat bg-cover bg-center"
      >
        {isLoading ? (
          <img src={loader} alt="loader" />
        ) : (
          <>
            <div className="p-10 flex flex-col sm:justify-center justify-evenly items-center bg-highlight_transparent backdrop-blur-lg lg:h-3/4 w-3/4 max-w-[700px]">
              <div className="mb-4">
                <img src={logoWhite} alt="Logo" className="max-w-xs" />
              </div>
              <div className="text-primary font-black">
                <h1>Pick an Avatar</h1>
              </div>
              <div className="flex flex-row sm:flex-col items-center justify-center">
                {avatars.map((avatar, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        selectedAvatar === index ? "bg-white" : ""
                      }`}
                      style={{ clipPath: "circle(50%)" }}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        className="m-2 w-[80px] bg-highlight2 cursor-pointer"
                        style={{ clipPath: "circle(50%)" }}
                        onClick={() => {
                          setSelectedAvatar(index);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <ButtonContainer text="Refresh Avatar" functionName={runFunc} />
                <ButtonContainer
                  text="Set Avatar"
                  functionName={setProfilePicture}
                />
              </div>
            </div>
            <ToastContainer />
          </>
        )}
      </section>
    </>
  );
};

export default SetAvatar;
