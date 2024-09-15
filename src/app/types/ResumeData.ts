export interface ResumeData {
  ResumeConfig: {
    ResumeHasBackgroundPattern: boolean;
    ResumeHasPDFPreview: boolean;
    ResumeHasHTMLPreview: boolean;
    ResumeHasLightBackground: boolean;
    ResumeHasOverview: boolean;
    ResumeHasCertifications: boolean;
    ResumeHasAchievements: boolean;
    ResumeHasExperience: boolean;
    ResumeHasEducation: boolean;
    ResumeHasSkills: boolean;
    ResumeHasProjects: boolean;
    ResumeHasExtracurricular: boolean;
    ResumeHasVolunteering: boolean;
    ResumeHasPublications: boolean;
  };
  ResumeTitles: {
    OverviewTitle: string;
    EducationTitle: string;
    SkillsTitle: string;
    ExperienceTitle: string;
    ProjectsTitle: string;
    CertificationsTitle: string;
    AchievementsTitle: string;
    VolunteeringTitle: string;
    PublicationsTitle: string;
    ExtracurricularTitle: string;
  };
  HeaderFirstName: string;
  HeaderLastName: string;
  HeaderFancyName: boolean;
  HeaderUnderlinedName: boolean;
  HeaderTitle: string;
  HeaderAddress: string;
  ContactData: {
    ContactIcon:
      | "email"
      | "phone"
      | "linkedin"
      | "github"
      | "gitlab"
      | "x-twitter";
    ContactLink?: string;
    ContactText?: string;
    isEnabled: boolean;
  }[];
  EducationData: {
    EducationInstitutionName: string;
    EducationCourseName: string;
    EducationFromTime: string;
    EducationToTime: string;
    EducationMajor: string;
    EducationMinor: string;
    EducationSpecialization: string;
    EducationHasGPA: boolean;
    EducationGPA: string;
    EducationHasMinor: boolean;
    EducationHasSpecialization: boolean;
  }[];
  SkillsData: {
    SkillsTitle: string;
    SkillsName: string | string[];
  }[];
  ExperienceData: {
    ExperienceOrganization: string;
    ExperienceWorkTitle: string;
    ExperienceTimeFrom: string;
    ExperienceTimeTo: string;
    ExperienceLocation: string;
    ExperienceDescription: string[];
  }[];
  ProjectsData: {
    ProjectName: string;
    ProjectHasLink: boolean;
    ProjectLink?: string;
    ProjectGitHubLink?: string;
    ProjectGitLabLink?: string;
    ProjectOtherLink?: string;
    ProjectHasGitHub: boolean;
    ProjectHasGitLab: boolean;
    ProjectHasOtherLink: boolean;
    ProjectHasTechStack: boolean;
    ProjectTechStack: string[];
    ProjectDescription: string[];
    ProjectTimeFrom: string;
    ProjectTimeTo: string;
    ProjectHasTimeTo: boolean;
  }[];
  OverviewData: {
    HasOverview: boolean;
    Overview: string;
  };
  CertificationsData: {
    certificationCourseName: string;
    certificationLinkToCourse?: string;
    certificationCoursePlatformName: string;
    certificationHaveCourseLink: boolean;
    certificationLinkToCertificate?: string;
    certificationHaveCertificate: boolean;
  }[];
  AchievementsData: {
    achievementMain: string;
    achievementEvent: string;
    achievementLinkToCertificate?: string;
    achievementHaveCertificate: boolean;
  }[];
  VolunteeringData: {
    VolunteeringTitle: string;
    VolunteeringOrganization: string;
    VolunteeringYear: string;
  }[];
  PublicationsData: {
    PublicationTitle: string;
    PublicationAuthors: string;
    PublicationJournal: string;
    PublicationYear: string;
    PublicationDOI?: string;
  }[];
  ExtracurricularData: {
    ExtracurricularTitle: string;
    ExtracurricularOrganization: string;
    ExtracurricularYears: string;
  }[];
}
