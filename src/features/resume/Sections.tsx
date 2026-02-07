import React from "react";
import type { FormikProps } from "formik";
import type { ResumeFormValues } from "@/types/resume";
import { Section, TextAreaField, TextField } from "./Fields";


type ResumeFormik = FormikProps<ResumeFormValues>;

export const PersonalInfoSection: React.FC<{ formik: ResumeFormik }> = ({
  formik,
}) => (
  <Section title="Personal Information" >
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TextField
        name="firstname"
        label="First name"
        placeholder="First Name"
        formik={formik}
      />
      <TextField
        name="lastname"
        label="Last name"
        placeholder="Last Name"
        formik={formik}
      />
      <TextField
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        type="email"
        formik={formik}
      />
      <TextField
        name="mobnum"
        label="Mobile number"
        placeholder="Mobile number"
        type="tel"
        formik={formik}
      />
      <TextField
        name="linkedin"
        label="LinkedIn URL (optional)"
        placeholder="https://www.linkedin.com/in/your-handle"
        helperText="Paste full URL starting with https://"
        type="url"
        formik={formik}
      />
      <TextField
        name="github"
        label="GitHub URL (optional)"
        placeholder="https://github.com/your-handle"
        type="url"
        formik={formik}
      />
    </div>
  </Section>
);

export const ObjectiveSection: React.FC<{ formik: ResumeFormik }> = ({
  formik,
}) => (
  <Section title="Objective (optional)">
    <TextAreaField
      name="obj"
      label=""
      placeholder="A concise statement summarizing your goals and strengths..."
      rows={4}
      formik={formik}
    />
  </Section>
);

export const ExperienceSection: React.FC<{ formik: ResumeFormik }> = ({
  formik,
}) => (
  <Section
    title="Experience (optional)"
    helperText={
      <>
        First line is job heading (e.g.{" "}
        <i>Acme – SWE | Jan 2023 – Present</i>). <br />
        Following lines are bullet points. Use blank lines to separate jobs.
      </>
    }
  >
    <TextAreaField
      name="experience"
      label=""
      rows={6}
      placeholder={`Acme Corp – Software Engineer | Jan 2023 – Present
- Built and scaled RAG chatbot; reduced ticket time by 38%.
- Cut P95 latency from 780ms to 210ms via caching and DB tuning.

Beta Labs – Intern | May 2022 – Aug 2022
- Prototyped analytics dashboards; increased adoption by 12%.`}
      formik={formik}
    />
  </Section>
);

export const SkillsSection: React.FC<{ formik: ResumeFormik }> = ({
  formik,
}) => (
  <Section
    title="Skills"
    helperText="Tip: Separate with commas or new lines"
  >
    <TextAreaField
      name="skills"
      label=""
      rows={3}
      placeholder="AWS Bedrock, RAG, TypeScript, Prisma, Docker, Kubernetes"
      formik={formik}
    />
  </Section>
);

export const ProjectsSection: React.FC<{ formik: ResumeFormik }> = ({
  formik,
}) => (
  <Section
    title="Projects (optional)"
    helperText={
      <>
        One per line. Optional format: <strong>Title - description</strong>
      </>
    }
  >
    <TextAreaField
      name="projects"
      label=""
      rows={4}
      placeholder={`Smart RAG Assistant - Built a Bedrock-powered RAG chatbot that cut ticket resolution time by 40%.
E-commerce Analytics - Designed ELT + dashboards to reduce churn by 12%.`}
      formik={formik}
    />
  </Section>
);

export const ExtraCurricularSection: React.FC<{ formik: ResumeFormik }> = ({
  formik,
}) => (
  <Section
    title="Extra-Curricular Activities (optional)"
    helperText="One bullet per line"
  >
    <TextAreaField
      name="extracurricular"
      label=""
      rows={3}
      placeholder={`Organized monthly tech meetups with 150+ attendees.
Published 10+ blog posts on GenAI.`}
      formik={formik}
    />
  </Section>
);
