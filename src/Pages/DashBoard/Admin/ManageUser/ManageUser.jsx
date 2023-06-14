import { useEffect, useState } from "react";
import axios from "axios";
import User from "../User/User";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState(true);
  useEffect(() => {
    axios
      .get(`/users`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [updateUser]);
  console.log("users", users);
  return (
    <div className="min-h-screen">
      <SectionTitle title="All Users" subtitle="Maintain Them"></SectionTitle>
      <p className=" inline p-3 text-white rounded-md ml-10 bg-gray-500">
        Gray color is Representing user current role{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {users &&
          users.map((user, index) => (
            <User setUpdateUser={setUpdateUser} key={index} user={user}></User>
          ))}
      </div>
    </div>
  );
};

export default ManageUser;
