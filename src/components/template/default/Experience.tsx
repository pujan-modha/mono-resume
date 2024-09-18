import { ResumeData } from "@/app/types/ResumeData";

interface ExperienceProps {
  data: ResumeData;
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <>
      <section className="bg-mono_background">
        <div className="flex items-center gap-2">
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
          <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
            {data.ResumeTitles.ExperienceTitle.toUpperCase()}
          </h2>
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        </div>
        {data.ExperienceData.map((experience, id) => (
          <div className="mb-[2.5%] last:mb-0" key={id}>
            <div className="md:flex flex-wrap w-full items-center">
              <div className="mr-auto">
                <p className="text-sm font-semibold text-mono_primary">
                  {experience.ExperienceOrganization}
                  <span> | </span>
                  {experience.ExperienceWorkTitle}
                </p>
              </div>
              <div>
                <p className="text-mono_secondary text-xs font-medium md:text-right">
                  ({experience.ExperienceTimeFrom}
                  <span> - </span>
                  {experience.ExperienceTimeTo}
                  <span> | </span>
                  {experience.ExperienceLocation})
                </p>
              </div>
            </div>
            <div className="text-sm text-mono_primary">
              <ul>
                {Array.isArray(experience.ExperienceDescription) ? (
                  experience.ExperienceDescription.map((item, idx) => (
                    <li key={idx}>
                      <span className="text-mono_secondary font-semibold opacity-75 select-none">
                        {" "}
                        ›{" "}
                      </span>
                      {item}
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="text-mono_secondary font-semibold opacity-75 select-none">
                      {" "}
                      ›{" "}
                    </span>
                    {experience.ExperienceDescription}
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Experience;
