import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface EducationSectionProps {
  data: any;
  handleChange: any;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.EducationData.map((education: any, index: number) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="space-y-1">
          <Label htmlFor={`education-institution-${index}`}>
            Institution Name
          </Label>
          <Input
            id={`education-institution-${index}`}
            value={education.EducationInstitutionName || ""}
            onChange={(e) =>
              handleChange(
                e,
                "EducationData",
                index,
                "EducationInstitutionName"
              )
            }
            placeholder="Institution Name"
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-1">
            <Label htmlFor={`education-course-${index}`}>Course</Label>
            <Input
              id={`education-course-${index}`}
              value={education.EducationCourseName || ""}
              onChange={(e) =>
                handleChange(e, "EducationData", index, "EducationCourseName")
              }
              placeholder="Course Name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`education-major-${index}`}>Major</Label>
            <Input
              id={`education-major-${index}`}
              value={education.EducationMajor || ""}
              onChange={(e) =>
                handleChange(e, "EducationData", index, "EducationMajor")
              }
              placeholder="Major"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-1">
            <Label htmlFor={`education-from-${index}`}>Time From</Label>
            <Input
              id={`education-from-${index}`}
              value={education.EducationFromTime || ""}
              onChange={(e) =>
                handleChange(e, "EducationData", index, "EducationFromTime")
              }
              placeholder="From"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`education-to-${index}`}>Time To</Label>
            <Input
              id={`education-to-${index}`}
              value={education.EducationToTime || ""}
              onChange={(e) =>
                handleChange(e, "EducationData", index, "EducationToTime")
              }
              placeholder="To"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`education-has-minor-${index}`}
                checked={education.EducationHasMinor}
                onCheckedChange={(checked) =>
                  handleChange(
                    { target: { type: "checkbox", checked } },
                    "EducationData",
                    index,
                    "EducationHasMinor"
                  )
                }
              />
              <Label htmlFor={`education-has-minor-${index}`}>Minor</Label>
            </div>
            {education.EducationHasMinor && (
              <Input
                id={`education-minor-${index}`}
                value={education.EducationMinor || ""}
                onChange={(e) =>
                  handleChange(e, "EducationData", index, "EducationMinor")
                }
                placeholder="Minor"
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`education-has-specialization-${index}`}
                checked={education.EducationHasSpecialization}
                onCheckedChange={(checked) =>
                  handleChange(
                    { target: { type: "checkbox", checked } },
                    "EducationData",
                    index,
                    "EducationHasSpecialization"
                  )
                }
              />
              <Label htmlFor={`education-has-specialization-${index}`}>
                Specialization
              </Label>
            </div>
            {education.EducationHasSpecialization && (
              <Input
                id={`education-specialization-${index}`}
                value={education.EducationSpecialization || ""}
                onChange={(e) =>
                  handleChange(
                    e,
                    "EducationData",
                    index,
                    "EducationSpecialization"
                  )
                }
                placeholder="Specialization"
              />
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`education-has-gpa-${index}`}
              checked={education.EducationHasGPA}
              onCheckedChange={(checked) =>
                handleChange(
                  { target: { type: "checkbox", checked } },
                  "EducationData",
                  index,
                  "EducationHasGPA"
                )
              }
            />
            <Label htmlFor={`education-has-gpa-${index}`}>GPA</Label>
          </div>
          {education.EducationHasGPA && (
            <Input
              id={`education-gpa-${index}`}
              value={education.EducationGPA || ""}
              onChange={(e) =>
                handleChange(e, "EducationData", index, "EducationGPA")
              }
              placeholder="GPA"
            />
          )}
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("EducationData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Education
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("EducationData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Education
    </Button>
  </div>
);

export default EducationSection;
