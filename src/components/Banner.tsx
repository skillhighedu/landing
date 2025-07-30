
import { Button } from "./ui/button";
export default function Banner() {
  return (
    <div className="w-full bg-primary text-white px-4 py-2 sm:py-3 shadow-sm mt-18">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-sm sm:text-base font-medium">
          <span className="mr-1">🚀</span>
          Join the <span className="underline underline-offset-2 font-normal">Full Stack Course</span> @ just{" "}
          <span className="text-yellow-300 font-bold">₹4999</span> – Limited Time Only!
        </p>
         <Button
            className="bg-red-600 text-white text-base sm:text-md  py-3 px-6 sm:py-4 sm:px-8 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
            aria-label="Start Building Skills"
          >
           Join Now
          
          </Button>
      </div>
    </div>
  );
}
