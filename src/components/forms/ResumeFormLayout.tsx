import React from "react";
import HeaderSection from "./sections/HeaderSection";
import ContactSection from "./sections/ContactSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificationsSection from "./sections/CertificationsSection";
import AchievementsSection from "./sections/AchievementsSection";
import OverviewSection from "./sections/OverviewSection";
import VolunteeringSection from "./sections/VolunteeringSection";
import PublicationsSection from "./sections/PublicationsSection";
import ExtracurricularSection from "./sections/ExtracurricularSection";
import { ResumeData } from "../../app/schemas/ResumeSchema";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ResumeFormLayoutProps {
  data: ResumeData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index: number,
    field: string
  ) => void;
  addItem: (section: string) => void;
  removeItem: (section: string, index: number) => void;
  addSubItem: (section: string, index: number, field: string) => void;
  removeSubItem: (
    section: string,
    index: number,
    field: string,
    subIndex: number
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleVisibilityChange: (section: keyof ResumeData["ResumeConfig"]) => void;
  moveSection: (section: string, direction: "up" | "down") => void;
  sectionOrder: string[];
}

const ResumeFormLayout: React.FC<ResumeFormLayoutProps> = ({
  data,
  handleChange,
  addItem,
  removeItem,
  addSubItem,
  removeSubItem,
  handleSubmit,
  handleVisibilityChange,
  moveSection,
  sectionOrder,
}) => {
  const sectionComponents = {
    Overview: OverviewSection,
    Education: EducationSection,
    Skills: SkillsSection,
    Experience: ExperienceSection,
    Publications: PublicationsSection,
    Projects: ProjectsSection,
    Certifications: CertificationsSection,
    Achievements: AchievementsSection,
    Extracurricular: ExtracurricularSection,
    Volunteering: VolunteeringSection,
  };

  const handlePreviewChange = (previewType: "PDF" | "HTML") => {
    const isPDFChecked = data.ResumeConfig.ResumeHasPDFPreview;
    const isHTMLChecked = data.ResumeConfig.ResumeHasHTMLPreview;

    if (previewType === "PDF") {
      if (!isPDFChecked || isHTMLChecked) {
        handleVisibilityChange("ResumeHasPDFPreview");
        if (isHTMLChecked) {
          handleVisibilityChange("ResumeHasHTMLPreview");
        }
      }
    } else {
      if (!isHTMLChecked || isPDFChecked) {
        handleVisibilityChange("ResumeHasHTMLPreview");
        if (isPDFChecked) {
          handleVisibilityChange("ResumeHasPDFPreview");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Accordion type="multiple" className="space-y-4">
        <div className="p-4 border-2">
          <h2 className="font-medium pb-2">Configuration</h2>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="resume-has-pdf-preview"
                  checked={data.ResumeConfig.ResumeHasPDFPreview}
                  onCheckedChange={() => handlePreviewChange("PDF")}
                />
                <Label htmlFor="resume-has-pdf-preview">PDF Preview</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="resume-has-html-preview"
                  checked={data.ResumeConfig.ResumeHasHTMLPreview}
                  onCheckedChange={() => handlePreviewChange("HTML")}
                />
                <Label htmlFor="resume-has-html-preview">HTML Preview</Label>
              </div>
            </div>
            {data.ResumeConfig.ResumeHasHTMLPreview && (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="resume-has-background-pattern"
                    checked={data.ResumeConfig.ResumeHasBackgroundPattern}
                    onCheckedChange={() =>
                      handleVisibilityChange("ResumeHasBackgroundPattern")
                    }
                  />
                  <Label htmlFor="resume-has-background-pattern">
                    BG Pattern
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="resume-has-light-background"
                    checked={data.ResumeConfig.ResumeHasLightBackground}
                    onCheckedChange={() =>
                      handleVisibilityChange("ResumeHasLightBackground")
                    }
                  />
                  <Label htmlFor="resume-has-light-background">Light BG</Label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-2">
          <h2 className="font-medium pb-2">Header Information</h2>
          <HeaderSection data={data} handleChange={handleChange} />
        </div>

        <div className="p-4 border-2">
          <h2 className="font-medium pb-2">Contact Information</h2>
          <ContactSection
            data={data}
            handleChange={handleChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        </div>

        {sectionOrder.map((sectionKey, index) => {
          const SectionComponent =
            sectionComponents[sectionKey as keyof typeof sectionComponents];
          const configKey =
            `ResumeHas${sectionKey}` as keyof ResumeData["ResumeConfig"];
          return (
            <div key={sectionKey} className="relative">
              <div className="flex items-center my-4">
                <Checkbox
                  checked={data.ResumeConfig[configKey]}
                  onCheckedChange={() => handleVisibilityChange(configKey)}
                />
                <Label className="ml-2">{sectionKey}</Label>
                {data.ResumeConfig[configKey] && (
                  <div className="absolute right-0 flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => moveSection(sectionKey, "up")}
                      disabled={index === 0}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => moveSection(sectionKey, "down")}
                      disabled={index === sectionOrder.length - 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
              {data.ResumeConfig[configKey] && (
                <AccordionItem
                  className="px-4"
                  value={sectionKey.toLowerCase()}
                >
                  <AccordionTrigger>{sectionKey}</AccordionTrigger>
                  <AccordionContent>
                    <SectionComponent
                      data={data}
                      handleChange={handleChange}
                      addItem={addItem}
                      removeItem={removeItem}
                      addSubItem={addSubItem}
                      removeSubItem={removeSubItem}
                    />
                  </AccordionContent>
                </AccordionItem>
              )}
            </div>
          );
        })}
      </Accordion>
    </form>
  );
};

export default ResumeFormLayout;
