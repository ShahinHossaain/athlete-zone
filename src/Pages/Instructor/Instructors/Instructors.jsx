import { useEffect, useState } from "react";
import SingleInstructor from "../SIngleInstructor/SingleInstructor";
const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("instructors.json")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);
  return (
    <div className="flex flex-col gap-y-5">
      {instructors &&
        instructors.map((instructor, index) => (
          <SingleInstructor
            key={index}
            instructor={instructor}
          ></SingleInstructor>
        ))}
    </div>
  );
};

export default Instructors;
