import axios from "axios";

const User = ({ user, setUpdateUser }) => {
  console.log(user, user.role);
  const { image, email, role, _id } = user;
  console.log("IIIId", _id);
  const updateUserRole = async (id, role) => {
    try {
      const response = await axios.patch(`/users/${id}`, { role });
      console.log(response.data);
      setUpdateUser((previous) => !previous);
      // Handle the response data or perform any additional actions
    } catch (error) {
      console.log(error.message);
      // Handle the error
    }
  };
  const onAdminClick = (id, role) => {
    updateUserRole(id, role);
  };
  const onInstructorClick = (id, role) => {
    updateUserRole(id, role);
  };
  const onStudentClick = (id, role) => {
    updateUserRole(id, role);
  };
  return (
    <div className="flex justify-center items-center p-8 rounded overflow-hidden shadow-lg">
      <figure className="mx-auto">
        <img className="h-16 w-16 rounded-md" src={image} alt="User" />
      </figure>
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">Email: {email}</div>
        <div className="flex justify-center space-x-4">
          <button
            className={`${
              role === "admin"
                ? "bg-gray-500 text-gray-400 hover:bg-gray-500"
                : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            onClick={() => onAdminClick(_id, "admin")}
            disabled={role === "admin"}
          >
            Admin
          </button>
          <button
            className={`${
              role === "instructor"
                ? "bg-gray-500 text-gray-400 hover:bg-gray-500"
                : "bg-green-500"
            } hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
            onClick={() => onInstructorClick(_id, "instructor")}
            disabled={role === "instructor"}
          >
            Instructor
          </button>
          <button
            className={`${
              role === "student"
                ? "bg-gray-500 text-gray-400 hover:bg-gray-500"
                : "bg-yellow-500"
            } hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded`}
            onClick={() => onStudentClick(_id, "student")}
            disabled={role === "student"}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
