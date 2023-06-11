import { useEffect, useState } from "react";
import SinglePopularInstructors from "../SinglePopularInstructors/SinglePopularInstructors";

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("instructors.json")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);
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
