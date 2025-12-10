import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CustomButton from "@/components/common/Button";;
;
import { type Quiz, courseQuizzesData } from "@/data/courseQuizzes";
import HeaderSection from "@/components/common/HeaderSection";

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
  <div className="min-h-screen bg-neutral-950 text-white mt-12 py-10 px-4">
    
    {/* Page Header */}
    <div className="max-w-6xl mx-auto mb-8">
      <HeaderSection title="Quizzes" />
    </div>

    {/* Grid */}
    <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz, index) => (
        <motion.div
          key={quiz.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
          className="
            rounded-xl bg-neutral-900 border border-neutral-800 
            hover:border-green-500/40 transition-all duration-300 
            p-6 flex flex-col group shadow-lg
          "
        >
          {/* Badge + Title */}
          <div className="flex items-start gap-3 mb-4">
            <div className="
              w-10 h-10 rounded-md border border-green-500 
              bg-green-500/10 flex items-center justify-center 
              text-green-400 font-bold shadow-[2px_2px_0_#000]
            ">
              Q{index + 1}
            </div>

            <h3 className="text-lg  text-green-400 line-clamp-2">
              {quiz.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1 mb-6">
            {quiz.description}
          </p>

          {/* CTA Button */}
          <CustomButton
          title="Start"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
            className={`
              w-full flex items-center justify-center gap-2 rounded-lg font-medium py-5
              transition-colors bg-green-800
            `}
          >
           
          </CustomButton>
        </motion.div>
      ))}
    </div>
  </div>
);

}
