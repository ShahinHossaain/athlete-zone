import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SinglePopularClass = ({
  classItem,
  isFromDashBoard,
  isFromManageClasses,
  setUpdate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isApproveDenyDisabled, setIsApproveDenyDisabled] = useState(false);

  const { user, setIsOpen, setModalId } = useContext(AuthContext);

  console.log("classItem", classItem);
  const {
    classImage,
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    enrolledCount,
    _id,
    status,
    feedback,
  } = classItem;

  useEffect(() => {
    if (status !== "pending") setIsApproveDenyDisabled(true);
  }, []);

  const handleSelect = () => {
    if (!user) {
      alert("Please login first");
      return navigate("/login", { state: location });
    }
    console.log("user ache");
  };

  const handleModal = (id) => {
    console.log("tataa", id);
    setModalId(id);
    setIsOpen(true);
  };

  const updateClass = async (status) => {
    try {
      const updatedData = {
        status: status,
      };
      console.log("updateData", updatedData);
      const response = await axios.patch(`/classes/${_id}`, updatedData);
      console.log("response", response);
      if (response) {
        alert("Successfully updated, please give a feedback");
        handleModal(_id);
        setUpdate((p) => !p);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = (id) => {
    console.log("Approve", id);
    setIsApproveDenyDisabled(true);
    updateClass("approve");
  };

  const handleDeny = (id) => {
    console.log("Deny", id);
    setIsApproveDenyDisabled(true);
    updateClass("deny");
  };

  return (
    <div className="relative max-w-sm bg-gray-300 rounded overflow-hidden shadow-lg">
      <img className="w-full h-2/5" src={classImage} alt={className} />
      <div className="relative px-6 py-4">
        <div className="font-bold text-xl mb-2">{className}</div>
        <p className="text-gray-700 text-base mb-2">
          Instructor: {instructorName}
        </p>
        <p className="text-gray-700 text-base mb-2">Gmail: {instructorEmail}</p>
        <p className="text-gray-700 text-base mb-2">
          Available Seats: {availableSeats}
        </p>
        <p className="text-gray-700 text-base mb-2">Price: {price}</p>
        <p className="text-gray-700 text-base">Enrolled: {enrolledCount}</p>
        {isFromManageClasses && <p>status: {status}</p>}
      </div>
      <div className=" px-6 pb-4">
        {isFromManageClasses ? (
          <div className="">
            <div className="flex gap-2">
              <button
                disabled={isApproveDenyDisabled}
                onClick={() => {
                  handleApprove(_id);
                }}
                className="btn btn-primary w-1/2"
              >
                Approve
              </button>
              <button
                disabled={isApproveDenyDisabled}
                onClick={() => {
                  handleDeny(_id);
                }}
                className="btn btn-primary w-1/2"
              >
                Deny
              </button>
            </div>

            <button
              onClick={() => handleModal(_id)}
              className="btn btn-primary mt-2 w-full btn-sm"
            >
              {feedback ? "modify feedback" : "feedback"}
            </button>
          </div>
        ) : isFromDashBoard ? (
          <div>
            <button className="btn btn-primary">Enroll</button>
            <button className="btn btn-primary ml-5">Delete</button>
          </div>
        ) : (
          <button
            onClick={handleSelect}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePopularClass;
