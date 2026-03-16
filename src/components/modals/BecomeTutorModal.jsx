import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { MapPin, Plus, X } from "lucide-react";
import { Label } from "../ui/label";

const BecomeTutorModal = () => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualifications: [{ value: "" }],
      subjects: [{ value: "" }],
    },
  });
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

  const handleOnSubmit = (data) => {
    const formattedQualifications = data.qualifications.map((r) => r.value);
    const formattedSubjects = data.subjects.map((r) => r.value);
    data.qualifications = formattedQualifications;
    data.subjects = formattedSubjects;
    console.log(data);
  };
  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Become a Tutor</DialogTitle>
        <DialogDescription>
          Apply to become a tutor on eTuitionBd.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
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
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Location
              </span>
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
                        value.trim() !== "" || "Requirement cannot be empty",
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
                        value.trim() !== "" || "Requirement cannot be empty",
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
        </div>
        <Button type="submit" className="w-full mt-4">
          Submit Application
        </Button>
      </form>
    </DialogContent>
  );
};

export default BecomeTutorModal;
