import { Link, useNavigate } from "react-router-dom";
import { blobBg, loader, logoWhite } from "../assets";
import { loginFormVariables } from "../constants";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/API_routes";
import { ButtonContainer } from "../components";
const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    username: "",
    password: "",
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
    const { username, password } = values;
    if (username.trim().length === 0) {
      toast.error("Username should not me empty", toastPreference);
      return false;
    } else if (password.trim() === "") {
      toast.error("Password should not be empty", toastPreference);
      return false;
    }
    return true;
  };
  // runs only when rules are checked out
  // sends data consisting of variables to api route
  // if there is error, displays else saves the values as new user to local Storage
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastPreference);
      }
      if (data.status === true) {
        localStorage.setItem("conext-user", JSON.stringify(data.user));
        navigate("/");
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
  }, []);
  return (
    <section
      className="absolute top-0 left-0 h-full w-full flex flex-col justify-center gap-4
      items-center bg-no-repeat bg-cover bg-center"
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 
        h-1/2 max-w-sm flex flex-col gap-4 justify-around items-center text-primary
         p-10 min-w-min shadow-lg bg-highlight_transparent backdrop-blur-sm"
          >
            <div className="mb-4">
              <img src={logoWhite} alt="Logo" className="max-w-xs" />
            </div>
            {loginFormVariables.map((inp) => {
              const { name, placeHolder, type } = inp;
              return (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeHolder}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-4 py-2 text-center outline-none backdrop-blur-sm transition-all shadow-custom_1 text-secondary bg-transparent focus:text-highlight 
              focus:bg-primary"
                />
              );
            })}
            <ButtonContainer text="Login" type="submit" />
            <span>
              Don&apos;t have an account ?
              <Link to="/register" className="text-highlight2 ml-2">
                Register
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
