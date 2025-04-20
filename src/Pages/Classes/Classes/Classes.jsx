import { useEffect, useState } from "react";
import SinglePopularClass from "../../Home/SinglePopularClass/SinglePopularClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Classes = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [classes, setClasses] = useState();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/classes?email=${email}`)
      .then((res) => setClasses(res.data));
  }, []);
  return (
    <div className="">
      <SectionTitle
        title="All Classes"
        subtitle="Make Your Strength"
      ></SectionTitle>
      <div className="grid gap-4 grid-cols-1  md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-3  xl:grid-cols-4 xl:gap-5 2xl:gap-10">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromDashBoard={false}
              isFromManageClasses={false}
              isFromPopularClass={true}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default Classes;
