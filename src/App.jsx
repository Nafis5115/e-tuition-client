import React from "react";

import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "react-hot-toast";

const App = ({ children }) => (
  <TooltipProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          color: "white",
          backgroundColor: "black",
        },
      }}
    />
    {children}
  </TooltipProvider>
);

export default App;
