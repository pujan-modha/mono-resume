import { useState, useEffect } from "react";
import { ResumeSchema, ResumeData } from "../../app/schemas/ResumeSchema";
import { dummyData } from "@/app/data/data";

type ContactIcon =
  | "email"
  | "phone"
  | "linkedin"
  | "github"
  | "gitlab"
  | "x-twitter";

const useResumeForm = (onSubmit: (data: ResumeData) => void) => {
  const [data, setData] = useState<ResumeData>(() => {
    // Try to load data from localStorage
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return ResumeSchema.parse(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
    // If no saved data or parsing fails, use dummy data
    return ResumeSchema.parse(dummyData);
  });

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index: number,
    field: string,
    subIndex?: number
  ) => {
    const { value, type, checked } = e.target as HTMLInputElement;

    setData((prevData: ResumeData) => {
      const newData = { ...prevData };

      if (section === "ResumeTitles") {
        newData.ResumeTitles = {
          ...newData.ResumeTitles,
          [field]: value,
        };
      } else if (section === "OverviewData") {
        newData.OverviewData = {
          ...newData.OverviewData,
          [field]: type === "checkbox" ? checked : value,
        };
      } else if (section === "ContactData") {
        const contactType = index as unknown as ContactIcon;
        const existingContactIndex = newData.ContactData.findIndex(
          (c) => c.ContactIcon === contactType
        );

        if (existingContactIndex !== -1) {
          if (field === "isEnabled" && !checked) {
            // Remove the contact if it's being disabled
            newData.ContactData = newData.ContactData.filter(
              (_, i) => i !== existingContactIndex
            );
          } else {
            // Update existing contact
            newData.ContactData[existingContactIndex] = {
              ...newData.ContactData[existingContactIndex],
              [field]: type === "checkbox" ? checked : value,
            };
          }
        } else if (field === "isEnabled" && checked) {
          // Add new contact
          newData.ContactData.push({
            ContactIcon: contactType,
            isEnabled: true,
            ContactLink: "",
            ContactText: "",
          });
        }
      } else if (Array.isArray(newData[section as keyof ResumeData])) {
        const sectionData = [
          ...(newData[section as keyof ResumeData] as any[]),
        ];

        if (!sectionData[index]) {
          sectionData[index] = {};
        }

        if (["ExperienceDescription", "ProjectDescription"].includes(field)) {
          if (!Array.isArray(sectionData[index][field])) {
            sectionData[index][field] = [];
          }
          if (subIndex !== undefined) {
            sectionData[index][field][subIndex] = value;
          } else {
            sectionData[index][field] = value
              .split("\n")
              .filter((item: string) => item.trim() !== "");
          }
        } else if (["ProjectTechStack", "SkillsName"].includes(field)) {
          sectionData[index][field] = value
            .split(",")
            .map((item: string) => item);
        } else {
          sectionData[index][field] = type === "checkbox" ? checked : value;
        }

        newData[section as keyof ResumeData] = sectionData as unknown as never;
      } else {
        // Handle any other fields that don't fit into the above categories
        (newData as any)[field] = type === "checkbox" ? checked : value;
      }

      return newData;
    });
  };

  const addItem = (section: string) => {
    setData((prevData: ResumeData) => {
      const newData = { ...prevData };
      const sectionData = Array.isArray(newData[section as keyof ResumeData])
        ? [...(newData[section as keyof ResumeData] as any[])]
        : [];

      // Add a new empty item to the section
      sectionData.push({});

      return {
        ...newData,
        [section as keyof ResumeData]: sectionData,
      };
    });
  };

  const removeItem = (section: string, index: number) => {
    setData((prevData: ResumeData) => ({
      ...prevData,
      [section as keyof ResumeData]: (
        prevData[section as keyof ResumeData] as Record<string, unknown>[]
      ).filter((_: unknown, i: number) => i !== index),
    }));
  };

  const addSubItem = (section: string, index: number, field: string) => {
    setData((prevData: ResumeData) => {
      return {
        ...prevData,
        [section as keyof ResumeData]: (
          prevData[section as keyof ResumeData] as Record<string, unknown>[]
        ).map((item: Record<string, unknown>, i: number) =>
          i === index
            ? {
                ...item,
                [field]: Array.isArray(item[field])
                  ? [...item[field], ""]
                  : [""],
              }
            : item
        ),
      };
    });
  };

  const removeSubItem = (
    section: string,
    index: number,
    field: string,
    subIndex: number
  ) => {
    setData((prevData: ResumeData) => {
      return {
        ...prevData,
        [section as keyof ResumeData]: (
          prevData[section as keyof ResumeData] as Record<string, unknown>[]
        ).map((item: Record<string, unknown>, i: number) =>
          i === index
            ? {
                ...item,
                [field]: (item[field] as unknown[]).filter(
                  (_: unknown, j: number) => j !== subIndex
                ),
              }
            : item
        ),
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
  };

  const moveSection = (
    section: string,
    index: number,
    direction: "up" | "down"
  ) => {
    setData((prevData: ResumeData) => {
      const newData = { ...prevData };
      const sectionData = [
        ...(newData[section as keyof ResumeData] as Record<string, unknown>[]),
      ];
      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < sectionData.length) {
        [sectionData[index], sectionData[newIndex]] = [
          sectionData[newIndex],
          sectionData[index],
        ];
        newData[section as keyof ResumeData] = sectionData as unknown as never;
      }

      return newData;
    });
  };

  return {
    data,
    handleChange,
    addItem,
    removeItem,
    addSubItem,
    removeSubItem,
    handleSubmit,
    setData,
    moveSection,
  };
};

export default useResumeForm;
