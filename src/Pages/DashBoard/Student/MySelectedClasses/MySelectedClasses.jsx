import { useContext, useEffect, useState } from "react";
import SinglePopularClass from "../../../Home/SinglePopularClass/SinglePopularClass";
import axios from "axios";
import { AuthContext } from "../../../../Provider/AuthProvider";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";

const MySelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [classsesId, setClassesId] = useState([]);
  const [classs, setClasss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isChange, setIsChange] = useState(true);
  useEffect(() => {
    axios
      .get(`/users/${email}`)
      .then((res) => {
        if (res.data.selectedClasses) {
          const formattedClasses = res.data.selectedClasses.map((classObj) => {
            const classId = Object.keys(classObj)[0];
            return { [classId]: 0 };
          });
          setClassesId(formattedClasses);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [email]);

  useEffect(() => {
    if (classsesId.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const classDetails = await Promise.all(
          classsesId.map(async (classObj) => {
            const classId = Object.keys(classObj)[0];
            const response = await axios.get(
              `/classes/${classId}?isEnabled=0&email=${user.email}`
            );
            if (response.data) {
              // Add this check to ensure response exists
              return response.data;
            }
            return null; // Return null if response doesn't exist
          })
        );
        setClasss(classDetails.filter(Boolean)); // Filter out null values
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classsesId]);

  return (
    <div className="min-h-screen">
      <SectionTitle
        title="Selected Class "
        subtitle="You Can Delete or Enroll"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading && <p className="text-7xl">Loading</p>}
        {!isLoading && classs.length === 0 && (
          <p className="text-center mx-auto ">No selected classes found.</p>
        )}
        {!isLoading &&
          classs.length > 0 &&
          classs.map((classItem, index) => (
            <SinglePopularClass
              key={index}
              classs={classs}
              classItem={classItem}
              isFromDashBoard={true}
              isFromManageClasses={false}
              setClasss={setClasss}
              // setIsChange={setIsChange}
            />
          ))}
      </div>
    </div>
  );
};

export default MySelectedClasses;
