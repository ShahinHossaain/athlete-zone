import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import ActiveLink from "../../Component/ActiveLink/ActiveLink";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { MdNightlight } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { Slide } from "react-awesome-reveal";

const Navbar = () => {
  const { user, auth, role, isNight, setIsNight } = useContext(AuthContext);

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
    <div className="">
      <Container>
        <nav
          className={
            isNight
              ? "bg-black text-[#FFEAD2] px-5 mb-5 rounded-b-xl navv"
              : "bg-[#ACB1D6] text-[#FFEAD2] px-5 mb-5 rounded-xl navv"
          }
        >
          <div className="flex w-full items-center justify-between  py-4">
            <div className="text-lg w-1/2 md:w-auto md:text-xl   font-bold md:mb-0">
              <p className="bg-[#8294C4] p-3 rounded-xl navv text-center font-font4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#99DBF5] to-[#A7ECEE]">
                Athlete Zone
              </p>
            </div>
            <Slide direction="right">
              <div className="relative w-full z-10 flex justify-end md:items-center md:w-auto">
                {/* for small device  */}
                <ul
                  className={` ${
                    isOpen ? " animate-leftToRight" : "  animate-rightToLeft"
                  }   md:hidden absolute right-10 bg-[#8294C4] navv rounded-xl p-5 w-1/2 text-white flex-col`}
                >
                  <li className="my-2">
                    <ActiveLink to="/">Home</ActiveLink>
                  </li>
                  <li className="my-2">
                    <ActiveLink to="/instructors">Instructors</ActiveLink>
                  </li>
                  <li className="my-2">
                    <ActiveLink to="/classes">Classes</ActiveLink>
                  </li>
                  {user && (
                    <li className="my-2">
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
                      <div onClick={handleSignOut}>
                        <Button> sign Out</Button>
                      </div>
                    ) : (
                      <ActiveLink to="/login">Login</ActiveLink>
                    )}
                  </li>
                </ul>

                {/* for medium device or greater than that  */}

                <ul className="hidden  bg-[#8294C4] md:flex items-center space-x-5 px-2 rounded-xl navv">
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
                    <div onClick={() => setIsNight((p) => !p)}>
                      {" "}
                      {isNight ? (
                        <BsSun size={25}></BsSun>
                      ) : (
                        <MdNightlight size={25}></MdNightlight>
                      )}
                    </div>
                  </li>

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
                  <li className="my-auto">
                    {user ? (
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="text-white bg-gradient-to-br from-[#46458C] to-[#99DBF5] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
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
            </Slide>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
