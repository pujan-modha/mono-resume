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
import { Input } from "@/components/ui/input";
import { ExportDataButton } from "@/components/ExportDataButton";
import { ImportDataButton } from "@/components/ImportDataButton";
import { Eraser } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
  onImport: (importedData: ResumeData, importedSectionOrder: string[]) => void;
  onReset: () => void;
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
  onImport,
  onReset,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
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
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className="border-2 p-4 mb-4 bg-blue-100 border-blue-400 text-blue-900 text-pretty">
        <p className="text-xs md:text-sm text-pretty">
          Tip: Include only relevant sections for a more concise and effective
          resume. You can rearrange or remove sections as needed for
          customization.
        </p>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <ExportDataButton data={data} sectionOrder={sectionOrder} />
          <ImportDataButton onImport={onImport} />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              <Button variant="destructive" className="hidden lg:flex">
                <Eraser className="mr-2 h-4 w-4" />
                Reset Data
              </Button>
              <Button
                onClick={onReset}
                variant="destructive"
                className="lg:hidden flex aspect-square p-0"
              >
                <Eraser className="h-4 w-4 m-auto" />
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will delete your resume data.
                You can export your data before resetting.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row items-center">
              <div className="mr-auto">
                <ExportDataButton data={data} sectionOrder={sectionOrder} />
              </div>
              <div className="flex space-x-2 ml-auto">
                <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onReset}
                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-neutral-50 bg-background"
                >
                  Reset
                </AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {/* Preview mode selection */}
        <div className="p-4 border-2">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="resume-has-pdf-preview"
                  checked={data.ResumeConfig.ResumeHasPDFPreview}
                  onCheckedChange={() => handlePreviewChange("PDF")}
                />
                <Label htmlFor="resume-has-pdf-preview">PDF Mode</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="resume-has-html-preview"
                  checked={data.ResumeConfig.ResumeHasHTMLPreview}
                  onCheckedChange={() => handlePreviewChange("HTML")}
                />
                <Label htmlFor="resume-has-html-preview">HTML Mode</Label>
              </div>
            </div>
          </div>
        </div>

        {/* HTML Configuration */}
        {data.ResumeConfig.ResumeHasHTMLPreview && (
          <div className="p-4 border-2">
            <h2 className="font-medium pb-2">HTML Configuration</h2>
            <div className="flex flex-col gap-2">
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
            </div>
          </div>
        )}

        {/* Header Information */}
        <div className="p-4 border-2">
          <h2 className="font-medium pb-2">Header Information</h2>
          <HeaderSection data={data} handleChange={handleChange} />
        </div>

        {/* Contact Information */}
        <div className="p-4 border-2">
          <h2 className="font-medium pb-2">Contact Information</h2>
          <ContactSection
            data={data}
            handleChange={handleChange}
            addItem={addItem}
            removeItem={removeItem}
          />
        </div>

        {/* Dynamic Sections */}
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
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="section-title">Section Title</Label>
                      <Input
                        id="section-title"
                        value={
                          data.ResumeTitles[
                            `${sectionKey}Title` as keyof typeof data.ResumeTitles
                          ] || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "ResumeTitles",
                            0,
                            `${sectionKey}Title`
                          )
                        }
                        placeholder="Title"
                        className="mb-4"
                      />
                    </div>
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
