import { useEffect, useState } from "react";
import SinglePopularClass from "../SinglePopularClass/SinglePopularClass";

const PopularClass = () => {
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
              isFromManageClasses={false}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default PopularClass;
