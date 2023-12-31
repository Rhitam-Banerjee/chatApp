import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      title="Logout"
      onClick={() => handleClick()}
      className="text-highlight2 drop-shadow-custom_3_red"
    >
      <BiPowerOff />
    </button>
  );
};

export default Logout;
