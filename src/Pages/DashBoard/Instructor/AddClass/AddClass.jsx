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

  const [className, setClassName] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [price, setPrice] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const image = event.target.photoURL.files[0];


  //   const classInfo = {
  //     classImage,
  //     className,
  //     instructorName,
  //     instructorEmail,
  //     availableSeats,
  //     price,
  //     userEmail,
  //     status: "pending",
  //   };

  //   // new added 
  //   const createImage = async () => {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     const Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_profile_img
  //       }`;
  //     await fetch(Url, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((imgData) => {
  //         if (imgData.success) {
  //           const imgURL = imgData.data.display_url;
  //           console.log(imgURL);
  //           setClassImage(imgURL);
  //           classInfo.classImage = imgURL;
  //           console.log("place 1: ", classInfo);
  //         }
  //       })
  //   }

  //   createImage();

  //   console.log("place 2: ", classInfo);

  //   axios
  //     .post("/classes", classInfo)
  //     .then((res) => {
  //       console.log(res);

  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Your class in pending now,,, wait for approve",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setClassImage("");
  //       setClassName("");
  //       setAvailableSeats("");
  //       setPrice("");
  //     })
  //     .catch((err) => console.log(err));

  //   // Add your fetch or API call logic here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = e.target.photoURL.files[0]; // তোমার আগের কোডে event → e করা হয়েছে

    const classInfo = {
      classImage: "", // এখানেই initial value দিচ্ছি, পরে সেট করা হবে
      className,
      instructorName,
      instructorEmail,
      availableSeats,
      price,
      userEmail,
      status: "pending",
    };

    try {
      // 1. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", image);
      const Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_profile_img}`;

      const response = await fetch(Url, {
        method: "POST",
        body: formData,
      });

      const imgData = await response.json();

      if (imgData.success) {
        const imgURL = imgData.data.display_url;
        console.log("Uploaded Image URL:", imgURL);
        classInfo.classImage = imgURL;

        console.log("place 1:", classInfo);

        // 2. Now send class info with image URL to backend
        const res = await axios.post("/classes", classInfo);
        console.log("Backend Response:", res);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your class is now pending. Please wait for approval.",
          showConfirmButton: false,
          timer: 1500,
        });

        // 3. Reset form fields
        setClassName("");
        setAvailableSeats("");
        setPrice("");
      }
    } catch (err) {
      console.error("Error uploading image or submitting class info:", err);
    }
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
            {/* <input
              className="w-full px-3 py-2 border border-gray-300 rounded-sm"
              type="text"
              name="classImage"
              id="classImage"
              value={classImage}
              onChange={(e) => setClassImage(e.target.value)}
              required
            /> */}

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="photoURL"
              name="classImage"
              type="file"
              placeholder="photo URL"
              accept="photoURl/*"
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
