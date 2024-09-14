import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ResumeData } from "@/app/types/ResumeData";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ProjectsSectionProps {
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
  addSubItem: (section: string, index: number, key: string) => void;
  removeSubItem: (
    section: string,
    index: number,
    key: string,
    subIndex: number
  ) => void;
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
  addSubItem,
  removeSubItem,
}) => {
  const handleProjectLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let value = e.target.value;
    if (
      value &&
      !value.startsWith("http://") &&
      !value.startsWith("https://")
    ) {
      value = `https://${value}`;
    }
    handleChange(e, "ProjectsData", index, "ProjectLink", value);
  };

  const handleProjectLinkCheckboxChange = (checked: boolean, index: number) => {
    handleChange(
      {
        target: { type: "checkbox", checked },
      } as React.ChangeEvent<HTMLInputElement>,
      "ProjectsData",
      index,
      "ProjectHasLink",
      checked.toString()
    );
    if (!checked) {
      handleChange(
        { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>,
        "ProjectsData",
        index,
        "ProjectLink",
        ""
      );
    }
  };

  return (
    <div className="space-y-4">
      {data.ProjectsData.map((project, index) => (
        <div key={index} className="space-y-4 border p-4">
          <div className="space-y-1">
            <Label htmlFor={`project-name-${index}`}>Project Name</Label>
            <Input
              id={`project-name-${index}`}
              value={project.ProjectName}
              onChange={(e) =>
                handleChange(e, "ProjectsData", index, "ProjectName")
              }
              placeholder="Project Name"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`project-has-link-${index}`}
                checked={project.ProjectHasLink}
                onCheckedChange={(checked) => {
                  handleProjectLinkCheckboxChange(checked as boolean, index);
                }}
              />
              <Label htmlFor={`project-has-link-${index}`}>Project Link</Label>
            </div>

            {project.ProjectHasLink && (
              <div className="space-y-1">
                <Input
                  id={`project-link-${index}`}
                  type="url"
                  value={project.ProjectLink?.replace(/^https?:\/\//, "") || ""}
                  onChange={(e) => handleProjectLinkChange(e, index)}
                  placeholder="Project Link"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 xl:gap-4">
            <div className="space-y-1">
              <Label htmlFor={`project-time-from-${index}`}>Start Date</Label>
              <Input
                id={`project-time-from-${index}`}
                value={project.ProjectTimeFrom}
                onChange={(e) =>
                  handleChange(e, "ProjectsData", index, "ProjectTimeFrom")
                }
                placeholder="Start Date"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`project-has-time-to-${index}`}
                  checked={project.ProjectHasTimeTo}
                  onCheckedChange={(checked) =>
                    handleChange(
                      {
                        target: { type: "checkbox", checked },
                      } as React.ChangeEvent<HTMLInputElement>,
                      "ProjectsData",
                      index,
                      "ProjectHasTimeTo"
                    )
                  }
                />
                <Label htmlFor={`project-has-time-to-${index}`}>End Date</Label>
              </div>

              {project.ProjectHasTimeTo && (
                <Input
                  id={`project-time-to-${index}`}
                  value={project.ProjectTimeTo}
                  onChange={(e) =>
                    handleChange(e, "ProjectsData", index, "ProjectTimeTo")
                  }
                  placeholder="End Date"
                />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`project-has-tech-stack-${index}`}
              checked={project.ProjectHasTechStack}
              onCheckedChange={(checked) =>
                handleChange(
                  {
                    target: { type: "checkbox", checked },
                  } as React.ChangeEvent<HTMLInputElement>,
                  "ProjectsData",
                  index,
                  "ProjectHasTechStack"
                )
              }
            />
            <Label htmlFor={`project-has-tech-stack-${index}`}>
              Tech Stack
            </Label>
          </div>

          {project.ProjectHasTechStack && (
            <Textarea
              id={`project-tech-stack-${index}`}
              value={project.ProjectTechStack || ""}
              onChange={(e) =>
                handleChange(e, "ProjectsData", index, "ProjectTechStack")
              }
              placeholder="Tech Stack (comma-separated)"
            />
          )}

          <div className="space-y-2">
            <Label>Description</Label>
            {Array.isArray(project.ProjectDescription) &&
              project.ProjectDescription.map((desc, descIndex) => (
                <div key={descIndex} className="flex items-center space-x-2">
                  <Button
                    type="button"
                    size={"icon"}
                    variant="destructive"
                    onClick={() =>
                      removeSubItem(
                        "ProjectsData",
                        index,
                        "ProjectDescription",
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
                        "ProjectsData",
                        index,
                        "ProjectDescription",
                        descIndex.toString()
                      )
                    }
                    placeholder="Description"
                    rows={1}
                  />
                </div>
              ))}
            <div className="flex w-full justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  addSubItem("ProjectsData", index, "ProjectDescription")
                }
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Description
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => removeItem("ProjectsData", index)}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Project
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button type="button" onClick={() => addItem("ProjectsData")}>
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Project
      </Button>
    </div>
  );
};

export default ProjectsSection;
