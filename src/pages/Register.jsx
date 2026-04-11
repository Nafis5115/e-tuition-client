import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Camera,
  MapPin,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const [showPass, setShowPass] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const { registerUser, loading, user, updateUserProfile } = useAuth();
  const [imageLoading, setImageLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const axiosInstance = useAxios();

  // const [qualifications, setQualifications] = useState([""]);
  // const [subjects, setSubjects] = useState([""]);
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };
  // const addField = (setter) => {
  //   setter((prev) => [...prev, ""]);
  // };
  // const removeField = (setter, index) => {
  //   setter((prev) => prev.filter((_, i) => i !== index));
  // };
  // const updateField = (setter, index, value) => {
  //   setter((prev) => prev.map((v, i) => (i === index ? value : v)));
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (data) => {
    try {
      setSubmitting(true);
      setImageLoading(true);
      const name = data.name;
      const email = data.email;
      const phone = data.phone;
      const password = data.password;
      const photo = data.photo[0];

      const result = await registerUser(email, password);

      const formData = new FormData();
      formData.append("image", photo);
      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
      const imageRes = await axios.post(imageApiUrl, formData);
      const photoURL = imageRes.data.data.url;

      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        phone: phone,
        photoURL: photoURL,
      };

      await axiosInstance
        .post("/api/create-user", newUser)
        .then(() => {})
        .catch((e) => console.log(e));

      toast.success("Registration Successful.");
      navigate(from);
    } catch (e) {
      console.log(e);
      setPhotoPreview(null);
      if (e.code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmitting(false);
      setImageLoading(false);
    }
  };
  if (loading || imageLoading) return <LoadingSpinner />;

  if (user && !submitting) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join eTuitionBd today
          </p>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="card-elevated rounded-xl border bg-card p-6 space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>

                <label
                  htmlFor="profile-photo"
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </label>

                <input
                  {...register("photo", {
                    required: true,
                    onChange: (e) => handlePhotoChange(e),
                  })}
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Upload profile photo
            </p>
            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("name", {
                    required: true,
                  })}
                  id="name"
                  placeholder="Your full name"
                  className="pl-10"
                />
              </div>
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i,
                    },
                  })}
                  id="reg-email"
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
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("phone", { required: true })}
                  id="phone"
                  type="text"
                  placeholder="+880 1XXX-XXXXXX"
                  className="pl-10"
                />
              </div>
              {errors.phone?.type === "required" && (
                <p className="text-red-500 text-sm">Phone number is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...register("password", { required: true, minLength: 6 })}
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />

                <button
                  type="button"
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

            <Button type="submit" className="w-full">
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6 text-white" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
