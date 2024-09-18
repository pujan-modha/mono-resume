import { ResumeData } from "@/app/types/ResumeData";

interface VolunteeringProps {
  data: ResumeData;
}

const Volunteering: React.FC<VolunteeringProps> = ({ data }) => {
  return (
    <section className="bg-mono_background">
      <div className="flex items-center gap-2">
        <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
          {data.ResumeTitles.VolunteeringTitle.toUpperCase()}
        </h2>
        <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
      </div>
      <div className="text-sm">
        <ul>
          {data.VolunteeringData.map((volunteering, index) => (
            <li key={index}>
              <span className="font-semibold text-mono_secondary opacity-75 select-none">
                {" "}
                ›{" "}
              </span>
              <span className="text-mono_primary font-light">
                <span className="font-semibold">
                  {volunteering.VolunteeringTitle}
                </span>
                <span> - </span>
                {volunteering.VolunteeringOrganization}
                <span>, </span>
                <span>{volunteering.VolunteeringYear}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Volunteering;
