import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-violet-300 md:bg-green-500 md:border-2 border-green-500 md:mx-3 p-1 md:p-2 rounded-xl text-black"
          : "md:mx-3 p-1"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
