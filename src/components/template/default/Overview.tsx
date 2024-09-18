import { ResumeData } from "@/app/types/ResumeData";

interface OverviewProps {
  data: ResumeData;
}

export default function Overview({ data }: OverviewProps) {
  return (
    <>
      <section className="bg-mono_background">
        <div className="flex items-center gap-2">
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
          <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
            {data.ResumeTitles.OverviewTitle.toUpperCase()}
          </h2>
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        </div>
        <p className="text-sm text-mono_primary">
          {data.OverviewData.Overview}
        </p>
      </section>
    </>
  );
}
