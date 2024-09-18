import { ResumeData } from "@/app/types/ResumeData";

interface AchievementsProps {
  data: ResumeData;
}

const Achievements: React.FC<AchievementsProps> = ({ data }) => {
  return (
    <>
      <section className="bg-mono_background">
        <div className="flex items-center gap-2">
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
          <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
            {data.ResumeTitles.AchievementsTitle.toUpperCase()}
          </h2>
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        </div>
        <div className="text-sm">
          <ul>
            {data.AchievementsData.map((achievement, id) => (
              <li key={id}>
                <span className="font-semibold text-mono_secondary opacity-75 select-none">
                  {" "}
                  ›{" "}
                </span>
                <span className="text-mono_primary font-light">
                  <span className="font-semibold">
                    {achievement.achievementMain}
                  </span>
                  <span> - </span>
                  {achievement.achievementEvent}
                </span>
                {achievement.achievementHaveCertificate && (
                  <span>
                    <span> | </span>
                    <a
                      href={achievement.achievementLinkToCertificate}
                      target="_noref"
                    >
                      (
                      <span className="hover:text-mono_primary text-mono_secondary font-light hover:underline text-nowrap">
                        Certificate
                        <span className="text-mono_primary opacity-50 inline-flex align-middle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-auto h-4"
                          >
                            <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                            <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                          </svg>
                        </span>
                      </span>
                      )
                    </a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Achievements;
