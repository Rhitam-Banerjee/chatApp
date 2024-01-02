import { Link } from "react-router-dom";
import { blobBg } from "../assets";

const PageNotFound = () => {
  return (
    <section
      className="absolute top-0 left-0 h-full w-full flex flex-col justify-center gap-4
  items-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${blobBg})`,
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 
        h-1/2 flex flex-col gap-4 justify-around items-center text-primary
         p-10 min-w-[300px] max-w-[400px] shadow-lg bg-highlight_transparent backdrop-blur-sm"
      >
        <h1>404 Page Not Found</h1>
        <Link to={"/"} className="text-highlight2">
          Nevigate Back
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
