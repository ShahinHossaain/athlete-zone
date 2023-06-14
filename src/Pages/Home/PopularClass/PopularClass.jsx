import { useContext, useEffect, useState } from "react";
import SinglePopularClass from "../SinglePopularClass/SinglePopularClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const PopularClass = ({ isFromPopularClass }) => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/classes?limit=6").then((res) => setClasses(res.data));
  }, [user]);
  return (
    <div className="my-32">
      <SectionTitle
        title="Popular Classes"
        subtitle="Join Class Now"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
