import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import UpdateClass from "../UpdateClass/UpdateClass";
import FeedBackModal from "../FeedBackModal/FeedBackModal";
import { Slide } from "react-awesome-reveal";
const SingleMyClass = ({ classDetails, setUpdate }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(classDetails);
  const {
    classImage,
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    status,
    feedback,
  } = classDetails;
  console.log(instructorEmail, user);
  setIsModalOpen, classDetails, setUpdate;
  return (
    <Slide>
      <div className="relative bg-gray-300">
        {isModalOpen && (
          <UpdateClass
            setIsModalOpen={setIsModalOpen}
            classDetails={classDetails}
            setUpdate={setUpdate}
          ></UpdateClass>
        )}
        {isOpen && <FeedBackModal setIsOpen={setIsOpen} feedback={feedback} />}
        <div className="h-[500px]  rounded overflow-hidden shadow-lg">
          <img
            className="w-full p-5 mx-auto h-1/2"
            src={classImage}
            alt={className}
          />
          <div className="relative px-6 py-4">
            <div className="font-bold text-xl mb-2">{className}</div>
            <p className="text-gray-700 text-base mb-2">
              Instructor: {instructorName}
            </p>
            <p className="text-gray-700 text-base mb-2">
              Available Seats: {availableSeats}
            </p>
            <p className="text-gray-700 text-base mb-2">Price: {price}</p>
            {/* <p className="text-gray-700 text-base">Enrolled: {enrolledCount}</p> */}
            <p>Status : {status}</p>
          </div>
          <div className="px-6 pb-4">
            <div className="absolute bottom-3">
              {status !== "pending" && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn btn-primary"
                >
                  Feedback
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary ml-5"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default SingleMyClass;
