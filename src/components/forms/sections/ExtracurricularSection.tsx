import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface ExtracurricularSectionProps {
  data: any;
  handleChange: any;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.ExtracurricularData.map((extracurricular: any, index: number) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="space-y-1">
          <Label htmlFor={`extracurricular-title-${index}`}>Title</Label>
          <Input
            id={`extracurricular-title-${index}`}
            value={extracurricular.ExtracurricularTitle || ""}
            onChange={(e) =>
              handleChange(
                e,
                "ExtracurricularData",
                index,
                "ExtracurricularTitle"
              )
            }
            placeholder="Extracurricular Title"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`extracurricular-organization-${index}`}>
            Organization
          </Label>
          <Input
            id={`extracurricular-organization-${index}`}
            value={extracurricular.ExtracurricularOrganization || ""}
            onChange={(e) =>
              handleChange(
                e,
                "ExtracurricularData",
                index,
                "ExtracurricularOrganization"
              )
            }
            placeholder="Organization"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`extracurricular-years-${index}`}>Years</Label>
          <Input
            id={`extracurricular-years-${index}`}
            value={extracurricular.ExtracurricularYears || ""}
            onChange={(e) =>
              handleChange(
                e,
                "ExtracurricularData",
                index,
                "ExtracurricularYears"
              )
            }
            placeholder="Years"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("ExtracurricularData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Extracurricular
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("ExtracurricularData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Extracurricular
    </Button>
  </div>
);

export default ExtracurricularSection;
