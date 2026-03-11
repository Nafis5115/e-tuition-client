import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

const PostTuition = () => {
  const [formData, setFormData] = useState({
    subject: "",
    class: "",
    location: "",
    budget: "",
    schedule: "",
    description: "",
    medium: "",
  });

  const [requirements, setRequirements] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Tuition post created successfully! Awaiting admin approval.",
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Post New Tuition</h1>
      <p className="text-muted-foreground">
        Create a tuition post to find the perfect tutor
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Mathematics"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select
              onValueChange={(v) => setFormData({ ...formData, class: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={`Class ${i + 1}`}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Dhanmondi, Dhaka"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (Monthly)</Label>
            <Input
              id="budget"
              placeholder="e.g. ৳5,000"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              placeholder="e.g. Sun, Tue, Thu - 5PM"
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medium">Medium</Label>
            <Select
              onValueChange={(v) => setFormData({ ...formData, medium: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bangla">Bangla Medium</SelectItem>
                <SelectItem value="English">English Medium</SelectItem>
                <SelectItem value="Madrasa">Madrasa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Add description..."
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Requirements</Label>

          {requirements.map((q, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder={`Requirement ${i + 1}`}
                value={q}
                onChange={(e) =>
                  updateField(setRequirements, i, e.target.value)
                }
              />

              {requirements.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => removeField(setRequirements, i)}
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
            onClick={() => addField(setRequirements)}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Add Requirement
          </Button>
        </div>

        <Button type="submit" size="lg">
          Submit Tuition Post
        </Button>
      </form>
    </div>
  );
};

export default PostTuition;

const addField = (setter) => {
  setter((prev) => [...prev, ""]);
};
const removeField = (setter, index) => {
  setter((prev) => prev.filter((_, i) => i !== index));
};
const updateField = (setter, index, value) => {
  setter((prev) => prev.map((v, i) => (i === index ? value : v)));
};
