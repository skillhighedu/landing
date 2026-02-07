export interface QuizCardProps {
  index: number;
  title: string;
  description: string;
  questions: number;
  onStart: () => void;
}

export interface HeaderProps {
  current: number;
  total: number;
}

// export type QuizByQuizIdResponse =
//   | ({
//       questions: ({
//         answers: {
//           id: string;
//           createdAt: Date;
//           updatedAt: Date;
//           text: string;
//           isCorrect: boolean;
//           questionId: string;
//         }[];
//       } & {
//         id: string;
//         createdAt: Date;
//         updatedAt: Date;
//         quizId: string;
//         text: string;
//         correctAnswerId: string | null;
//       })[];
//     } & {
//       courseId: string;
//       id: string;
//       createdAt: Date;
//       topicId: string;
//     })
//   | null;

export type QuizAnswer = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  isCorrect: boolean;
  questionId: string;
};

export type QuizQuestion = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quizId: string;
  text: string;
  correctAnswerId: string | null;
  answers: QuizAnswer[];
};

export type QuizByQuizIdResponse = {
  courseId: string;
  id: string;
  createdAt: Date;
  topicId: string;
  questions: QuizQuestion[];
}| null; 

export type QuizzesByCourseIdResponse = {
    id: string;
    questions: {
        id: string;
    }[];
};
