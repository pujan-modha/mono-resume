import { z } from "zod";

const ContactIconEnum = z.enum([
  "github",
  "linkedin",
  "email",
  "phone",
  "gitlab",
  "x-twitter",
]);

export const ResumeSchema = z.object({
  ResumeConfig: z.object({
    ResumeHasBackgroundPattern: z.boolean().default(false),
    ResumeHasPDFPreview: z.boolean().default(false),
    ResumeHasHTMLPreview: z.boolean().default(false),
    ResumeHasLightBackground: z.boolean().default(false),
    ResumeHasOverview: z.boolean().default(false),
    ResumeHasCertifications: z.boolean().default(false),
    ResumeHasAchievements: z.boolean().default(false),
    ResumeHasExperience: z.boolean().default(false),
    ResumeHasEducation: z.boolean().default(false),
    ResumeHasSkills: z.boolean().default(false),
    ResumeHasProjects: z.boolean().default(false),
    ResumeHasExtracurricular: z.boolean().default(false),
    ResumeHasVolunteering: z.boolean().default(false),
    ResumeHasPublications: z.boolean().default(false),
  }),
  ResumeTitles: z.object({
    OverviewTitle: z.string().default(""),
    EducationTitle: z.string().default(""),
    SkillsTitle: z.string().default(""),
    ExperienceTitle: z.string().default(""),
    ProjectsTitle: z.string().default(""),
    CertificationsTitle: z.string().default(""),
    AchievementsTitle: z.string().default(""),
    VolunteeringTitle: z.string().default(""),
    PublicationsTitle: z.string().default(""),
    ExtracurricularTitle: z.string().default(""),
  }),
  HeaderFirstName: z.string().default(""),
  HeaderLastName: z.string().default(""),
  HeaderFancyName: z.boolean().default(true),
  HeaderUnderlinedName: z.boolean().default(true),
  HeaderTitle: z.string().default(""),
  HeaderAddress: z.string().default(""),
  ContactData: z
    .array(
      z.object({
        ContactIcon: ContactIconEnum,
        ContactLink: z.string().optional().or(z.literal("")),
        ContactText: z.string().optional().or(z.literal("")),
        isEnabled: z.boolean().default(true),
      })
    )
    .default([]),
  EducationData: z
    .array(
      z.object({
        EducationInstitutionName: z.string().default(""),
        EducationCourseName: z.string().default(""),
        EducationFromTime: z.string().default(""),
        EducationToTime: z.string().default(""),
        EducationMajor: z.string().default(""),
        EducationHasMinor: z.boolean().default(false),
        EducationMinor: z.string().default(""),
        EducationHasSpecialization: z.boolean().default(false),
        EducationSpecialization: z.string().default(""),
        EducationHasGPA: z.boolean().default(false),
        EducationGPA: z.string().default(""),
      })
    )
    .default([]),
  SkillsData: z
    .array(
      z.object({
        SkillsTitle: z.string().default(""),
        SkillsName: z.union([z.string(), z.array(z.string())]).default(""),
      })
    )
    .default([]),
  ExperienceData: z
    .array(
      z.object({
        ExperienceOrganization: z.string().default(""),
        ExperienceWorkTitle: z.string().default(""),
        ExperienceTimeFrom: z.string().default(""),
        ExperienceTimeTo: z.string().default(""),
        ExperienceLocation: z.string().default(""),
        ExperienceDescription: z.array(z.string()).default([]),
      })
    )
    .default([]),
  ProjectsData: z
    .array(
      z.object({
        ProjectName: z.string().default(""),
        ProjectHasLink: z.boolean().default(false),
        ProjectLink: z.string().optional().or(z.literal("")),
        ProjectTimeFrom: z.string().default(""),
        ProjectHasTimeTo: z.boolean().default(false),
        ProjectTimeTo: z.string().default(""),
        ProjectHasTechStack: z.boolean().default(false),
        ProjectTechStack: z.array(z.string()).default([]),
        ProjectDescription: z.array(z.string()).default([]),
        ProjectHasGitHub: z.boolean().default(false),
        ProjectGitHubLink: z.string().optional().or(z.literal("")),
        ProjectHasGitLab: z.boolean().default(false),
        ProjectGitLabLink: z.string().optional().or(z.literal("")),
        ProjectHasOtherLink: z.boolean().default(false),
        ProjectOtherLink: z.string().optional().or(z.literal("")),
      })
    )
    .default([]),
  OverviewData: z.object({
    HasOverview: z.boolean().default(false),
    Overview: z.string().default(""),
  }),
  CertificationsData: z
    .array(
      z.object({
        certificationCourseName: z.string().default(""),
        certificationHaveCourseLink: z.boolean().default(false),
        certificationLinkToCourse: z.string().optional().or(z.literal("")),
        certificationCoursePlatformName: z.string().default(""),
        certificationHaveCertificate: z.boolean().default(false),
        certificationLinkToCertificate: z.string().optional().or(z.literal("")),
      })
    )
    .default([]),
  AchievementsData: z
    .array(
      z.object({
        achievementMain: z.string().default(""),
        achievementEvent: z.string().default(""),
        achievementHaveCertificate: z.boolean().default(false),
        achievementLinkToCertificate: z.string().optional().or(z.literal("")),
      })
    )
    .default([]),
  VolunteeringData: z
    .array(
      z.object({
        VolunteeringTitle: z.string().default(""),
        VolunteeringOrganization: z.string().default(""),
        VolunteeringYear: z.string().default(""),
      })
    )
    .default([]),
  PublicationsData: z
    .array(
      z.object({
        PublicationTitle: z.string().default(""),
        PublicationAuthors: z.string().default(""),
        PublicationJournal: z.string().default(""),
        PublicationYear: z.string().default(""),
        PublicationDOI: z.string().optional().or(z.literal("")),
      })
    )
    .default([]),
  ExtracurricularData: z
    .array(
      z.object({
        ExtracurricularTitle: z.string().default(""),
        ExtracurricularOrganization: z.string().default(""),
        ExtracurricularYears: z.string().default(""),
      })
    )
    .default([]),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
