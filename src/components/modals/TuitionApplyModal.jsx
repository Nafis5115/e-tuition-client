import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import {
  CheckCircle,
  CircleAlert,
  HelpCircle,
  TriangleAlert,
} from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const TuitionApplyModal = ({ handleApply }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: phoneData = {} } = useQuery({
    queryKey: ["user-phone", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/get-user-phone?email=${user?.email}`,
      );

      return res.data;
    },
  });
  if (!phoneData.phone)
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex  items-center justify-center px-4 py-4">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
              <TriangleAlert className="h-10 w-10 text-yellow-700" />
            </div>
            <h1 className="text-2xl font-bold">
              Please add your phone number first!
            </h1>

            <Button className="w-full mt-4" asChild>
              <Link to={"/dashboard/tutor/profile-settings"}>
                Go to profile
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-bold">
          Are you sure?
        </DialogTitle>
        <DialogDescription className="text-center">
          Do you want to apply for this tuition position?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex flex-row justify-center gap-3 sm:justify-center">
        <DialogClose asChild>
          <Button variant="outline" className="flex-1">
            No, Cancel
          </Button>
        </DialogClose>

        <Button onClick={handleApply} className="flex-1 bg-primary">
          Yes, Apply
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TuitionApplyModal;
