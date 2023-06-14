import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { CiBullhorn, CiCircleCheck } from "react-icons/ci";
import { CiBullhorn } from "react-icons/ci";
import { TiInputCheckedOutline, TiInfo } from "react-icons/ti";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { saveUser } from "../../api/auth";

function Register() {
  const { createUser, auth, user, setLoading } = useContext(AuthContext);
  console.log(user);
  console.log("imgagef", import.meta.env.VITE_profile_img);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [confirmPassError, setConfirmPasswordError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [photoURL, setPhotoURL] = useState("");

  const handlePassword = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    if (passwordInput.length < 6)
      setError("Password must be at least 6 character long.");
    else if (!/.*[A-Z].*/.test(passwordInput)) {
      setError("Must have one uppercase.");
    } else if (!/.*[!@#$%^&*()].*/.test(passwordInput)) {
      setError("Must have at least one special character.");
    } else setError("");
  };

  const handleConfirmPassword = (e) => {
    const confirmPasswordInput = e.target.value;
    setConfirmPassword(confirmPasswordInput);

    if (confirmPasswordInput === password) {
      setSuccess("password and confirm password are match");
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("password and confirm password are not match");
      setSuccess("");
    }
  };

  const handleEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailInput
      )
    )
      setEmailError("Please enter a valid email");
    else setEmailError("");
  };

  const usersave = (user, image) => {
    saveUser(user, image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("Password:", photoURL);
    const image = event.target.photoURL.files[0];

    if (password !== confirmPassword) {
      alert("password and confirm password do not match");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    const Url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_profile_img
    }`;
    console.log("Url", Url);
    fetch(Url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          // setPhotoURL(imgData.data.display_url);
          console.log("taatata", imgData.data.display_url);

          // start
          createUser(email, password)
            .then((result) => {
              console.log(result.user);

              updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: imgData.data.display_url,
              });

              usersave(result.user, imgData.data.display_url);
              // saveUser(result.user, imgData.data.display_url);
              navigate(location?.state?.pathname || "/");
            })
            .catch((error) => {
              alert(error);
              console.log("ekhan theke");
            });
          // end
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });

    console.log("paddu", image);

    // TODO: Add logic to submit the form data
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  console.log(password, confirmPassword);

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        saveUser(result.user);
        navigate(location?.state?.pathname || "/", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" flex flex-col-reverse  md:flex-row-reverse justify-center items-center h-1/2 bg-cover">
      <Helmet>
        <title>Joy Full Play Things | Register</title>
      </Helmet>
      <div>
        <img
          src="https://freesvg.org/img/senator-access.png"
          alt=""
          className="h-1/3 p-16"
        />
      </div>
      <form
        className="w-full h-2/3 max-w-lg mt-10  md:ml-20 card shadow-lg bg-base-200 px-12 pb-10 pt-6 text-black"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-5xl font-bold mb-4 text-secondary font-font1">
          Register
        </p>
        <div className="mb-4">
          <label className="block text-secondary font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-secondary font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 mr-5 ${
              emailError ? "border-b-red-500" : "border-b-green-500"
            }`}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            required
          />
          {emailError && (
            <p className="flex items-center gap-2 text-red-500 text-sm">
              <TiInfo className="text-xl"></TiInfo>
              {emailError}
            </p>
          )}
          <button
            className="absolute right-0 top-7 mt-3 mr-3"
            type="button"
            onClick={handlePasswordVisibility}
          >
            {!emailError && (
              <TiInputCheckedOutline
                className="text-green-600 font-bolder"
                size={25}
              ></TiInputCheckedOutline>
            )}
          </button>
        </div>
        {/* password  */}
        <div className="mb-4 relative">
          <label
            className="block text-secondary font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${
              error ? "border-b-red-500" : "border-b-green-500"
            }`}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            required
          />
          {error && (
            <p className="flex items-center gap-2 text-red-500 text-sm">
              <CiBullhorn></CiBullhorn>
              {error}
            </p>
          )}
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

        {/* confirm password  */}

        <div className="mb-4 relative">
          <label
            className="block text-secondary font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10`}
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required
          />
          {confirmPassError && (
            <p className="flex items-center gap-2 text-red-500 text-sm">
              <CiBullhorn></CiBullhorn>
              {confirmPassError}
            </p>
          )}
          {!error && success && (
            <p className="flex items-center gap-2 text-green-700 text-sm">
              <CiBullhorn></CiBullhorn>
              {success}
            </p>
          )}
          <button
            className="absolute right-0 top-7 mt-3 mr-4"
            type="button"
            onClick={() => setShowConfirmPassword((previous) => !previous)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-secondary font-bold mb-2"
            htmlFor="password"
          >
            Photo URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            id="photoURL"
            name="photoURL"
            type="file"
            placeholder="photo URL"
            accept="photoURl/*"
            required
          />
        </div>
        {!error && !emailError && (
          <div className="flex items-center justify-center">
            <AwesomeButton size="medium"> Register</AwesomeButton>
          </div>
        )}
        {(error || emailError) && (
          <div className="flex items-center justify-center">
            <button
              className="bg-primary px-5 py-3 rounded-xl text-white"
              disabled
            >
              Register
            </button>
          </div>
        )}
        <p className="text-secondary">
          Have an account{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>{" "}
          Now...
        </p>

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

export default Register;
