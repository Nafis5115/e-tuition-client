import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/api/payment-success?session_id=${sessionId}`)
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex justify-center ">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Payment Success</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Your are successfully paid to the tutor.
        </p>
        <a
          href="/dashboard"
          className="text-primary underline hover:text-primary/90"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
