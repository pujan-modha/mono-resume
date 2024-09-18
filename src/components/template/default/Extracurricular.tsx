import { ResumeData } from "@/app/types/ResumeData";

interface ExtracurricularProps {
  data: ResumeData;
}

const Extracurricular: React.FC<ExtracurricularProps> = ({ data }) => {
  return (
    <section className="bg-mono_background">
      <div className="flex items-center gap-2">
        <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
          {data.ResumeTitles.ExtracurricularTitle.toUpperCase()}
        </h2>
        <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
      </div>
      <div className="text-sm">
        <ul>
          {data.ExtracurricularData.map((extracurricular, index) => (
            <li key={index}>
              <span className="font-semibold text-mono_secondary opacity-75 select-none">
                {" "}
                ›{" "}
              </span>
              <span className="text-mono_primary font-light">
                <span className="font-semibold">
                  {extracurricular.ExtracurricularTitle}
                </span>
                <span> - </span>
                {extracurricular.ExtracurricularOrganization}
                <span>, </span>
                <span>{extracurricular.ExtracurricularYears}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Extracurricular;
