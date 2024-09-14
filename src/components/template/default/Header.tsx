import { ResumeData } from "@/app/schemas/ResumeSchema";

interface HeaderProps {
  data: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const renderFancyName = (name: string) => {
    return name.split(" ").map((word, index) => (
      <span key={index} className="inline-block">
        {data.HeaderFancyName && !data.ResumeConfig.ResumeHasPDFPreview ? (
          <>
            <span
              className={
                `print:text-mono_foreground print:tracking-normal print:font-bold bg-mono_foreground text-mono_background tracking-wide font-black` +
                `${
                  data.HeaderUnderlinedName
                    ? "underline underline-offset-auto print:underline print:underline-offset-auto"
                    : ""
                }`
              }
            >
              {word.charAt(0)}
            </span>
            <span
              className={`${
                data.HeaderUnderlinedName
                  ? "underline underline-offset-auto"
                  : ""
              }`}
            >
              {word.slice(1)}
            </span>
          </>
        ) : (
          <span
            className={`${
              data.HeaderUnderlinedName ? "underline underline-offset-auto" : ""
            }`}
          >
            {word}
          </span>
        )}
        {index < name.split(" ").length - 1 && (
          <span className="inline-block">&nbsp;</span>
        )}
      </span>
    ));
  };

  // Trim the first name and last name
  const trimmedFirstName = data.HeaderFirstName.trim();
  const trimmedLastName = data.HeaderLastName.trim();

  return (
    <>
      <section className="px-[2.5%] text-left print:text-center md:text-center mx-auto align-middle print:mt-0 mt-[5%] bg-mono_background">
        <h1 className="text-4xl md:text-5xl font-bold md:tracking-wide mb-[2.5%] pointer-events-none select-none">
          {renderFancyName(`${trimmedFirstName} ${trimmedLastName}`)}
        </h1>
        <p className="mt-[1%] print:my-[1%] text-mono_primary font-semibold text-xl">
          {data.HeaderTitle}
        </p>
        <p className="font-medium text-mono_primary">{data.HeaderAddress}</p>
        <hr className="mx-auto border-2 border-opacity-50 border-mono_primary my-[2.5%]" />
      </section>
    </>
  );
};

export default Header;
