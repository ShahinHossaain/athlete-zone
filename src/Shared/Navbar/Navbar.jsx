import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import ActiveLink from "../../Component/ActiveLink/ActiveLink";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import Container from "../Container/Container";

const Navbar = () => {
  const { user, auth, role } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setIsOpen(false);
    };

    // Add listener for media query
    mediaQuery.addListener(handleResize);

    // Remove listener on component unmount
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <nav className="bg-gray-100">
        <Container>
          <div className="flex w-full items-center justify-between  py-4">
            <div className=" text-xl font-bold mb-4 md:mb-0">Athlete Zone</div>

            <div className="relative w-full z-10 flex justify-end md:items-center md:w-auto">
              {/* for small device  */}
              <ul
                className={` ${
                  isOpen ? " animate-leftToRight" : "  animate-rightToLeft"
                }   md:hidden absolute right-10 bg-orange-800 rounded-xl p-5 text-white flex-col`}
              >
                <li>
                  <ActiveLink to="/">Home</ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/instructors">Instructors</ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/classes">Classes</ActiveLink>
                </li>
                {user && (
                  <li>
                    <ActiveLink to="/dashboard">Dashboard</ActiveLink>
                  </li>
                )}

                <li>
                  <img
                    className="w-11 h-11 my-2 rounded-full"
                    src={
                      user
                        ? user.photoURL
                        : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    }
                    alt=""
                  />
                </li>

                <li>
                  {user ? (
                    <button className="btn" onClick={handleSignOut}>
                      sign out
                    </button>
                  ) : (
                    <ActiveLink to="/login">Login</ActiveLink>
                  )}
                </li>
              </ul>

              {/* for medium device or greater than that  */}

              <ul className="hidden md:flex items-center space-x-5">
                <li>
                  <ActiveLink to="/">Home</ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/instructors">Instructors</ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/classes">Classes</ActiveLink>
                </li>
                {user && (
                  <li>
                    <ActiveLink
                      to={
                        role === "admin"
                          ? "/dashboard/manageClasses"
                          : role === "instructor"
                          ? "/dashboard/addClass"
                          : "/dashboard/a"
                      }
                    >
                      Dashboard
                    </ActiveLink>
                  </li>
                )}

                <li>
                  <img
                    className="w-11 h-11 my-2 rounded-full"
                    src={
                      user
                        ? user.photoURL
                        : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    }
                    alt=""
                  />
                </li>
                <li>
                  {user ? (
                    <button className="btn" onClick={handleSignOut}>
                      sign out
                    </button>
                  ) : (
                    <ActiveLink to="/login">Login</ActiveLink>
                  )}
                </li>
              </ul>

              <div className="md:hidden">
                <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
