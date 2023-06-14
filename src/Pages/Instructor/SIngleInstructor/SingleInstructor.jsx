import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
const Instructors = ({ instructor }) => {
  const { image, name, email, numClasses } = instructor;

  const [classes, setClasses] = useState();

  useEffect(() => {
    axios.get(`/classes?email=${email}`).then((res) => setClasses(res.data));
  }, []);

  const navigate = useNavigate();
  console.log("aaaaaa", classes);
  const handleSeeAll = () => {
    navigate("/InstructorClasses", { state: { classes } });
  };
  return (
    <Slide>
      <div className="flex  w-full bg-[#8294C4] navv border border-gray-200 rounded-lg shadow md:flex-row  mx-auto hover:bg-gray-500">
        <div className="flex w-[70%]   h-60 gap-y-10 items-center ">
          <div className="w-[40%] mt-5 md:mt-0 h-64 md:h-full">
            <img src={image} alt="Chef" className="w-full  rounded-md h-full" />
          </div>
          <div className="grid grid-cols-1 text-center w-[60%] p-4 leading-normal text-white">
            <p>Name : {name} </p>

            <p>Email : {email}</p>

            <p>Number offf Classes : ${numClasses}</p>
          </div>
        </div>

        {/* dropdown  */}

        <div className="flex w-[40%] justify-center items-center">
          <div className="w-[50%] flex justify-center">
            <div className="dropdown dropdown-bottom ">
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
    </Slide>
  );
};

export default Instructors;
