import { useEffect, useState } from "react";
import SinglePopularInstructors from "../SinglePopularInstructors/SinglePopularInstructors";
import axios from "axios";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

import { Slide } from "react-awesome-reveal";

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
    <div>
      <SectionTitle
        title="Popular Instructors"
        subtitle="See their Classes"
      ></SectionTitle>
      <Slide>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
          {instructors &&
            instructors.map((instructor, index) => (
              <SinglePopularInstructors
                key={index}
                instructor={instructor}
              ></SinglePopularInstructors>
            ))}
        </div>
      </Slide>
    </div>
  );
};

export default PopularInstructors;
