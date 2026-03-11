import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const StudentProfileSettings = ({ role = "student" }) => {
  const [name, setName] = useState("Ahmed Rahman");
  const [phone, setPhone] = useState("+880 1712-345678");
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <p className="text-muted-foreground">Update your personal information</p>

      <form onSubmit={handleSave} className="mt-6 max-w-lg space-y-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-heading text-2xl font-bold text-primary">
                  AR
                </span>
              )}
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
            value="ahmed@example.com"
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
