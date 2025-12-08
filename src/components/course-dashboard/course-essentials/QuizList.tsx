import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Brain, Clock, ChevronRight, CheckCircle2, Target } from "lucide-react";
import CustomButton from "@/components/Button";
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 sm:px-8 py-12 text-white font-sans">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-normal text-teal-400 tracking-wide">Available Quizzes</h1>
      </div>

      {/* Quiz Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700 hover:border-lime-400/50 transition-all duration-300 overflow-hidden group"
          >
            {/* Header with number */}
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-6 border-b border-neutral-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-lime-400/10 flex items-center justify-center border border-lime-400/30">
                    <span className="text-lime-400 font-medium text-base">Q{index + 1}</span>
                  </div>
                  {quiz.completed && (
                    <div className="flex items-center gap-2 text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-md border border-green-500/30 font-normal">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                </div>
                <div className={`px-3 py-1.5 rounded-md text-xs font-normal border ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </div>
              </div>
              <h3 className="text-xl font-normal text-white group-hover:text-lime-400 transition-colors mt-2">
                {quiz.title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 flex flex-col">
              <p className="text-base text-gray-400 leading-relaxed font-normal">
                {quiz.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-lime-400" />
                  <span className="font-normal">{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="font-normal">{quiz.duration} min</span>
                </div>
                {quiz.completed && quiz.score && (
                  <div className="flex items-center gap-2 ml-auto">
                    <Target className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-green-400">{quiz.score}%</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <CustomButton
                title={quiz.completed ? "Retake Quiz" : "Start Quiz"}
                className={`w-full flex items-center justify-center gap-2 font-normal text-base ${
                  quiz.completed
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
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
