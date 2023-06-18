import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { TiInputCheckedOutline, TiInfo } from "react-icons/ti";
import { TiInfo } from "react-icons/ti";
import { FaGoogle } from "react-icons/fa";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import backgroundImage from "../assets/rainbow-vortex.svg";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import { saveUser } from "../../api/auth";

// import backgroundImage1 from "../assets/page-turner.svg";

function Login() {
  const [error, setError] = useState("");
  const { signInUser, auth } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log("++++", location?.state?.pathname);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);

    signInUser(email, password)
      .then((result) => {
        // setUser(result.user);
        // console.log(result);
        const loggedUser = {
          email: result.user.email,
        };
        console.log(loggedUser);

        // fetch("http://localhost:3000/jwt", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(loggedUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log("jwt response", data);
        //     localStorage.setItem("toy-token", data.token);
        //   });

        setError("");
        navigate(location?.state?.pathname || "/", { replace: true });
      })
      .catch((err) =>
        setError(
          err.message
            .slice(22, err.message.length - 2)
            .split("-")
            .join(" ")
        )
      );
  };

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        saveUser(result.user);
        navigate(location?.state?.pathname || "/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col-reverse  md:flex-row-reverse justify-center items-center bg-cover">
      <Helmet>
        <title>Athlete Zone | Login</title>
      </Helmet>
      <div>
        <img
          src="https://iconscout.com/lottie/login-security-7546636"
          alt=""
          className="h-1/3 p-16"
        />
      </div>
      <form
        className="w-full h-2/3 max-w-lg mt-10 md:ml-20 card shadow-lg bg-gray-700 hover:bg-gray-600 px-12 pb-10 pt-6 text-black mb-24"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-5xl text-secondary font-font1 font-bold mb-4">
          Log In
        </p>
        <div className="mb-4">
          <label
            className="block text-secondary font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-secondary font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            className="absolute right-0 top-7 mt-3 mr-4"
            type="button"
            onClick={handlePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <AwesomeButton size="medium"> Sign In</AwesomeButton>
        </div>
        <p className="text-secondary">
          Not have an account{" "}
          <Link
            to="/register"
            state={location.state}
            className="text-blue-500 underline"
          >
            Register
          </Link>{" "}
          now
        </p>
        {error && (
          <p className="flex gap-2 items-center mt-3 text-red-500  text-sm uppercase">
            <TiInfo className="text-xl"></TiInfo>
            {error}
          </p>
        )}
        <div className="flex mt-4">
          <button
            onClick={handleGoogleSingIn}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary to-secondary group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              <div className="flex items-center gap-2">
                <FaGoogle /> Login with google
              </div>
            </span>
          </button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default Login;
