import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";

const StudentProfileSettings = ({ role = "student" }) => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL);
  const [phone, setPhone] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { data: phoneData = {} } = useQuery({
    queryKey: ["user-phone", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/get-user-phone?email=${user?.email}`,
      );

      return res.data;
    },
  });

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

  useEffect(() => {
    if (phoneData?.phone) {
      setPhone(phoneData.phone);
    }
  }, [phoneData]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let photoURL = user?.photoURL;
      if (photoFile) {
        photoURL = await uploadImage(photoFile);
      }

      await updateUserProfile({ displayName: name, photoURL: photoURL });
      await axiosSecure.patch(`/api/update-user-profile`, {
        name: name,
        phone: phone,
      });
      toast.success("Profile updated successfully!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went Wrong.");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <p className="text-muted-foreground">Update your personal information</p>

      <form onSubmit={handleSave} className="mt-6 max-w-lg space-y-6">
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
          <Input
            id="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            id="phoneNum"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default StudentProfileSettings;
