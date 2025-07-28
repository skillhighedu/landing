import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="w-full bg-primary text-white px-4 py-2 sm:py-3 shadow-sm mt-18">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-sm sm:text-base font-medium">
          <span className="mr-1">🚀</span>
          Join the <span className="underline underline-offset-2 font-semibold">Full Stack Course</span> @ just{" "}
          <span className="text-yellow-300 font-bold">₹4999</span> – Limited Time Only!
        </p>
        <Link
          to="/courses/fullstack"
          className="inline-block text-sm font-semibold bg-white text-green-600 px-4 py-2 rounded-full hover:bg-gray-100 transition"
        >
          Enroll Now →
        </Link>
      </div>
    </div>
  );
}
