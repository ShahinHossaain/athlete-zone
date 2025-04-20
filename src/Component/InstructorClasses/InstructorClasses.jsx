import { useLocation } from "react-router-dom";
import SinglePopularClass from "../../Pages/Home/SinglePopularClass/SinglePopularClass";

const InstructorClasses = () => {
  const location = useLocation();
  const { classes } = location.state;
  console.log(classes)
  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">Instructor Name </h1>
        <h2 className="text-2xl font-bold">{classes[0].instructorName}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default InstructorClasses;
