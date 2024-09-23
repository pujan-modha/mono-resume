import { ResumeData } from "@/app/types/ResumeData";

interface SkillsProps {
  data: ResumeData;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  return (
    <>
      <section className="bg-mono_background">
        <div className="flex items-center gap-2">
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
          <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
            {data.ResumeTitles.SkillsTitle.toUpperCase()}
          </h2>
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        </div>
        {data.SkillsData.map((skills, id) => (
          <div key={id}>
            <p className="text-mono_primary text-sm font-semibold pointer-events-none">
              {skills.SkillsTitle}
            </p>
            <ul className="flex flex-wrap gap-[0.75%]">
              {(Array.isArray(skills.SkillsName)
                ? skills.SkillsName
                : (skills.SkillsName || "").split(",")
              ).map((skillname, idx) => (
                <li
                  key={idx}
                  className={`pointer-events-none print:text-mono_foreground print:border print:border-mono_primary text-xs px-[1%] mb-[1%] ${
                    data.ResumeConfig.ResumeHasPDFPreview
                      ? "bg-mono_background text-mono_foreground border border-mono_primary"
                      : "bg-mono_secondary text-mono_background"
                  }`}
                >
                  {skillname.trim()}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
};

export default Skills;
