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
  <section className="mb-10">
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h2 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-white">
        {title}
      </h2>

      {helperText && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {helperText}
        </p>
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
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-white
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-primary
          transition
          ${error ? "border-red-500 focus:ring-red-500" : "border-neutral-300 dark:border-neutral-700"}
        `}
      />

      {helperText && !error && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
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
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-white
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-primary
          transition resize-none
          ${error ? "border-red-500 focus:ring-red-500" : "border-neutral-300 dark:border-neutral-700"}
        `}
      />

      {helperText && !error && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
