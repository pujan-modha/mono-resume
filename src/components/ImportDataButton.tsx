import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResumeData } from "@/app/schemas/ResumeSchema";
import { Input } from "@/components/ui/input";

interface ImportDataButtonProps {
  onImport: (importedData: ResumeData, importedSectionOrder: string[]) => void;
}

export function ImportDataButton({ onImport }: ImportDataButtonProps) {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (importedData.resumeData && importedData.sectionOrder) {
            onImport(importedData.resumeData, importedData.sectionOrder);
          } else {
            throw new Error("Invalid data structure");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid MONO file. Please try again.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className="hidden lg:flex"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <Download className="mr-2 h-4 w-4" />
        Import Data
        <Input
          id="file-input"
          type="file"
          accept=".mono"
          style={{ display: "none" }}
          onChange={handleImport}
          aria-label="Import resume data"
        />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden flex"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <Download className="mr-2 h-4 w-4" />
        Import
        <Input
          id="file-input"
          type="file"
          accept=".mono"
          style={{ display: "none" }}
          onChange={handleImport}
          aria-label="Import resume data"
        />
      </Button>
    </div>
  );
}
