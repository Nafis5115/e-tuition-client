import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Camera, Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "../../../components/ui/textarea";
import useRole from "../../../hooks/useRole";

const TutorProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL);
  const [phoneError, setPhoneError] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { role } = useRole();

  const { data: phoneData = {}, isLoading: phoneLoading } = useQuery({
    queryKey: ["user-phone", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/get-user-phone?email=${user?.email}`,
      );

      return res.data;
    },
  });

  const { data: tutor = {} } = useQuery({
    queryKey: ["tutor-details", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/tutor-details?email=${user?.email}`,
      );

      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
    },
  });
  const name = watch("name");
  const {
    fields: subjects = [""],
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  const {
    fields: qualifications = [""],
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });
  useEffect(() => {
    if (!tutor || Object.keys(tutor).length === 0) return;

    reset({
      name: user?.displayName || "",
      phone: phoneData?.phone || "",
      about: tutor?.about || "",
      experience: tutor?.experience || "",
      location: tutor?.location || "",
      qualifications: tutor?.qualifications?.map((q) => ({ value: q })) || [
        { value: "" },
      ],
      subjects: tutor?.subjects?.map((s) => ({ value: s })) || [{ value: "" }],
    });
  }, [tutor, phoneData?.phone]);
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else if (user?.photoURL) {
      setPhotoPreview(user?.photoURL);
    }
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
    const res = await axios.post(imageApiUrl, formData);
    return res.data.data.url;
  };

  const handleOnSubmit = async (data) => {
    if (!data.phone || data.phone.trim() === "") {
      setPhoneError("Phone number is required!");
      return;
    }
    setPhoneError("");
    try {
      setLoading(true);
      const formattedQualifications = data.qualifications.map((r) => r.value);
      const formattedSubjects = data.subjects.map((r) => r.value);
      let photoURL = user?.photoURL;
      if (photoFile) {
        photoURL = await uploadImage(photoFile);
      }

      await updateUserProfile({ displayName: data.name, photoURL: photoURL });
      await axiosSecure.patch(`/api/update-user-profile`, {
        name: data.name,
        phone: data.phone,
        email: user?.email,
      });
      await axiosSecure.patch(`/api/update-tutorProfile?email=${user?.email}`, {
        name: data.name,
        about: data.about,
        experience: data.experience,
        location: data.location,
        qualifications: formattedQualifications,
        subjects: formattedSubjects,
      });
      toast.success("Profile updated successfully!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went Wrong.");
    }
  };

  if (loading || phoneLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <p className="text-muted-foreground">Update your personal information</p>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="mt-6 max-w-lg space-y-6"
      >
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              <img
                src={photoPreview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <label
              htmlFor="photo"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Camera className="h-3.5 w-3.5" />
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground capitalize">{role}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("name")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user?.email}
            disabled
            className="opacity-60"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNum">Phone</Label>
          <Input id="phoneNum" {...register("phone")} />
          <p className="text-red-500 text-sm">{phoneError}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            value={tutor?.about}
            {...register("about", { required: true })}
            id="about"
            placeholder="Tell us about yourself..."
            className="min-h-[80px]"
          />
          {errors.about?.type === "required" && (
            <p className="text-red-500 text-sm">About is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          <Input
            type="number"
            {...register("experience", { required: true })}
            id="experience"
            placeholder="e.g. 5 years"
          />
          {errors.about?.type === "required" && (
            <p className="text-red-500 text-sm">Experience is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">
            <span className="flex items-center gap-1">Location</span>
          </Label>

          <Input
            {...register("location", { required: true })}
            id="location"
            placeholder="e.g. Dhanmondi, Dhaka"
          />
          {errors.about?.type === "required" && (
            <p className="text-red-500 text-sm">Location is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Qualifications</Label>

          {qualifications.map((q, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <Input
                  {...register(`qualifications.${i}.value`, {
                    validate: (value) =>
                      value.trim() !== "" || "Qualification cannot be empty",
                  })}
                  onChange={(e) => {
                    register(`qualifications.${i}.value`).onChange(e);
                    trigger("qualifications");
                  }}
                  placeholder={`Qualification ${i + 1}`}
                />
                {errors.qualifications?.[i]?.value && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.qualifications[i].value.message}
                  </p>
                )}
              </div>
              {qualifications.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => removeQualification(i)}
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
            onClick={() => appendQualification({ value: "" })}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Add Qualification
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Subjects</Label>

          {subjects.map((s, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <Input
                  {...register(`subjects.${i}.value`, {
                    validate: (value) =>
                      value.trim() !== "" || "Subject cannot be empty",
                  })}
                  onChange={(e) => {
                    register(`subjects.${i}.value`).onChange(e);
                    trigger("subjects");
                  }}
                  placeholder={`Subject ${i + 1}`}
                />
                {errors.subjects?.[i]?.value && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subjects[i].value.message}
                  </p>
                )}
              </div>

              {subjects.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => removeSubject(i)}
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
            onClick={() => appendSubject({ value: "" })}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Add Subject
          </Button>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default TutorProfileSettings;
