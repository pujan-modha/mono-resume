import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Label } from "@/components/ui/label";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ExperienceSectionProps {
  data: any;
  handleChange: any;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
  addSubItem: (section: string, index: number, subSection: string) => void;
  removeSubItem: (
    section: string,
    index: number,
    subSection: string,
    subIndex: number
  ) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
  addSubItem,
  removeSubItem,
}) => (
  <div className="space-y-4">
    {data.ExperienceData.map((experience: any, index: number) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="space-y-1">
          <Label htmlFor={`experience-organization-${index}`}>
            Organization
          </Label>
          <Input
            id={`experience-organization-${index}`}
            value={experience.ExperienceOrganization || ""}
            onChange={(e) =>
              handleChange(e, "ExperienceData", index, "ExperienceOrganization")
            }
            placeholder="Organization"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`experience-work-title-${index}`}>Work Title</Label>
          <Input
            id={`experience-work-title-${index}`}
            value={experience.ExperienceWorkTitle || ""}
            onChange={(e) =>
              handleChange(e, "ExperienceData", index, "ExperienceWorkTitle")
            }
            placeholder="Work Title"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-1">
            <Label htmlFor={`experience-time-from-${index}`}>Time From</Label>
            <Input
              id={`experience-time-from-${index}`}
              value={experience.ExperienceTimeFrom || ""}
              onChange={(e) =>
                handleChange(e, "ExperienceData", index, "ExperienceTimeFrom")
              }
              placeholder="Time From"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`experience-time-to-${index}`}>Time To</Label>
            <Input
              id={`experience-time-to-${index}`}
              value={experience.ExperienceTimeTo || ""}
              onChange={(e) =>
                handleChange(e, "ExperienceData", index, "ExperienceTimeTo")
              }
              placeholder="Time To"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`experience-location-${index}`}>Location</Label>
          <Input
            id={`experience-location-${index}`}
            value={experience.ExperienceLocation || ""}
            onChange={(e) =>
              handleChange(e, "ExperienceData", index, "ExperienceLocation")
            }
            placeholder="Location"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          {Array.isArray(experience.ExperienceDescription) &&
            experience.ExperienceDescription.map(
              (desc: any, descIndex: number) => (
                <div key={descIndex} className="flex items-center space-x-2">
                  <Button
                    type="button"
                    size={"icon"}
                    variant="destructive"
                    onClick={() =>
                      removeSubItem(
                        "ExperienceData",
                        index,
                        "ExperienceDescription",
                        descIndex
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Textarea
                    value={desc}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "ExperienceData",
                        index,
                        "ExperienceDescription",
                        descIndex
                      )
                    }
                    placeholder="Description"
                    rows={1}
                  />
                </div>
              )
            )}
          <div className="flex w-full justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                addSubItem("ExperienceData", index, "ExperienceDescription")
              }
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Description
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeItem("ExperienceData", index)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Experience
            </Button>
          </div>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("ExperienceData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Experience
    </Button>
  </div>
);

export default ExperienceSection;
