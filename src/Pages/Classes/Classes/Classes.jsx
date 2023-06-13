import { useEffect, useState } from "react";
import SinglePopularClass from "../../Home/SinglePopularClass/SinglePopularClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Classes = () => {
  const [classes, setClasses] = useState();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/classes").then((res) => setClasses(res.data));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 w-full">
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
