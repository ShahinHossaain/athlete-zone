const Button = ({ children }) => {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-[#46458C] to-[#99DBF5] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
    >
      {children}
    </button>
  );
};

export default Button;
