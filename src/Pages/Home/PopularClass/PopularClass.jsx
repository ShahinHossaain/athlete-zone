import { useContext, useEffect, useState } from "react";
import SinglePopularClass from "../SinglePopularClass/SinglePopularClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const PopularClass = () => {
  const { user } = useContext(AuthContext);

  const email = user?.email;

  const [classes, setClasses] = useState();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    email && axiosSecure.get(`/classes?email=${email}&limit=6`).then((res) => setClasses(res.data));
  }, [user, email]);
  console.log("classes", classes);
  return (
    <div className="my-32">
      <SectionTitle
        title="Popular Classes"
        subtitle="Join Class Now"
      ></SectionTitle>
      <div className="grid gap-4 grid-cols-1  md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-3  xl:grid-cols-4 xl:gap-5 2xl:gap-10">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromManageClasses={false}
              isFromPopularClass={true}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default PopularClass;
