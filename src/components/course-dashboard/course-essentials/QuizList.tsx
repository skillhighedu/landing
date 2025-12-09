import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import CustomButton from "@/components/Button";
import BackButton from "@/components/BackButton";
import { type Quiz, courseQuizzesData } from "@/data/courseQuizzes";

export default function QuizList() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [quizzes] = useState<Quiz[]>(
    courseQuizzesData[courseId || "67691eb73f409fe0a9890a04"] || []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-6 md:p-10 text-white font-pixel">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <BackButton className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-[#16C47F] pixel-shadow text-center">
          Available Quizzes
        </h1>
        <p className="text-base text-gray-300 font-bricolage text-center mt-3">
          {quizzes.length} {quizzes.length === 1 ? 'Quiz' : 'Quizzes'} • Test Your Knowledge
        </p>
      </div>

      {/* Quiz Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#1a1a1a] shadow-2xl rounded-2xl overflow-hidden border-2 border-black hover:border-[#16C47F]/50 transition-all duration-300 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex flex-col flex-1">
              {/* Quiz Number and Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-md bg-[#16C47F]/20 flex items-center justify-center border-2 border-[#16C47F] flex-shrink-0 shadow-[2px_2px_0_#000]">
                  <span className="text-[#16C47F] font-bold text-sm pixel-shadow">Q{index + 1}</span>
                </div>
                
                {/* Title - Fixed Height */}
                <h3 className="text-lg font-bold text-[#16C47F] pixel-shadow line-clamp-2 min-h-[3.5rem] flex-1">
                  {quiz.title}
                </h3>
              </div>

              {/* Description - Fixed Height */}
              <p className="text-sm text-gray-300 leading-relaxed font-bricolage line-clamp-3 flex-1 mb-6">
                {quiz.description}
              </p>

              {/* Action Button - Always at bottom */}
              <CustomButton
                title={quiz.completed ? "Retake Quiz" : "Start Quiz"}
                className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 ${
                  quiz.completed
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-[#16C47F] hover:bg-[#14b371] text-black"
                }`}
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                <ChevronRight className="w-5 h-5" />
              </CustomButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
