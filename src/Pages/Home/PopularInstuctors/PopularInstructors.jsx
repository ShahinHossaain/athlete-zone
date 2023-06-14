import { useEffect, useState } from "react";
import SinglePopularInstructors from "../SinglePopularInstructors/SinglePopularInstructors";
import axios from "axios";

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    // fetch("instructors.json")
    //   .then((res) => res.json())
    //   .then((data) => setInstructors(data));

    axios.get("/users?role=instructor").then((res) => setInstructors(res.data));
  }, []);
  console.log("broinstructor", instructors);
  return (
    <div className="grid grid-cols-2 gap-5">
      {instructors &&
        instructors.map((instructor, index) => (
          <SinglePopularInstructors
            key={index}
            instructor={instructor}
          ></SinglePopularInstructors>
        ))}
    </div>
  );
};

export default PopularInstructors;
