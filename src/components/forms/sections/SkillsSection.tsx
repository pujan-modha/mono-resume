import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/app/types/ResumeData";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface SkillsSectionProps {
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
const SkillsSection: React.FC<SkillsSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.SkillsData.map((skill, index) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="space-y-1">
          <Label htmlFor={`skills-title-${index}`}>Skill Category</Label>
          <Input
            id={`skills-title-${index}`}
            value={skill.SkillsTitle || ""}
            onChange={(e) =>
              handleChange(e, "SkillsData", index, "SkillsTitle")
            }
            placeholder="Skills Category"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`skills-name-${index}`}>
            Skills <span className="opacity-50">(Comma-separated)</span>
          </Label>
          <Textarea
            id={`skills-name-${index}`}
            value={skill.SkillsName || ""}
            onChange={(e) => handleChange(e, "SkillsData", index, "SkillsName")}
            placeholder="Enter skills (comma-separated)"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("SkillsData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Skill Category
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("SkillsData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Skill Category
    </Button>
  </div>
);

export default SkillsSection;
