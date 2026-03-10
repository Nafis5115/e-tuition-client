import React from "react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxios from "../hooks/useAxios";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);
  const { loginUser, loading, googleSignIn, user } = useAuth();
  const axiosInstance = useAxios();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleOnSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login Successful.");
        navigate(from);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Invalid Credential.");
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log(result.user);
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
      };
      await axiosInstance
        .post("/api/create-user", newUser)
        .then(() => console.log("User saved to db"))
        .catch((e) => console.log(e));

      toast.success("Login Successful.");
      navigate(from);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (user) {
    return <Navigate to={from} replace />;
  }
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your eTuitionBd account
          </p>
        </div>
        <div className="card-elevated rounded-xl border bg-card p-6">
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("password", { required: true })}
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm">
                  Password must be 6 characters
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6 text-white" />
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              type="button"
              variant="outline"
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </form>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
