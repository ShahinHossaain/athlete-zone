import axios from "axios";
import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, classId, children }) => {
    const [classInfo, setClassInfo] = useState({});
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`/class/${classId}`);
                setClassInfo(response.data);
            } catch (error) {
                console.error("Error fetching class:", error);
            }
        };

        if (classId) {
            fetchClassData();
        }
    }, [classId]);

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                >
                    &times;
                </button>
                <div className="flex gap-3">
                    <div>
                        <img src={classInfo.classImage} className="w-28 h-28 rounded-lg" />
                    </div>
                    <div>
                        <p>class name : {classInfo.className}</p>
                        <p>Available sits : {classInfo.availableSeats}</p>
                        <p>Price {classInfo.price}</p></div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
