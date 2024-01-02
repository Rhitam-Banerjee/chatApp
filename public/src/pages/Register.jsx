import { Link, useNavigate } from "react-router-dom";
import { blobBg, loader, logoWhite } from "../assets";
import { registerFormVariables } from "../constants";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/API_routes";
import { ButtonContainer } from "../components";
const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // toastify dialogue box settings
  const toastPreference = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // assignes changed values to created variables
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // validates variables to required rules
  const handleValidation = () => {
    const { username, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password should be same.",
        toastPreference
      );
      return false;
    } else if (username.trim().length < 3) {
      toast.error("Username should be atleast 3 characters", toastPreference);
      return false;
    } else if (password.trim().length < 8) {
      toast.error("Password should be atleast 8 characters", toastPreference);
      return false;
    }
    return true;
  };
  // runs only when rules are checked out
  // sends data consisting of variables to api route
  // if there is error displays else saves the values as new user in DB and localStorage
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastPreference);
      }
      if (data.status === true) {
        localStorage.setItem("conext-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("conext-user")) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    setIsLoading(false);
  });
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
        <>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/4 min-w-[300px] max-w-sm flex flex-col gap-4 justify-around items-center text-primary p-10 shadow-lg bg-highlight_transparent backdrop-blur-sm"
          >
            <div className="mb-4">
              <img src={logoWhite} alt="Logo" className="w-[200px]" />
            </div>
            {registerFormVariables.map((inp) => {
              const { name, placeHolder, type } = inp;
              return (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeHolder}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-4 py-2 text-center outline-none backdrop-blur-sm transition-all shadow-custom_1 text-white bg-transparent focus:text-highlight focus:bg-primary"
                />
              );
            })}
            <ButtonContainer text="Create User" type="submit" />
            <span className="text-center">
              Already have an account ?
              <Link to="/login" className="text-highlight2 ml-2">
                Login
              </Link>
            </span>
          </form>
          <ToastContainer />
        </>
      )}
    </section>
  );
};

export default Register;
