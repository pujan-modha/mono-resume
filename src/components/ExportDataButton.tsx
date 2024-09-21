import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ResumeData } from "@/app/schemas/ResumeSchema";

interface ExportDataButtonProps {
  data: ResumeData;
  sectionOrder: string[];
}

export function ExportDataButton({
  data,
  sectionOrder,
}: ExportDataButtonProps) {
  const handleExport = () => {
    const exportData = {
      resumeData: data,
      sectionOrder: sectionOrder,
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/mono" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "resume.mono";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Button
        onClick={handleExport}
        variant="outline"
        size="sm"
        className="hidden lg:flex"
      >
        <Upload className="mr-2 h-4 w-4" />
        Export Data
      </Button>
      <Button
        onClick={handleExport}
        variant="outline"
        size="sm"
        className="lg:hidden flex"
      >
        <Upload className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
