import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
// import axios from "axios";
import SingleMyClass from "../SingleMyClass/SingleMyClass";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Myclasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    axiosSecure
      .get(`classes?email=${user.email}&all=all`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);
  console.log("mojid", classes);
  return (
    <div className="min-h-screen">
      <div className="text-center">
        <img src={user.photoURL} alt="" className="mx-auto" />
        <p>Instructor Name: {user.displayName}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {classes &&
          classes.map((myClass, index) => (
            <SingleMyClass
              key={index}
              classDetails={myClass}
              setUpdate={setUpdate}
            ></SingleMyClass>
          ))}
      </div>
    </div>
  );
};

export default Myclasses;
