import { useEffect, useState } from "react";
import SingleInstructor from "../SIngleInstructor/SingleInstructor";
import axios from "axios";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    // fetch("instructors.json")
    //   .then((res) => res.json())
    //   .then((data) => setInstructors(data));

    axios.get("/users?role=instructor").then((res) => setInstructors(res.data));
  }, []);
  return (
    <div className="flex flex-col gap-y-5 mb-32">
      <SectionTitle
        title="All Instructors"
        subtitle="Choose your favourite one"
      ></SectionTitle>

      <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">

        {instructors &&
          instructors.map((instructor, index) => (
            <SingleInstructor
              key={index}
              instructor={instructor}
            ></SingleInstructor>
          ))}
      </div>

    </div>
  );
};

export default Instructors;
