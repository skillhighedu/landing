export default function RecognizedLogo({ logo, alt }: any) {
  return (
    <div
      className="
        h-full min-h-[120px]
        flex items-center justify-center
        rounded-xl
        bg-neutral-100 dark:bg-neutral-900   /* important fix */
        border border-neutral-200 dark:border-neutral-800
        p-6
      "
    >
      <img
  src={logo}
  alt={alt}
  className="max-h-20 object-contain dark:invert-0 invert-0"
/>

    </div>
  );
}
