import { useEffect, useState } from "react";
import SinglePopularClass from "../../Home/SinglePopularClass/SinglePopularClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Classes = () => {
  const [classes, setClasses] = useState();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/classes").then((res) => setClasses(res.data));
  }, []);
  return (
    <div className="">
      <SectionTitle
        title="All Classes"
        subtitle="Make Your Strength"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
