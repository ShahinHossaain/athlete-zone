import axios from "axios";
import { useState } from "react";

const UpdateClass = ({ setIsModalOpen, classDetails, setUpdate }) => {
  console.log("ddddd", classDetails);
  const { className, availableSeats, price, _id, classImage } = classDetails;
  console.log(className, availableSeats, price, classImage);
  const [classTitle, setClassTitle] = useState(className);
  const [image, setImage] = useState();
  const [seats, setSeats] = useState(availableSeats);
  const [prices, setPrice] = useState(price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        className: classTitle,
        classImage: image,
        availableSeats: seats,
        price: prices, // Corrected the variable name here
      };
      console.log("updateData", updatedData);
      const response = await axios.patch(`/classes/${_id}`, updatedData); // Await the axios.patch call
      // Handle the response as needed
      if (response) {
        alert("Successfully updated");
        setIsModalOpen(false);
        setUpdate((p) => !p);
      }
      //   closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-300 w-1/2 p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Class Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="classTitle" className="block mb-2 font-semibold">
              Class Title
            </label>
            <input
              type="text"
              id="classTitle"
              value={classTitle}
              onChange={(e) => setClassTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 font-semibold">
              Image
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="seats" className="block mb-2 font-semibold">
              Seats
            </label>
            <input
              type="number"
              id="seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 font-semibold">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={prices}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-primary"
            >
              close form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
