import CustomButton from "./Button";

export default function Banner() {
  return (
    <div className="w-full bg-primary/10 text-white px-4 py-3 sm:py-4 mt-14 sm:mt-18 shadow-md border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Text */}
        <p className="text-sm sm:text-base  leading-snug">
          <span className="mr-1">🚀</span>
          Join the{" "}
          <span className=" ">
            Full Stack Course
          </span>{" "}
          at just{" "}
          <span className="text-yellow-400 font-bold">₹4,999</span> – Limited Time Offer!
        </p>

        {/* CTA Button */}
        <CustomButton
          title="Join Now"
          icon=""
          className="bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-200 font-semibold px-6 py-2 rounded-md"
        />
      </div>
    </div>
  );
}
