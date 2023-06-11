// import { useState } from "react";

import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import axios from "axios";

const FeedbackModal = ({ isOpen, setIsOpen }) => {
  const { modalId } = useContext(AuthContext);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const sendFeedback = async () => {
    try {
      const updatedData = {
        feedback: feedback,
      };
      console.log("updateData", updatedData);
      const response = await axios.patch(`/classes/${modalId}`, updatedData);
      console.log("response", response);
      if (response) {
        alert("Successfully updated");
        setIsOpen(false);
        // setUpdate((p) => !p);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the feedback submission here
    console.log("Feedback submitted:", feedback);
    // Reset the feedback input field
    sendFeedback();
    setFeedback("");
    // Close the modal
  };

  console.log("iddd", modalId);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-75 "></div>

      <div className="modal-container bg-white w-1/2 rounded shadow-lg z-50">
        <div className="modal-header flex items-center justify-between px-4 py-2 bg-gray-200 rounded-t">
          <h5 className="text-lg font-bold text-black">Toy Details</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <svg
              className="fill-current h-7 w-7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Close</title>
              <path d="M14.348 14.849l.707-.707L10.707 10l4.348-4.142-.707-.707L10 9.293 5.651 4.142 4.944 4.85 9.293 9l-4.348 4.142.707.707L10 10.707l4.349 4.142z"></path>
            </svg>
          </button>
        </div>

        <div className="flex justify-around items-center w-full gap-5 modal-body px-4 py-2">
          <textarea
            placeholder={modalId}
            className="textarea textarea-bordered textarea-lg w-full max-w-xs textarea-success"
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success"
          >
            feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
