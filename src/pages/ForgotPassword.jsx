import React from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, GraduationCap, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const ForgotPassword = () => {
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleResetPassword = async (data) => {
    await resetPassword(data.email);
    toast.success("Password Reset Email Sent To Your Email.");
    navigate("/login");
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="flex min-h-[calc(100vh-4rem)]  justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-2">
        <Link
          to={"/login"}
          className=" inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="card-elevated rounded-xl border bg-card p-6">
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i,
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>

              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500 text-sm">Email is not valid</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
