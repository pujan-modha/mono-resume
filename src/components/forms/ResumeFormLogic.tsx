// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import { ResumeSchema } from "../schemas/ResumeSchema";
import { dummyData } from "@/app/data/data";

type ContactIcon =
  | "email"
  | "phone"
  | "linkedin"
  | "github"
  | "gitlab"
  | "x-twitter";

type ResumeData = {
  [key: string]: unknown;
};

const useResumeForm = (onSubmit: (data) => void) => {
  const [data, setData] = useState<ResumeData>(ResumeSchema.parse(dummyData));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index: number,
    field: string,
    subIndex?: number
  ) => {
    const { value, type, checked } = e.target as
      | HTMLInputElement
      | HTMLFormElement;
    setData((prevData: ResumeData) => {
      const newData: ResumeData = { ...prevData };

      if (section === "OverviewData") {
        newData.OverviewData = {
          ...newData.OverviewData,
          [field]: type === "checkbox" ? checked : value,
        };
      } else if (section === "ContactData") {
        const contactType = index;
        const existingContactIndex = newData.ContactData.findIndex(
          (c: any) => c.ContactIcon === contactType.toString()
        );
        if (existingContactIndex !== -1) {
          if (field === "isEnabled" && !checked) {
            newData.ContactData = newData.ContactData.filter(
              (_: any, i: number) => i !== existingContactIndex
            );
          } else {
            newData.ContactData[existingContactIndex] = {
              ...newData.ContactData[existingContactIndex],
              [field]: type === "checkbox" ? checked : value,
            };
          }
        } else if (field === "isEnabled" && checked) {
          newData.ContactData.push({
            ContactIcon: contactType.toString() as ContactIcon,
            isEnabled: true,
            ContactLink: "",
            ContactText: "",
          });
        }
      } else if (section) {
        const sectionData: Record<string, unknown>[] = [...newData[section]];
        if (index >= sectionData.length) {
          sectionData[index] = {};
        }
        if (["ExperienceDescription", "ProjectDescription"].includes(field)) {
          if (!Array.isArray(sectionData[index][field])) {
            sectionData[index][field] = [];
          }
          if (subIndex !== undefined) {
            (sectionData[index][field] as string[])[subIndex] = value;
          } else {
            sectionData[index][field] = value
              .split("\n")
              .filter((item: string) => item.trim() !== "");
          }
        } else if (["ProjectTechStack", "SkillsName"].includes(field)) {
          sectionData[index][field] = value
            .split(",")
            .map((item: string) => item.trim());
        } else {
          sectionData[index][field] = type === "checkbox" ? checked : value;
        }
        newData[section] = sectionData;
      } else {
        newData[field] = type === "checkbox" ? checked : value;
      }
      return newData;
    });
  };

  const addItem = (section: string) => {
    setData((prevData: ResumeData) => ({
      ...prevData,
      [section]: [...prevData[section], {}],
    }));
  };

  const removeItem = (section: string, index: number) => {
    setData((prevData: ResumeData) => ({
      ...prevData,
      [section]: prevData[section].filter(
        (_: unknown, i: number) => i !== index
      ),
    }));
  };

  const addSubItem = (section: string, index: number, field: string) => {
    setData((prevData: ResumeData) => {
      return {
        ...prevData,
        [section]: prevData[section].map(
          (item: Record<string, unknown>, i: number) =>
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
        [section]: prevData[section].map(
          (item: Record<string, unknown>, i: number) =>
            i === index
              ? {
                  ...item,
                  [field]: item[field].filter(
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
      const sectionData = [...newData[section]];
      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < sectionData.length) {
        [sectionData[index], sectionData[newIndex]] = [
          sectionData[newIndex],
          sectionData[index],
        ];
        newData[section] = sectionData;
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
