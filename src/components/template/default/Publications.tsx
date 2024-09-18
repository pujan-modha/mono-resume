import { ResumeData } from "@/app/types/ResumeData";

interface PublicationsProps {
  data: ResumeData;
}

export default function Publications({ data }: PublicationsProps) {
  return (
    <section className="bg-mono_background">
      <div className="flex items-center gap-2">
        <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
          {data.ResumeTitles.PublicationsTitle.toUpperCase()}
        </h2>
        <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
      </div>
      <div className="text-sm">
        <ul>
          {data.PublicationsData.map((publication, index) => (
            <li key={index} className="mb-[1%] last:mb-0">
              <span className="font-semibold text-mono_secondary opacity-75 select-none">
                {" "}
                ›{" "}
              </span>
              <span className="text-mono_primary font-light">
                <span className="font-semibold">
                  {publication.PublicationTitle}
                </span>
                <span> - </span>
                {publication.PublicationAuthors}
                <span>, </span>
                <span>{publication.PublicationJournal}</span>
                <span> ({publication.PublicationYear})</span>
                {publication.PublicationDOI && (
                  <>
                    <span> | </span>
                    <a
                      href={publication.PublicationDOI}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-mono_primary text-mono_secondary font-light hover:underline text-nowrap"
                    >
                      DOI
                      <span className="text-mono_primary opacity-50 inline-flex align-top">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-auto h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
