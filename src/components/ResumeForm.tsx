import React, { useEffect } from "react";
import useResumeForm from "./forms/ResumeFormLogic";
import ResumeFormLayout from "./forms/ResumeFormLayout";
import { ResumeData } from "./schemas/ResumeSchema";

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
  sectionOrder: string[];
  setSectionOrder: React.Dispatch<React.SetStateAction<string[]>>;
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
        [section]: !(prevData.ResumeConfig as Record<string, boolean>)[section],
      },
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

  useEffect(() => {
    handleSubmit(
      new Event("submit") as unknown as React.FormEvent<HTMLFormElement>
    );
  }, [handleSubmit]);

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
        />
      </div>
    </div>
  );
};

export default ResumeForm;
