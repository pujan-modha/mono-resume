import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ResumeData } from "@/app/types/ResumeData";

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
  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    linkType: string
  ) => {
    const value = e.target.value.trim();
    let fullValue = value;

    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      fullValue = `https://${value}`;
    }

    handleChange(
      { target: { value: fullValue, type: "text" } } as React.ChangeEvent<HTMLInputElement>,
      "ProjectsData",
      index,
      linkType
    );
  };

  return (
    <div className="space-y-4">
      {data.ProjectsData.map((project, index) => (
        <div key={index} className="space-y-4 border p-4">
          <div className="space-y-1">
            <Label htmlFor={`project-name-${index}`}>Project Name</Label>
            <Input
              id={`project-name-${index}`}
              value={project.ProjectName || ""}
              onChange={(e) =>
                handleChange(e, "ProjectsData", index, "ProjectName")
              }
              placeholder="Project Name"
            />
          </div>

          {/* Project Link */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`project-has-link-${index}`}
                checked={project.ProjectHasLink}
                onCheckedChange={(checked) =>
                  handleChange(
                    {
                      target: { type: "checkbox", checked },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "ProjectsData",
                    index,
                    "ProjectHasLink"
                  )
                }
              />
              <Label htmlFor={`project-has-link-${index}`}>Project Link</Label>
            </div>
            {project.ProjectHasLink && (
              <Input
                id={`project-link-${index}`}
                type="url"
                value={project.ProjectLink?.replace(/^https?:\/\//, "") || ""}
                onChange={(e) => handleLinkChange(e, index, "ProjectLink")}
                placeholder="Project Link"
              />
            )}
          </div>

          {/* GitHub Link */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`project-has-github-${index}`}
                checked={project.ProjectHasGitHub}
                onCheckedChange={(checked) =>
                  handleChange(
                    {
                      target: { type: "checkbox", checked },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "ProjectsData",
                    index,
                    "ProjectHasGitHub"
                  )
                }
              />
              <Label htmlFor={`project-has-github-${index}`}>GitHub Link</Label>
            </div>
            {project.ProjectHasGitHub && (
              <Input
                id={`project-github-link-${index}`}
                type="url"
                value={project.ProjectGitHubLink?.replace(/^https?:\/\//, "") || ""}
                onChange={(e) => handleLinkChange(e, index, "ProjectGitHubLink")}
                placeholder="GitHub Link"
              />
            )}
          </div>

          {/* GitLab Link */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`project-has-gitlab-${index}`}
                checked={project.ProjectHasGitLab}
                onCheckedChange={(checked) =>
                  handleChange(
                    {
                      target: { type: "checkbox", checked },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "ProjectsData",
                    index,
                    "ProjectHasGitLab"
                  )
                }
              />
              <Label htmlFor={`project-has-gitlab-${index}`}>GitLab Link</Label>
            </div>
            {project.ProjectHasGitLab && (
              <Input
                id={`project-gitlab-link-${index}`}
                type="url"
                value={project.ProjectGitLabLink?.replace(/^https?:\/\//, "") || ""}
                onChange={(e) => handleLinkChange(e, index, "ProjectGitLabLink")}
                placeholder="GitLab Link"
              />
            )}
          </div>

          {/* Other Link */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`project-has-other-link-${index}`}
                checked={project.ProjectHasOtherLink}
                onCheckedChange={(checked) =>
                  handleChange(
                    {
                      target: { type: "checkbox", checked },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "ProjectsData",
                    index,
                    "ProjectHasOtherLink"
                  )
                }
              />
              <Label htmlFor={`project-has-other-link-${index}`}>Other Link</Label>
            </div>
            {project.ProjectHasOtherLink && (
              <Input
                id={`project-other-link-${index}`}
                type="url"
                value={project.ProjectOtherLink?.replace(/^https?:\/\//, "") || ""}
                onChange={(e) => handleLinkChange(e, index, "ProjectOtherLink")}
                placeholder="Other Link"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 xl:gap-4">
            <div className="space-y-1">
              <Label htmlFor={`project-time-from-${index}`}>Start Date</Label>
              <Input
                id={`project-time-from-${index}`}
                value={project.ProjectTimeFrom || ""}
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
                  value={project.ProjectTimeTo || ""}
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
