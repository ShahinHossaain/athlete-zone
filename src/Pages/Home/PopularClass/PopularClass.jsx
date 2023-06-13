import { useContext, useEffect, useState } from "react";
import SinglePopularClass from "../SinglePopularClass/SinglePopularClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const PopularClass = ({ isFromPopularClass }) => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/classes?limit=6").then((res) => setClasses(res.data));
  }, [user]);
  return (
    <div>
      <div className="grid grid-cols-3">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromManageClasses={false}
              isFromPopularClass={isFromPopularClass}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default PopularClass;
