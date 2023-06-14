import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const SinglePopularInstructors = ({ instructor }) => {
  console.log("instructor", instructor);
  const { image, name, email } = instructor;
  const [classes, setClasses] = useState();

  useEffect(() => {
    axios.get(`/classes?email=${email}`).then((res) => setClasses(res.data));
  }, []);

  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/InstructorClasses", { state: { classes } });
  };
  return (
    <div className="flex flex-col md:flex-row h-full md:h-80 items-center justify-around mx-auto gap-1  md:gap-8  w-full rounded-md shadow-md p-4 transition-transform ease-in-out duration-300 bg-[#8294C4] text-[#f7dab9] cardd">
      {/* Left side - chef photo */}
      <div className="md:w-1/2 w-5/6 mt-5 md:mt-0 h-64 md:h-full">
        <img src={image} alt="Chef" className="w-full rounded-md h-full" />
      </div>

      {/* Right side - chef information */}
      <div className="md:w-1/2 px-1 md:px-4 mt-3 md:mt-0">
        <h2 className="text-lg font-bold mb-2">Name : {name}</h2>
        <p className="mb-2">Email: {email}</p>
        {classes && (
          <p className="font-semibold mb-10">
            Number of Classes: {classes.length}
          </p>
        )}
        <div className=" flex justify-start mb-6">
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn">
              <span className="mr-2"> Classes Taken</span>{" "}
              <IoIosArrowDropdownCircle size={20}></IoIosArrowDropdownCircle>
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              {classes &&
                classes.map((classItem, index) => (
                  <li key={index}>
                    <a className="text-black">{classItem.className}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <button onClick={() => handleSeeAll()} className="btn btn-primary">
          See Classes
        </button>
      </div>
    </div>
  );
};

export default SinglePopularInstructors;
