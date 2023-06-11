import { Outlet } from "react-router-dom";
import ActiveLink from "../../Component/ActiveLink/ActiveLink";
import { SiGoogleclassroom, SiTrainerroad } from "react-icons/si";
import { FaHistory, FaUserCheck, FaUsers } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const DashBoard = () => {
  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";
  console.log("isAdmin", isAdmin);
  const isStudent = role === "student";
  console.log("isStudent", isStudent);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        {isAdmin ? (
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <ActiveLink to="/dashboard/manageClasses">
                <SiGoogleclassroom /> Manage Classes{" "}
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/manageUser">
                <FaUsers /> Manage User
              </ActiveLink>
            </li>

            <div className="divider"></div>
            <li>
              <ActiveLink to="/">
                <FaHome /> Home
              </ActiveLink>
            </li>
          </ul>
        ) : isStudent ? (
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <ActiveLink to="/dashboard/a">
                <SiGoogleclassroom /> My Selected Classes
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/enrolled">
                <FaUserCheck />
                Enrolled
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/history">
                <FaHistory /> History
              </ActiveLink>
            </li>
            <div className="divider"></div>
            <li>
              <ActiveLink to="/">
                <FaHome /> Home
              </ActiveLink>
            </li>
          </ul>
        ) : (
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <ActiveLink to="/dashboard/addClass">
                <SiTrainerroad />
                Add Class
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/myClasses">
                <SiGoogleclassroom />
                MY Classes
              </ActiveLink>
            </li>

            <div className="divider"></div>
            <li>
              <ActiveLink to="/">
                <FaHome /> Home
              </ActiveLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
