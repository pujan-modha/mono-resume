import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/app/types/ResumeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface VolunteeringSectionProps {
  data: ResumeData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index: number,
    key: string,
    value?: string
  ) => void;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.VolunteeringData.map((volunteering, index) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="space-y-1">
          <Label htmlFor={`volunteering-title-${index}`}>Title</Label>
          <Input
            id={`volunteering-title-${index}`}
            value={volunteering.VolunteeringTitle || ""}
            onChange={(e) =>
              handleChange(e, "VolunteeringData", index, "VolunteeringTitle")
            }
            placeholder="Volunteering Title"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`volunteering-organization-${index}`}>
            Organization
          </Label>
          <Input
            id={`volunteering-organization-${index}`}
            value={volunteering.VolunteeringOrganization || ""}
            onChange={(e) =>
              handleChange(
                e,
                "VolunteeringData",
                index,
                "VolunteeringOrganization"
              )
            }
            placeholder="Organization"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`volunteering-year-${index}`}>Year</Label>
          <Input
            id={`volunteering-year-${index}`}
            value={volunteering.VolunteeringYear || ""}
            onChange={(e) =>
              handleChange(e, "VolunteeringData", index, "VolunteeringYear")
            }
            placeholder="Year"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("VolunteeringData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Volunteering
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("VolunteeringData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Volunteering
    </Button>
  </div>
);

export default VolunteeringSection;
