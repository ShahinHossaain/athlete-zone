import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FeedbackModal from "../../DashBoard/Admin/FeedbackModal/FeedbackModal";

const SinglePopularClass = ({
  classItem,
  isFromDashBoard,
  isFromManageClasses,
  isFromPopularClass,
  // setReFetchh,
  classs,
  setClasss,
  buttonHide,
  // setIsChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isApproveDenyDisabled, setIsApproveDenyDisabled] = useState(false);

  const { user, setIsOpen, setModalId, isOpen, role } = useContext(AuthContext);
  console.log("rrrrrrrr", classs);
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
  }, [status]);

  const handleSelect = async (id) => {
    if (!user) {
      alert("Please login first");
      return navigate("/login", { state: location });
    }

    try {
      const updatedData = {
        selectedClass: id,
      };
      console.log("updateData", updatedData);
      const response = await axios.patch(
        `/users/selectedClasses/${user.email}?id=${id}`,
        updatedData
      );
      console.log("response", response);
      if (response) {
        alert("Successfully updated, please give feedback");
        handleModal(_id);
        // refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = (id) => {
    setModalId(id);
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
        alert("Successfully updated, please give feedback");
        handleModal(_id);
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

  const handleDelete = async (id) => {
    console.log(id);
    const email = user.email;
    const updatedClasss = classs.filter((classItem) => classItem._id !== id);
    setClasss(updatedClasss);
    // setReFetchh((prev) => !prev); // Trigger re-render in MySelectedClasses component
    try {
      await axios.delete(`/classDelete/${id}?email=${email}`);
      alert("deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnroll = async (id) => {
    console.log("RRRRRR", id);
    const email = user.email;
    try {
      axios.patch(`/classEnroll/${id}?email=${email}`);
    } catch (error) {
      console.error(error);
    }
    // setIsChange((p) => !p);
    setClasss(classs.filter((classItem) => classItem._id !== id));
  };

  return (
    <div className="relative max-w-sm bg-gray-300 rounded overflow-hidden shadow-lg">
      <FeedbackModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        feedback={feedback}
      ></FeedbackModal>
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
        {/* TODO: enable this comment  */}
        {/* {isFromManageClasses && <p>status: {status}</p>} */}
        {<p>status: {status}</p>}
      </div>
      {role !== "instructor" && (
        <div className="px-6 pb-4">
          {isFromManageClasses ? (
            <div>
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
            !buttonHide && (
              <div>
                <button
                  onClick={() => handleEnroll(_id)}
                  className="btn btn-primary"
                >
                  Enroll
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-primary ml-5"
                >
                  Delete
                </button>
              </div>
            )
          ) : (
            ((!isFromPopularClass && role === "student") || !role) && (
              <button
                onClick={() => handleSelect(_id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Select
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SinglePopularClass;
