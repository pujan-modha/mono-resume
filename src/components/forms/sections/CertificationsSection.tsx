import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface CertificationsSectionProps {
  data: any;
  handleChange: any;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.CertificationsData.map((certification: any, index: number) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="grid lg:grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-1">
            <Label htmlFor={`certification-course-name-${index}`}>
              Course Name
            </Label>
            <Input
              id={`certification-course-name-${index}`}
              value={certification.certificationCourseName || ""}
              onChange={(e) =>
                handleChange(
                  e,
                  "CertificationsData",
                  index,
                  "certificationCourseName"
                )
              }
              placeholder="Course Name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`certification-platform-name-${index}`}>
              Course Platform
            </Label>
            <Input
              id={`certification-platform-name-${index}`}
              value={certification.certificationCoursePlatformName || ""}
              onChange={(e) =>
                handleChange(
                  e,
                  "CertificationsData",
                  index,
                  "certificationCoursePlatformName"
                )
              }
              placeholder="Course Platform Name"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-2 xl:gap-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`certification-has-course-link-${index}`}
                checked={certification.certificationHaveCourseLink}
                onCheckedChange={(checked) =>
                  handleChange(
                    { target: { type: "checkbox", checked } },
                    "CertificationsData",
                    index,
                    "certificationHaveCourseLink"
                  )
                }
              />
              <Label htmlFor={`certification-has-course-link-${index}`}>
                Course Link
              </Label>
            </div>
            {certification.certificationHaveCourseLink && (
              <Input
                id={`certification-course-link-${index}`}
                className="w-full"
                type="url"
                value={certification.certificationLinkToCourse || ""}
                onChange={(e) =>
                  handleChange(
                    e,
                    "CertificationsData",
                    index,
                    "certificationLinkToCourse"
                  )
                }
                placeholder="Course Link"
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mt-2 lg:mt-0">
              <Checkbox
                id={`certification-has-certificate-${index}`}
                checked={certification.certificationHaveCertificate}
                onCheckedChange={(checked) =>
                  handleChange(
                    { target: { type: "checkbox", checked } },
                    "CertificationsData",
                    index,
                    "certificationHaveCertificate"
                  )
                }
              />
              <Label htmlFor={`certification-has-certificate-${index}`}>
                Certificate Link
              </Label>
            </div>
            {certification.certificationHaveCertificate && (
              <Input
                id={`certification-certificate-link-${index}`}
                type="url"
                value={certification.certificationLinkToCertificate || ""}
                onChange={(e) =>
                  handleChange(
                    e,
                    "CertificationsData",
                    index,
                    "certificationLinkToCertificate"
                  )
                }
                placeholder="Certificate Link"
              />
            )}
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("CertificationsData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Certification
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("CertificationsData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Certification
    </Button>
  </div>
);

export default CertificationsSection;
