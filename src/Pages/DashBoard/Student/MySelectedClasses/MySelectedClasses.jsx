import { useEffect, useState } from "react";
import SinglePopularClass from "../../../Home/SinglePopularClass/SinglePopularClass";

const MySelectedClasses = () => {
  const [classes, setClasses] = useState();
  useEffect(() => {
    fetch("../../../../public/classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 gap-6">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromDashBoard={true}
              isFromManageClasses={false}
            ></SinglePopularClass>
          ))}
      </div>
      Shahin
    </div>

    // <div>shahin</div>
  );
};

export default MySelectedClasses;
