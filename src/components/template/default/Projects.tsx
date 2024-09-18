import { ResumeData } from "@/app/types/ResumeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGitlab } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

interface ProjectsProps {
  data: ResumeData;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <>
      <section className="bg-mono_background">
        <div className="flex items-center gap-2">
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
          <h2 className="text-base text-mono_foreground font-bold pointer-events-none my-2 text-nowrap">
            {data.ResumeTitles.ProjectsTitle.toUpperCase()}
          </h2>
          <hr className="mx-auto border border-opacity-25 border-mono_foreground my-[2.5%] w-full bg-mono_background" />
        </div>
        {data.ProjectsData.map((project, id) => (
          <div className="mb-[2.5%] last:mb-0" key={id}>
            <div className="md:flex flex-wrap w-full items-center">
              <div className="mr-auto">
                <p className="text-sm font-semibold text-mono_primary">
                  <span>
                    {project.ProjectLink ? (
                      <a
                        href={project.ProjectLink}
                        target="_noref"
                        className="hover:text-mono_secondary hover:underline"
                      >
                        {project.ProjectName}
                        <span className="text-mono_primary font-light opacity-50 inline-flex">
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
                    ) : (
                      <span>{project.ProjectName}</span>
                    )}
                  </span>
                  <span className="text-nowrap">
                    {project.ProjectHasGitHub && (
                      <span>
                        <span className="text-mono_primary opacity-50 font-thin text-sm select-none">
                          {" "}
                          |{" "}
                        </span>
                        <a
                          href={project.ProjectGitHubLink}
                          target="_noref"
                          className="opacity-75 hover:opacity-100"
                        >
                          <FontAwesomeIcon
                            icon={faGithub}
                            className="text-mono_secondary print:text-mono_primary"
                          />
                        </a>
                      </span>
                    )}
                    {project.ProjectHasGitLab && (
                      <span>
                        <span className="text-mono_primary opacity-50 font-thin text-sm select-none">
                          {" "}
                          |{" "}
                        </span>
                        <a
                          href={project.ProjectGitLabLink}
                          target="_noref"
                          className="opacity-75 hover:opacity-100"
                        >
                          <FontAwesomeIcon
                            icon={faGitlab}
                            className="text-mono_secondary print:text-mono_primary"
                          />
                        </a>
                      </span>
                    )}
                    {project.ProjectHasOtherLink && (
                      <span>
                        <span className="text-mono_primary opacity-50 font-thin text-sm select-none">
                          {" "}
                          |{" "}
                        </span>
                        <a
                          href={project.ProjectOtherLink}
                          target="_noref"
                          className="opacity-75 hover:opacity-100"
                        >
                          <FontAwesomeIcon
                            icon={faCode}
                            className="text-mono_secondary print:text-mono_primary"
                          />
                        </a>
                      </span>
                    )}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-mono_secondary text-xs font-medium md:text-right">
                  ({project.ProjectTimeFrom}
                  {project.ProjectHasTimeTo && (
                    <span>
                      <span> - </span>
                      {project.ProjectTimeTo}
                    </span>
                  )}
                  )
                </p>
              </div>
            </div>
            {project.ProjectHasTechStack && (
              <div className="mt-[0.5%]">
                <ul className="flex flex-wrap gap-[0.75%]">
                  {Array.isArray(project.ProjectTechStack) &&
                    project.ProjectTechStack.map((projecttechstack, idx) => (
                      <li
                        key={idx}
                        className="pointer-events-none print:text-mono_foreground print:border print:border-mono_primary text-xs border border-mono_secondary text-mono_secondary px-[1%] mb-[1%] md:mb-[0.5%] print:mb-[0.5%]"
                      >
                        {projecttechstack.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <div className="text-sm text-mono_primary">
              <ul>
                {Array.isArray(project.ProjectDescription) ? (
                  project.ProjectDescription.map((item, idx) => (
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
                    {project.ProjectDescription}
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

export default Projects;
