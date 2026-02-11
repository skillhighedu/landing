import type { QuestionDTO, SubmitQuizAnswer } from "../types";


export function buildSubmitPayload(
  questions: readonly QuestionDTO[],
  selected: ReadonlyArray<ReadonlyArray<number>>,
): SubmitQuizAnswer[] {
  return questions.flatMap((q, qi) => {
    const pickedIndex = selected[qi]?.[0];
    if (pickedIndex === undefined) return [];

    const pickedAnswer = q.answers[pickedIndex];
    if (!pickedAnswer) return [];

    return [{ questionId: q.id, answerId: pickedAnswer.id }];
  });
}