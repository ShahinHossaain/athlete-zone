import { useContext, useEffect, useState } from "react";
import SinglePopularClass from "../../../Home/SinglePopularClass/SinglePopularClass";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { AuthContext } from "../../../../Provider/AuthProvider";
import axios from "axios";

const ManageClasses = () => {
  const [classes, setClasses] = useState();
  const { isOpen, setIsOpen } = useContext(AuthContext);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    axios
      .get("/classes")
      .then((data) => setClasses(data.data))
      .then((err) => console.log(err));
  }, [update, isOpen]);
  return (
    <div className="h-screen p-5">
      <FeedbackModal isOpen={isOpen} setIsOpen={setIsOpen}></FeedbackModal>
      <div className="grid md:grid-cols-3 gap-5">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromManageClasses={true}
              setUpdate={setUpdate}
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default ManageClasses;
