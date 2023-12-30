import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button title="Logout" onClick={() => handleClick()}>
      <BiPowerOff />
    </button>
  );
};

export default Logout;
