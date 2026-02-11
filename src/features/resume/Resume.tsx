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

import DashboardLayout from "../dashboard/layout/DashboardLayout";
import Container from "@/layouts/Container";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import { Lock } from "lucide-react";
import DemoNotice from "../dashboard/components/common/DemoNotice";

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

const Resume: React.FC<PlayGroundProps> = ({ mode }) => {
  const isDemo = mode === "demo";

  const formik = useFormik<ResumeFormValues>({
    initialValues,
    validationSchema: validationSchemaType,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (!isDemo) generatePDF(values);
    },
  });

  return (
    <DashboardLayout title="Resume">
      {mode === "demo" && <DemoNotice />}

      <Container size="lg">
        <div className="py-6 sm:py-8 lg:py-10 px-3 sm:px-4 font-sans">
          <div
            className="
              rounded-2xl
              bg-white dark:bg-neutral-800
              shadow-lg
              ring-1 ring-border
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="border-b border-border px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
              <p className="text-sm sm:text-base text-muted-foreground">
                Fill in your details and generate a clean PDF resume.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              className="
                px-4 sm:px-6 lg:px-8
                py-6 sm:py-8
                space-y-8 sm:space-y-10
              "
            >
              <PersonalInfoSection formik={formik} />
              <ObjectiveSection formik={formik} />
              <ExperienceSection formik={formik} />
              <SkillsSection formik={formik} />
              <ProjectsSection formik={formik} />
              <ExtraCurricularSection formik={formik} />

              {/* Actions */}
              <div
                className="
                  pt-6
                  border-t border-border
                  flex flex-col sm:flex-row
                  items-stretch sm:items-center
                  justify-end
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={() => formik.resetForm()}
                  className="
                    rounded-lg
                    border border-border
                    px-5 py-2.5
                    text-sm
                    text-foreground
                    hover:bg-muted
                    w-full sm:w-auto
                  "
                >
                  Reset
                </button>

                <CustomButton
                  type="submit"
                  disabled={isDemo}
                  title={isDemo ? "Locked in Demo" : "Generate PDF"}
                  icon={isDemo ? <Lock size={14} /> : undefined}
                  className="px-6 py-2.5 w-full sm:w-auto"
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};


export default Resume;
