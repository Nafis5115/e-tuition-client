import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const TuitionApplyModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="flex  items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Application Submitted!</h1>
          <p className="text-muted-foreground">
            Your tutor application has been submitted successfully. Our team
            will review your profile and get back to you shortly.
          </p>

          <DialogClose asChild>
            <Button className="w-full mt-4">Back to Home</Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
};

export default TuitionApplyModal;
