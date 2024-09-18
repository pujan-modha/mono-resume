import { ResumeData } from "@/app/types/ResumeData";

interface EducationProps {
  data: ResumeData;
}

const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <>
      <section className="bg-mono_background">
        <div className="flex items-center gap-2">
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
          <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
            {data.ResumeTitles.EducationTitle.toUpperCase()}
          </h2>
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        </div>
        {data.EducationData.map((education, id) => (
          <div key={id} className="mb-[2.5%] last:mb-0">
            <div className="grid print:grid-cols-2 md:grid-cols-2">
              <div>
                <p className="font-semibold text-sm text-mono_primary">
                  {education.EducationInstitutionName}
                </p>
                <div>
                  <p className="text-mono_secondary text-sm font-medium">
                    {education.EducationCourseName}
                  </p>
                  <p className="text-mono_secondary text-xs md:text-sm font-medium">
                    ({education.EducationFromTime}
                    <span> - </span>
                    {education.EducationToTime})
                  </p>
                </div>
              </div>
              <div className="text-sm">
                <ul>
                  <li>
                    <span className="font-semibold text-mono_primary">
                      <span className="font-semibold text-mono_secondary opacity-75 select-none">
                        {" "}
                        ›{" "}
                      </span>
                      Major:<span> </span>
                    </span>
                    <span className="text-mono_primary font-light">
                      {education.EducationMajor}
                    </span>
                  </li>
                  {education.EducationHasMinor && (
                    <li>
                      <span className="font-semibold text-mono_primary">
                        <span className="font-semibold text-mono_secondary opacity-75 select-none">
                          {" "}
                          ›{" "}
                        </span>
                        Minor:<span> </span>
                      </span>
                      <span className="text-mono_primary font-light">
                        {education.EducationMinor}
                      </span>
                    </li>
                  )}
                  {education.EducationHasSpecialization && (
                    <li>
                      <span className="font-semibold text-mono_primary">
                        <span className="font-semibold text-mono_secondary opacity-75 select-none">
                          {" "}
                          ›{" "}
                        </span>
                        Specialization:<span> </span>
                      </span>
                      <span className="text-mono_primary font-light">
                        {education.EducationSpecialization}
                      </span>
                    </li>
                  )}
                  {education.EducationHasGPA && (
                    <li>
                      <span className="font-semibold text-mono_primary">
                        <span className="font-semibold text-mono_secondary opacity-75 select-none">
                          {" "}
                          ›{" "}
                        </span>
                        GPA:<span> </span>
                      </span>
                      <span className="text-mono_primary font-light">
                        {education.EducationGPA}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Education;
