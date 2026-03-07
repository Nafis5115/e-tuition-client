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
          <Label htmlFor="description">Additional Details</Label>
          <Textarea
            id="description"
            placeholder="Any specific requirements..."
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <Button type="submit" size="lg">
          Submit Tuition Post
        </Button>
      </form>
    </div>
  );
};

export default PostTuition;
