/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import { ResumeData } from "@/app/types/ResumeData";
import {
  Contact,
  Overview,
  Publications,
  Skills,
  Experience,
  Education,
  Certifications,
  Achievements,
  Header,
  Projects,
  Extracurricular,
  Volunteering,
} from "./default";

interface ResumeProps {
  data: ResumeData;
  sectionOrder: string[];
}

const Resume: React.FC<ResumeProps> = ({ data, sectionOrder }) => {
  const { ResumeConfig } = data;

  const sectionComponents = {
    Overview,
    Education,
    Skills,
    Experience,
    Publications,
    Projects,
    Certifications,
    Achievements,
    Extracurricular,
    Volunteering,
  };

  return (
    <main
      id={ResumeConfig.ResumeHasBackgroundPattern ? "bg-pattern" : ""}
      className={`resume-main bg-fixed min-h-[100svh] ${
        ResumeConfig.ResumeHasLightBackground
          ? "bg-mono_background"
          : "bg-mono_primary"
      }`}
    >
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
        rel="stylesheet"
      />
      <div
        className={`print:p-0 bg-fixed min-h-[100svh] download-main ${
          ResumeConfig.ResumeHasPDFPreview
            ? "p-0"
            : "p-[2.5%]"
        } ${
          ResumeConfig.ResumeHasPDFPreview
            ? "grayscale print:filter-none p-0"
            : ""
        }`}
      >
        <div className="text-mono_foreground bg-mono_background box-border max-w-3xl print:max-w-full mx-auto print:border-none border-4 border-mono_foreground text-pretty w-full">
          <Header data={data} />
          <div className="px-[2.5%]">
            <Contact data={data} />
            {sectionOrder.map((sectionKey) => {
              const SectionComponent =
                sectionComponents[sectionKey as keyof typeof sectionComponents];
              const configKey =
                `ResumeHas${sectionKey}` as keyof ResumeData["ResumeConfig"];

              if (ResumeConfig[configKey]) {
                return <SectionComponent key={sectionKey} data={data} />;
              }
              return null;
            })}
          </div>
          <hr className="mx-auto border-2 border-opacity-50 border-mono_primary my-[2.5%] w-[95%]" />
        </div>
      </div>
    </main>
  );
};

export default Resume;
