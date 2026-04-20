import React from "react";
import type { FormikProps } from "formik";
import type { ResumeFormValues } from "@/types/resume";
import { ImagePlus, Trash2 } from "lucide-react";

type ResumeFormik = FormikProps<ResumeFormValues>;
const MAX_RESUME_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const MIN_RESUME_IMAGE_WIDTH = 200;
const MIN_RESUME_IMAGE_HEIGHT = 200;
const MAX_RESUME_IMAGE_WIDTH = 2000;
const MAX_RESUME_IMAGE_HEIGHT = 2000;

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

type ImageUploadFieldProps = {
  name: keyof ResumeFormValues;
  label: string;
  helperText?: React.ReactNode;
  formik: ResumeFormik;
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Unable to read selected file"));
    reader.readAsDataURL(file);
  });

const getImageDimensions = (imageSrc: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () =>
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    image.onerror = () => reject(new Error("Unable to read image dimensions"));
    image.src = imageSrc;
  });

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  label,
  helperText,
  formik,
}) => {
  const inputId = `resume-${String(name)}`;
  const value = ((formik.values[name] as string) ?? "") as string;
  const error =
    formik.touched[name] && (formik.errors[name] as string | undefined);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];
    formik.setFieldTouched(name, true, false);

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      formik.setFieldError(name, "Please select an image file");
      return;
    }

    if (file.size > MAX_RESUME_IMAGE_SIZE_BYTES) {
      formik.setFieldError(name, "Please upload an image smaller than 2 MB");
      return;
    }

    try {
      const imageDataUrl = await readFileAsDataUrl(file);
      const { width, height } = await getImageDimensions(imageDataUrl);

      if (width < MIN_RESUME_IMAGE_WIDTH || height < MIN_RESUME_IMAGE_HEIGHT) {
        formik.setFieldError(
          name,
          `Image must be at least ${MIN_RESUME_IMAGE_WIDTH}x${MIN_RESUME_IMAGE_HEIGHT}px`,
        );
        return;
      }

      if (width > MAX_RESUME_IMAGE_WIDTH || height > MAX_RESUME_IMAGE_HEIGHT) {
        formik.setFieldError(
          name,
          `Image must be no larger than ${MAX_RESUME_IMAGE_WIDTH}x${MAX_RESUME_IMAGE_HEIGHT}px`,
        );
        return;
      }

      formik.setFieldValue(name, imageDataUrl);
      formik.setFieldError(name, undefined);
    } catch {
      formik.setFieldError(name, "Unable to load the selected image");
    } finally {
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-800 dark:text-neutral-300"
        >
          {label}
        </label>

        {helperText && !error && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50 sm:flex-row sm:items-center">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-950">
          {value ? (
            <img
              src={value}
              alt="Resume profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 px-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
              <ImagePlus size={20} />
              <span>No photo selected</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <input
            id={inputId}
            name={String(name)}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            onBlur={() => formik.setFieldTouched(name, true, false)}
          />

          <div className="flex flex-wrap gap-3">
            <label
              htmlFor={inputId}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <ImagePlus size={16} />
              {value ? "Change photo" : "Upload photo"}
            </label>

            {value && (
              <button
                type="button"
                onClick={() => {
                  formik.setFieldValue(name, "");
                  formik.setFieldTouched(name, true, false);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition hover:bg-muted"
              >
                <Trash2 size={16} />
                Remove
              </button>
            )}
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            JPG, PNG, or WEBP works best. Max size: 2 MB. Dimensions must be between
            {" "}
            200x200 and 2000x2000 px.
          </p>
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
