import { useState } from "react";
import { Link } from "react-router";
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

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("Student");
  const [photoPreview, setPhotoPreview] = useState(null);
  const { registerUser, loading } = useAuth();
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

  const handleOnSubmit = (data) => {
    data.role = role;
    console.log(data);
    registerUser(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((e) => console.log(e));
  };

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
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Upload profile photo
            </p>

            <div className="space-y-2">
              <Label>I am a</Label>

              <div className="grid grid-cols-2 gap-2">
                {["Student", "Tutor"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      role === r
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

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
                  type="number"
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

            {/* Tutor Fields */}
            {/* {role === "Tutor" && (
              <div>
                <div className="space-y-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    placeholder="Tell us about yourself..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input id="experience" placeholder="e.g. 5 years" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Location
                    </span>
                  </Label>

                  <Input id="location" placeholder="e.g. Dhanmondi, Dhaka" />
                </div>

                <div className="space-y-2">
                  <Label>Qualifications</Label>

                  {qualifications.map((q, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder={`Qualification ${i + 1}`}
                        value={q}
                        onChange={(e) =>
                          updateField(setQualifications, i, e.target.value)
                        }
                      />

                      {qualifications.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => removeField(setQualifications, i)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => addField(setQualifications)}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Qualification
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Subjects</Label>

                  {subjects.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder={`Subject ${i + 1}`}
                        value={s}
                        onChange={(e) =>
                          updateField(setSubjects, i, e.target.value)
                        }
                      />

                      {subjects.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => removeField(setSubjects, i)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => addField(setSubjects)}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Subject
                  </Button>
                </div>
              </div>
            )} */}

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
