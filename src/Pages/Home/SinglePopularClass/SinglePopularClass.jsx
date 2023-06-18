import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FeedbackModal from "../../DashBoard/Admin/FeedbackModal/FeedbackModal";
import "./singlPopularClass.css";
import { Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";
import ModalEnroll from "../../DashBoard/Student/ModalEnroll/ModalEnroll";
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
    enrolled,
    _id,
    status,
    feedback,
  } = classItem;

  useEffect(() => {
    if (status !== "pending") setIsApproveDenyDisabled(true);
  }, [status]);

  const handleSelect = async (id) => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please Login",
        showConfirmButton: false,
        timer: 1500,
      });
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        // handleModal(_id);
        // refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = (id) => {
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully updated, please give feedback",
          showConfirmButton: false,
          timer: 1500,
        });
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

    // setReFetchh((prev) => !prev); // Trigger re-render in MySelectedClasses component

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/classDelete/${id}?email=${email}`);
          const updatedClasss = classs.filter(
            (classItem) => classItem._id !== id
          );
          setClasss(updatedClasss);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // const handleEnroll = async (id) => {
  //   console.log("RRRRRR", id);
  //   const email = user.email;
  //   try {
  //     axios.patch(`/classEnroll/${id}?email=${email}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // setIsChange((p) => !p);
  //   setClasss(classs.filter((classItem) => classItem._id !== id));
  // };
  const handleEnroll = async (id) => {
    console.log("RRRRRR", id);
    const email = user.email;
    try {
      const response = await axios.patch(`/classEnroll/${id}?email=${email}`);
      console.log("uuuuuuuuuuuuuu", response.data); // Access the response data here
      // Continue with the desired logic after receiving the response
      // setIsChange((p) => !p);
      setClasss(classs.filter((classItem) => classItem._id !== id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "successfully enrolled",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className="relative max-w-sm bg-gray-300 rounded overflow-hidden shadow-lg">
    //   <FeedbackModal
    //     isOpen={isOpen}
    //     setIsOpen={setIsOpen}
    //     feedback={feedback}
    //   ></FeedbackModal>
    //   <img className="w-full h-2/5" src={classImage} alt={className} />
    //   <div className="relative px-6 py-4">
    //     <div className="font-bold text-xl mb-2">{className}</div>
    //     <p className="text-gray-700 text-base mb-2">
    //       Instructor: {instructorName}
    //     </p>
    //     <p className="text-gray-700 text-base mb-2">Gmail: {instructorEmail}</p>
    //     <p className="text-gray-700 text-base mb-2">
    //       Available Seats: {availableSeats}
    //     </p>
    //     <p className="text-gray-700 text-base mb-2">Price: {price}</p>
    //     <p className="text-gray-700 text-base">Enrolled: {enrolledCount}</p>
    //     {/* TODO: enable this comment  */}
    //     {/* {isFromManageClasses && <p>status: {status}</p>} */}
    //     {<p>status: {status}</p>}
    //   </div>
    //   {role !== "instructor" && (
    //     <div className="px-6 pb-4">
    //       {isFromManageClasses ? (
    //         <div>
    //           <div className="flex gap-2">
    //             <button
    //               disabled={isApproveDenyDisabled}
    //               onClick={() => {
    //                 handleApprove(_id);
    //               }}
    //               className="btn btn-primary w-1/2"
    //             >
    //               Approve
    //             </button>
    //             <button
    //               disabled={isApproveDenyDisabled}
    //               onClick={() => {
    //                 handleDeny(_id);
    //               }}
    //               className="btn btn-primary w-1/2"
    //             >
    //               Deny
    //             </button>
    //           </div>

    //           <button
    //             onClick={() => handleModal(_id)}
    //             className="btn btn-primary mt-2 w-full btn-sm"
    //           >
    //             {feedback ? "modify feedback" : "feedback"}
    //           </button>
    //         </div>
    //       ) : isFromDashBoard ? (
    //         !buttonHide && (
    //           <div>
    //             <button
    //               onClick={() => handleEnroll(_id)}
    //               className="btn btn-primary"
    //             >
    //               Enroll
    //             </button>
    //             <button
    //               onClick={() => handleDelete(_id)}
    //               className="btn btn-primary ml-5"
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         )
    //       ) : (
    //         ((!isFromPopularClass && role === "student") || !role) && (
    //           <button
    //             onClick={() => handleSelect(_id)}
    //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //           >
    //             Select
    //           </button>
    //         )
    //       )}
    //     </div>
    //   )}
    // </div>
    <Slide delay={10}>
      <div
        className={`card bg-[#8294C4] ${
          isFromManageClasses ? "h-[700px]" : "h-[600px]"
        }  cardd`}
      >
        <FeedbackModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          feedback={feedback}
        ></FeedbackModal>
        <figure className="h-2/5">
          <img
            className="w-full h-full rounded-t-2xl"
            src={classImage}
            alt={className}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#99DBF5] to-[#A7ECEE] font-bold font-font2">
            {className}
          </h2>
          <p className="text-[#f7dab9]">
            <span className="text-[16px] font-semibold mr-2 uppercase font-font4">
              Instructor :{" "}
            </span>
            {instructorName}
          </p>
          <p className="text-[#f7dab9]">
            <span className="text-[16px] font-semibold mr-2 uppercase font-font4">
              Gmail :{" "}
            </span>
            {instructorEmail}
          </p>
          <p className="text-[#f7dab9]">
            <span className="text-[16px] font-semibold mr-2 uppercase font-font4">
              Available Seats :{" "}
            </span>
            {availableSeats}
          </p>
          <p className="text-[#f7dab9]">
            <span className="text-[16px] font-semibold mr-2 uppercase font-font4">
              Price :{" "}
            </span>
            {price}
          </p>
          <p className="text-[#f7dab9]">
            <span className="text-[16px] font-semibold mr-2 uppercase font-font4">
              Enrolled :{" "}
            </span>
            {enrolled}
          </p>
          {isFromManageClasses && <p>status: {status}</p>}
          <div className="card-actions justify-start">
            {role !== "instructor" && (
              <div className="">
                {isFromManageClasses ? (
                  <div>
                    <div className="flex gap-2  mx-auto">
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
                    <div className="flex justify-between mt-5 mr-5">
                      <button
                        onClick={() => handleEnroll(_id)}
                        className="btn btn-primary"
                      >
                        Enroll
                      </button>

                      <ModalEnroll id={_id}></ModalEnroll>

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
        </div>
      </div>
    </Slide>
  );
};

export default SinglePopularClass;
