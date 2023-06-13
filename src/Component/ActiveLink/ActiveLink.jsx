import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-[#545E9D] text-bold md:border-2 md:mx-3 p-2 md:p-2 rounded-xl text-white cursor-pointer "
          : "md:mx-3 p-2 md:p-2 cursor-pointer"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
