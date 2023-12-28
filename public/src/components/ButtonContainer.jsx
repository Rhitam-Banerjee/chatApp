/* eslint-disable react/prop-types */
const ButtonContainer = ({ text, type, functionName }) => {
  return (
    <button
      type={type}
      className={`relative mt-10 px-6 py-2 text-highlight bg-primary shadow-custom_1
          hover:text-primary hover:bg-transparent
          before:-z-50 before:content-[''] before:text-highlight2 before:absolute 
          before:top-0 before:left-0 before:w-full before:h-0
          before:bg-highlight before:transition-all duration-2000 
          hover:before:h-full`}
      onClick={() => functionName()}
    >
      {text}
    </button>
  );
};

export default ButtonContainer;
