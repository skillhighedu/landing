import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CustomButton from "@/components/common/Button";
import { type Quiz, courseQuizzesData } from "@/data/courseQuizzes";
import HeaderSection from "@/components/common/HeaderSection";
import DashboardLayout from "@/layouts/DashboardLayout";

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
   <DashboardLayout>
     <div className="min-h-screen bg-neutral-950 text-white  py-12 px-4">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <HeaderSection title="Quizzes" />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="
              rounded-lg bg-neutral-900 border border-neutral-800 
              hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10
              transition-all duration-200 
              p-6 flex flex-col gap-4
            "
          >
            {/* Badge + Title */}
            <div className="flex items-start gap-3">
              <div className="
                w-12 h-12 rounded-lg border border-green-500/50 
                bg-green-500/10 flex items-center justify-center 
                text-green-400 font-semibold text-sm
                shrink-0
              ">
                {index + 1}
              </div>

              <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
                {quiz.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 flex-1">
              {quiz.description}
            </p>

            {/* CTA Button */}
            <CustomButton
              title="Start Quiz"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="w-full mt-auto"
            />
          </motion.div>
        ))}
      </div>
    </div>
   </DashboardLayout>
  );
}
