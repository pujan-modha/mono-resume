import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/app/types/ResumeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface PublicationsSectionProps {
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
const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
}) => (
  <div className="space-y-4">
    {data.PublicationsData.map((publication, index) => (
      <div key={index} className="space-y-4 border p-4">
        <div className="space-y-1">
          <Label htmlFor={`publication-title-${index}`}>Title</Label>
          <Input
            id={`publication-title-${index}`}
            value={publication.PublicationTitle || ""}
            onChange={(e) =>
              handleChange(e, "PublicationsData", index, "PublicationTitle")
            }
            placeholder="Publication Title"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`publication-authors-${index}`}>Authors</Label>
          <Input
            id={`publication-authors-${index}`}
            value={publication.PublicationAuthors || ""}
            onChange={(e) =>
              handleChange(e, "PublicationsData", index, "PublicationAuthors")
            }
            placeholder="Authors"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`publication-journal-${index}`}>Journal</Label>
          <Input
            id={`publication-journal-${index}`}
            value={publication.PublicationJournal || ""}
            onChange={(e) =>
              handleChange(e, "PublicationsData", index, "PublicationJournal")
            }
            placeholder="Journal"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`publication-year-${index}`}>Year</Label>
          <Input
            id={`publication-year-${index}`}
            value={publication.PublicationYear || ""}
            onChange={(e) =>
              handleChange(e, "PublicationsData", index, "PublicationYear")
            }
            placeholder="Year"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`publication-doi-${index}`}>DOI</Label>
          <Input
            id={`publication-doi-${index}`}
            value={publication.PublicationDOI || ""}
            onChange={(e) =>
              handleChange(e, "PublicationsData", index, "PublicationDOI")
            }
            placeholder="DOI"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeItem("PublicationsData", index)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Publication
          </Button>
        </div>
      </div>
    ))}
    <Button type="button" onClick={() => addItem("PublicationsData")}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
      Publication
    </Button>
  </div>
);

export default PublicationsSection;
