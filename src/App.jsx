import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
  </TooltipProvider>
);

export default App;
