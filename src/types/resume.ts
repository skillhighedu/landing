import * as Yup from "yup";


export const validationSchemaType = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  mobnum: Yup.string().required("Mobile number is required"),
  skills: Yup.string().required("Skills are required"),
  // optional fields (won't block submit)
  grad: Yup.string().notRequired(),
  obj: Yup.string().notRequired(),
  schper12: Yup.string().notRequired(),
  school12: Yup.string().notRequired(),
  schper: Yup.string().notRequired(),
  school: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  grad_per: Yup.string().notRequired(),
  linkedin: Yup.string()
    .trim()
    .url("Enter a valid URL (e.g., https://...)")
    .notRequired(),
  github: Yup.string()
    .trim()
    .url("Enter a valid URL (e.g., https://...)")
    .notRequired(),
  projects: Yup.string().trim().notRequired(),
  extracurricular: Yup.string().trim().notRequired(),
  experience: Yup.string().trim().notRequired(),
});

export interface ResumeFormValues {
  email: string;
  firstname: string;
  lastname: string;
  grad: string;
  obj: string;
  mobnum: string;
  schper12: string;
  school12: string;
  schper: string;
  school: string;
  address: string;
  grad_per: string;
  skills: string;
  linkedin?: string;
  github?: string;
  projects?: string;
  extracurricular?: string;
  experience?: string;
}