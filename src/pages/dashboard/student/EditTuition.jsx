import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { ArrowLeft, Plus, X } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../../components/LoadingSpinner";

const EditTuition = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: tuition = {}, isLoading: tuitionLoading } = useQuery({
    queryKey: ["edit-tuition-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/tuition-details/${id}`);
      return res.data;
    },
  });

  const {
    register,
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: tuition?._id
      ? {
          subject: tuition.subject || "",
          class: tuition.class || "",
          medium: tuition.medium || "",
          budget: tuition.budget || "",
          location: tuition.location || "",
          description: tuition.description || "",
          schedule: tuition.schedule || "",
          requirements: tuition.requirements?.map((r) => ({ value: r })) || [
            { value: "" },
          ],
        }
      : undefined,
  });

  const {
    fields: requirements = [""],
    append,
    remove,
  } = useFieldArray({
    control,
    name: "requirements",
  });

  //   useEffect(() => {
  //     if (!tuition?._id) return;

  //     reset({
  //       subject: tuition?.subject || "",
  //       class: tuition?.class || "",
  //       budget: tuition?.budget || "",
  //       location: tuition?.location || "",
  //       description: tuition?.description || "",
  //       schedule: tuition?.schedule || "",
  //       medium: tuition?.medium || "",
  //       requirements: tuition?.requirements?.map((r) => ({ value: r })) || [
  //         { value: "" },
  //       ],
  //     });
  //   }, [tuition, reset]);

  const handleOnSubmit = async (data) => {
    try {
      const formattedRequirements = data.requirements.map((r) => r.value);
      const updatedTuition = {
        userEmail: user?.email,
        subject: data.subject,
        class: data.class,
        budget: Number(data.budget),
        schedule: data.schedule,
        medium: data.medium,
        location: data.location,
        description: data.description,
        requirements: formattedRequirements,
      };
      await axiosSecure.patch(`/api/update-tuition/${id}`, updatedTuition);
      toast.success("Tuition Updated Successful.");
      navigate("/dashboard/my-tuitions");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        <Button
          variant="default"
          size="icon"
          onClick={() => navigate("/dashboard/my-tuitions")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Tuition</h1>

          <p className="text-muted-foreground">
            Update your tuition post details
          </p>
        </div>
      </div>

      {tuitionLoading && <LoadingSpinner></LoadingSpinner>}

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="mt-6 max-w-2xl space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              {...register("subject", { required: true })}
              id="subject"
              placeholder="e.g. Mathematics"
            />
            {errors.subject?.type === "required" && (
              <p className="text-red-500 text-sm">Subject is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Controller
              name="class"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
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
              )}
            ></Controller>
            {errors.class?.type === "required" && (
              <p className="text-red-500 text-sm">Class is required</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register("location", { required: true })}
              id="location"
              placeholder="e.g. Dhanmondi, Dhaka"
            />
            {errors.location?.type === "required" && (
              <p className="text-red-500 text-sm">Location is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (Monthly)</Label>
            <Input
              {...register("budget", { required: true })}
              id="budget"
              placeholder="e.g. ৳5,000"
            />
            {errors.budget?.type === "required" && (
              <p className="text-red-500 text-sm">Budget is required</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              {...register("schedule", { required: true })}
              id="schedule"
              placeholder="e.g. Sun, Tue, Thu - 5PM"
            />
            {errors.schedule?.type === "required" && (
              <p className="text-red-500 text-sm">Schedule is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="medium">Medium</Label>
            <Controller
              name="medium"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
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
              )}
            ></Controller>
            {errors.medium?.type === "required" && (
              <p className="text-red-500 text-sm">Medium is required</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description", { required: true })}
            id="description"
            placeholder="Add description..."
            rows={1}
          />
          {errors.description?.type === "required" && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Requirements</Label>

          {requirements.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  {...register(`requirements.${index}.value`, {
                    validate: (value) =>
                      value.trim() !== "" || "Requirement cannot be empty",
                  })}
                  onChange={(e) => {
                    register(`requirements.${index}.value`).onChange(e);
                    trigger("requirements");
                  }}
                  placeholder={`Requirement ${index + 1}`}
                />

                {errors.requirements?.[index]?.value && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.requirements[index].value.message}
                  </p>
                )}
              </div>

              {requirements.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => remove(index)}
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
            onClick={() => append({ value: "" })}
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

export default EditTuition;
