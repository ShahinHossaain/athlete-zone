import { useLocation } from "react-router-dom";
import SinglePopularClass from "../../Pages/Home/SinglePopularClass/SinglePopularClass";

const InstructorClasses = () => {
  const location = useLocation();
  const { classes } = location.state;
  return (
    <div className="grid grid-cols-3 gap-5">
      {classes &&
        classes.map((classItem, index) => (
          <SinglePopularClass
            key={index}
            classItem={classItem}
          ></SinglePopularClass>
        ))}
    </div>
  );
};

export default InstructorClasses;
