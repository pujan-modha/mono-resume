// In ResumeForm.tsx
import React, { useEffect } from "react";
import useResumeForm from "./ResumeFormLogic";
import ResumeFormLayout from "./ResumeFormLayout";
import { ResumeData } from "@/app/schemas/ResumeSchema";
import { dummyData, defaultSectionOrder } from "@/app/data/data";

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
  sectionOrder: string[];
  setSectionOrder: React.Dispatch<React.SetStateAction<string[]>>;
  onImport: (data: ResumeData, sectionOrder: string[]) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  onSubmit,
  sectionOrder,
  setSectionOrder,
}) => {
  const {
    data,
    handleChange,
    addItem,
    removeItem,
    addSubItem,
    removeSubItem,
    handleSubmit,
    setData,
  } = useResumeForm(onSubmit);

  const handleVisibilityChange = (
    section: keyof ResumeData["ResumeConfig"]
  ) => {
    setData((prevData) => ({
      ...prevData,
      ResumeConfig: {
        ...(prevData.ResumeConfig as Record<string, boolean>),
        [section]:
          !prevData.ResumeConfig[section as keyof typeof prevData.ResumeConfig],
      } as typeof prevData.ResumeConfig,
    }));
  };

  const moveSection = (sectionKey: string, direction: "up" | "down") => {
    setSectionOrder((prevOrder) => {
      const currentIndex = prevOrder.indexOf(sectionKey);
      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (newIndex >= 0 && newIndex < prevOrder.length) {
        const newOrder = [...prevOrder];
        [newOrder[currentIndex], newOrder[newIndex]] = [
          newOrder[newIndex],
          newOrder[currentIndex],
        ];
        return newOrder;
      }

      return prevOrder;
    });
  };

  // Add this function to handle the import
  const handleImport = (
    importedData: ResumeData,
    importedSectionOrder: string[]
  ) => {
    setData(importedData);
    setSectionOrder(importedSectionOrder);
    onSubmit(importedData);
  };

  const handleReset = () => {
    setData(dummyData);
    setSectionOrder(defaultSectionOrder);
    onSubmit(dummyData);
  };

  useEffect(() => {
    // Call onSubmit with the initial data (either from localStorage or dummy data)
    onSubmit(data);
  }, [data, onSubmit]);

  useEffect(() => {
    // Save section order to localStorage whenever it changes
    localStorage.setItem("sectionOrder", JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  return (
    <div className="resume-form-container">
      <div className="form-section">
        <ResumeFormLayout
          data={data as ResumeData}
          handleChange={handleChange}
          addItem={addItem}
          removeItem={removeItem}
          addSubItem={addSubItem}
          removeSubItem={removeSubItem}
          handleSubmit={handleSubmit}
          handleVisibilityChange={handleVisibilityChange}
          moveSection={moveSection}
          sectionOrder={sectionOrder}
          onImport={handleImport} // Pass the new handleImport function
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default ResumeForm;
