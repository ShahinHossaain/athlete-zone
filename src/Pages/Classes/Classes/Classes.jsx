import { useEffect, useState } from "react";
import SinglePopularClass from "../../Home/SinglePopularClass/SinglePopularClass";

const Classes = () => {
  const [classes, setClasses] = useState();
  useEffect(() => {
    fetch("classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromDashBoard={false}
              isFromManageClasses={false}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default Classes;
