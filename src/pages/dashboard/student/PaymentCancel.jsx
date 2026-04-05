import React from "react";

const PaymentCancel = () => {
  return (
    <div className="flex justify-center ">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Payment Cancelled</h1>
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

export default PaymentCancel;
