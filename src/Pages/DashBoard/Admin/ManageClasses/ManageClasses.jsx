import { useContext, useState } from "react";
import SinglePopularClass from "../../../Home/SinglePopularClass/SinglePopularClass";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { AuthContext } from "../../../../Provider/AuthProvider";
// import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const { isOpen, setIsOpen, loading } = useContext(AuthContext);
  console.log("isOOOOOPPPPEEEEN", isOpen);
  // const [update, setUpdate] = useState(true);

  // useEffect(() => {
  //   axiosSecure
  //     .get("/classes")
  //     .then((response) => setClasses(response.data))
  //     .catch((error) => console.log(error));
  // }, [update, isOpen]);

  // here queryFn work as like this  get("/classes")

  const { refetch } = useQuery({
    queryKey: ["classes", loading],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/classes?fromManageClasses=1");
      console.log("res from axios", res);
      setClasses(res.data);
      return res.data;
    },
  });
  console.log(refetch);

  return (
    <div className="h-screen p-5">
      <SectionTitle
        title="Manage Classes"
        subtitle="Watch With Caution"
      ></SectionTitle>
      <FeedbackModal isOpen={isOpen} setIsOpen={setIsOpen}></FeedbackModal>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-5">
        {classes &&
          classes.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classItem={classItem}
              isFromManageClasses={true}
              refetch
            ></SinglePopularClass>
          ))}
      </div>
    </div>
  );
};

export default ManageClasses;
