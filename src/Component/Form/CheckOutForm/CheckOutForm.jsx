import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
export const CheckoutForm = ({
  closeModal,
  price,
  handleEnroll,
  classDetails,
}) => {
  const stripe = useStripe();
  const elements = useElements();


  const [cardError, setCardError] = useState();
  const [clientSecret, setClientSecret] = useState();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [history, setHistory] = useState();

  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      handleEnroll(classDetails._id, classDetails.availableSeats);
    }

    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        // save payment information in mongodb
        const paymentInfo = {
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        console.log("paymentInfo", paymentInfo);
        const data = {
          classId: classDetails._id,
          className: classDetails.className,
          price: classDetails.price,
          name: user.displayName,
          email: user.email,
          ...paymentInfo,
        };

        axiosSecure
          .post("/enrolled", data)
          .then((response) => {
            // Handle the response
            console.log(":", response.data);
          })
          .catch((error) => {
            // Handle the error
            console.error(error);
          });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={!stripe}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-5"
          //   onClick={() => handlePayment(id)}
          >
            Pay ${price}
            {/* pay */}
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-600 uppercase text-xs mt-3">{cardError}</p>
      )}
    </>
  );
};
