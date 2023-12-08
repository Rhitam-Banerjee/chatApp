import { Link } from "react-router-dom";
import { logoWhite } from "../assets";
import { registerFormVariables } from "../constants";
const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form Submit");
  };
  const handleChange = (event) => {
    return event;
  };
  return (
    <section className="absolute top-0 left-0 h-full w-full flex flex-col justify-center gap-4 items-center bg-tertiary">
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 bg-secondary"
      >
        <div className="">
          <img src={logoWhite} alt="Logo" />
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
              className="outline-none bg-white focus:bg-secondary"
            />
          );
        })}
        <button type="submit">Create User</button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
    </section>
  );
};

export default Register;
