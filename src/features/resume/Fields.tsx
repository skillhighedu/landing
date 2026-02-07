import React from "react";
import type { FormikProps } from "formik";
import type { ResumeFormValues } from "@/types/resume";

type ResumeFormik = FormikProps<ResumeFormValues>;

type BaseFieldProps = {
  name: keyof ResumeFormValues;
  label: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  formik: ResumeFormik;
};

type TextFieldProps = BaseFieldProps & {
  type?: string;
};

export const Section: React.FC<{
  title: string;
  helperText?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, helperText, children }) => (
  <section className="mb-8">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-normal text-neutral-900 dark:text-white">{title}</h2>
      {helperText && (
        <p className="text-xs font-normal text-gray-400">{helperText}</p>
      )}
    </div>
    {children}
  </section>
);

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  helperText,
  formik,
  type = "text",
}) => {
  const error =
    formik.touched[name] && (formik.errors[name] as string | undefined);

  const value = ((formik.values[name] as string) ?? "") as string;

  return (
    <div>
      <label className="mb-1 block text-sm font-normal text-neutral-900 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 font-normal"
      />
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
};

type TextAreaFieldProps = BaseFieldProps & {
  rows?: number;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  helperText,
  formik,
  rows = 4,
}) => {
  const error =
    formik.touched[name] && (formik.errors[name] as string | undefined);

  const value = ((formik.values[name] as string) ?? "") as string;

  return (
    <div>
      <label className="mb-1 block text-sm font-normal text-neutral-900 dark:text-gray-300">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 font-normal"
      />
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
};
