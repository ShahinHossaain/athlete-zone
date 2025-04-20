import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Modal from "../../../Component/InstructorClasses/ClassDetails";
const Instructors = ({ instructor }) => {
  const { image, name, email } = instructor;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classId, setClassId] = useState("");

  const [classes, setClasses] = useState([]);

  console.log("classes", classes)

  useEffect(() => {
    axios.get(`/class?email=${email}`).then((res) => setClasses(res.data));
  }, []);

  // const callClasses = async () => {
  //   try {
  //     const res = await axios.get(`/class?email=${email}`);
  //     setClasses(res.data);
  //   } catch (error) {
  //     console.error("Error fetching classes:", error);
  //   }
  // };
  // callClasses();

  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate("/InstructorClasses", { state: { classes } });
  };
  return (
    <Slide triggerOnce>
      <div className="flex w-full bg-[#8294C4] navv border border-gray-200 rounded-lg shadow  mx-auto hover:bg-gray-500">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classId={classId}>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </Modal>
        <div className="flex h-60 gap-y-10 items-center ">
          <div className="hidden md:block md:w-[30%] mt-5 md:mt-0 h-64 md:h-full">
            <img src={image} alt="Chef" className="w-full  rounded-md h-full" />
          </div>

          <div className="grid grid-cols-2 w-[100%] md:w-[70%] items-center gap-y-5">

            <div className="grid grid-cols-1 text-center  p-4 leading-normal text-white">
              <p>Name : {name} </p>

              <p>Email : {email}</p>

              <p>Number off Classes : {classes?.length}</p>
            </div>

            {/* dropdown  */}

            <div className="flex flex-col 2xl:flex-row justify-center items-center gap-3">
              <div className=" flex justify-center">
                <div className="dropdown dropdown-bottom ">
                  <label tabIndex={0} className="btn">
                    <span className=""> Classes Taken</span>{" "}
                    <IoIosArrowDropdownCircle size={20}></IoIosArrowDropdownCircle>
                  </label>
                  <ul
                    tabIndex={0}
                    className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 z-10"
                  >
                    {classes && classes.length === 0 ? <p>No class available </p> :
                      classes.map((classItem, index) => (
                        <li key={index} onClick={() => { setIsModalOpen(true); setClassId(classItem._id) }}>
                          <a className="text-black" >{classItem.className}</a>
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
        </div>


      </div>
    </Slide>
  );
};

export default Instructors;
