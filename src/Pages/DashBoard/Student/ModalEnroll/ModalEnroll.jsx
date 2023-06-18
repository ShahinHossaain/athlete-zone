import { Dialog, Transition } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { CheckoutForm } from "../../../../Component/Form/CheckOutForm/CheckOutForm";
const stripePromise = loadStripe(
  `${import.meta.env.VITE_payment_publishable_key}`
);
const ModalEnroll = ({ id }) => {
  console.log("iidd", id);
  let [isOpen, setIsOpen] = useState(false);
  const [classDetails, setClassDetails] = useState([]);
  useEffect(() => {
    axios.get(`/classes?id=${id}`).then((res) => setClassDetails(res.data));
  }, []);
  console.log(classDetails);
  const { className, classImage, instructorName, instructorEmail, price } =
    classDetails;
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // const handlePayment = (id) => {
  //   console.log(id, "ooo yea");
  //   closeModal();
  // };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <img src={classImage} alt="" className="w-full h-52" />
                    Class Name : {className}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>Instructor : {instructorName}</p>
                    <p>Email : {instructorEmail}</p>
                    <p>Price : {price}</p>
                  </div>
                  {/* TODO : checkout form  */}
                  <Elements stripe={stripePromise}>
                    <CheckoutForm closeModal={closeModal} price={price} />
                  </Elements>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalEnroll;
