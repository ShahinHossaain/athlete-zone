import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import axios from "axios";
import SingleMyClass from "../SingleMyClass/SingleMyClass";

const Myclasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    axios
      .get(`classes?email=${user.email}`)
      .then((res) => setClasses(res.data))
      .then((err) => console.log(err));
  }, [update]);
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
