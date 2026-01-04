import React from "react";
import { useFormik } from "formik";


import {
  PersonalInfoSection,
  ObjectiveSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  ExtraCurricularSection,
} from "@/features/resume/Sections";
import { validationSchemaType, type ResumeFormValues } from "@/types";
import { generatePDF } from "@/utils/pdf";
import CustomButton from "@/components/common/Button";
import HeaderSection from "@/components/common/HeaderSection";
import DashboardLayout from "@/layouts/DashboardLayout";

const initialValues: ResumeFormValues = {
  email: "",
  firstname: "",
  lastname: "",
  grad: "",
  obj: "",
  mobnum: "",
  schper12: "",
  school12: "",
  schper: "",
  school: "",
  address: "",
  grad_per: "",
  skills: "",
  linkedin: "",
  github: "",
  projects: "",
  extracurricular: "",
  experience: "",
};

const Resume: React.FC = () => {
  const formik = useFormik<ResumeFormValues>({
    initialValues,
    validationSchema: validationSchemaType,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      generatePDF(values);
    },
  });

  return (
  <DashboardLayout>

      <div className="min-h-screen bg-linear-to-b from-neutral-950 to-neutral-900 py-12 px-4 ">
        <HeaderSection title="SkillHigh Resume Builder"/>
      <div className="mx-auto w-full mt-3  ">
        <div className="rounded-2xl bg-neutral-800 shadow-xl ring-1 ring-neutral-700">
          
          <div className="border-b border-neutral-700 px-8 py-6">
          
           
            <p className="mt-1 text-sm font-normal text-gray-400 font-pixel">
              Fill in your details and generate a clean PDF resume.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-8 py-8">
            <PersonalInfoSection formik={formik} />
            <ObjectiveSection formik={formik} />
            <ExperienceSection formik={formik} />
            <SkillsSection formik={formik} />
            <ProjectsSection formik={formik} />
            <ExtraCurricularSection formik={formik} />

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => formik.resetForm()}
                className="cursor-pointer rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-normal text-gray-300 hover:bg-neutral-800"
              >
                Reset
              </button>
              <CustomButton
                type="submit"
                title="Genereate"
                
              >
                Generate PDF
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
  );
};

export default Resume;
