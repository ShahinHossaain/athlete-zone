import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import axios from "axios";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const AddClass = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  const userEmail = user.email;
  const instructorName = user.displayName;
  const instructorEmail = user.email;

  const [classImage, setClassImage] = useState("");
  const [className, setClassName] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const classInfo = {
      classImage,
      className,
      instructorName,
      instructorEmail,
      availableSeats,
      price,
      userEmail,
      status: "pending",
    };
    console.log(classInfo);

    axios
      .post("/classes", classInfo)
      .then((res) => {
        console.log(res);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your class in pending now,,, wait for approve",
          showConfirmButton: false,
          timer: 1500,
        });
        setClassImage("");
        setClassName("");
        setAvailableSeats("");
        setPrice("");
      })
      .catch((err) => console.log(err));

    // Add your fetch or API call logic here
  };

  return (
    <div className="w-full md:max-w-6xl p-10 mx-auto bg-slate-200 text-gray-500">
      <SectionTitle
        title="Add Class"
        subtitle="Add Your Own Class"
      ></SectionTitle>
      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-5">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="classImage"
            >
              Class Image
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="text"
              name="classImage"
              id="classImage"
              value={classImage}
              onChange={(e) => setClassImage(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="className"
            >
              Class Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="text"
              name="className"
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="instructorName"
            >
              Instructor Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="text"
              name="instructorName"
              id="instructorName"
              value={instructorName}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="instructorEmail"
            >
              Instructor Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="email"
              name="instructorEmail"
              id="instructorEmail"
              value={instructorEmail}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="availableSeats"
            >
              Available Seats
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="text"
              name="availableSeats"
              id="availableSeats"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
