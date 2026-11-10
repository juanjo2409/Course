/**
 * Tipos de ejercicios dinámicos soportados por la plataforma
 */
export type ExerciseType = 'fill-in-the-blank' | 'parsons-problem' | 'multiple-choice';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  codeSnippet?: string;
  language: 'python' | 'javascript' | 'sql' | 'csharp';
  baseXp: number;
  hint?: string;
}

export interface FillInTheBlankExercise extends BaseExercise {
  type: 'fill-in-the-blank';
  template: string; // Ejemplo: "def get_area(width, height):\n    return width * [BLANK]"
  blankTokenId: string;
  placeholder?: string;
}

export interface ParsonsBlock {
  id: string;
  code: string;
  indentationLevel?: number;
}

export interface ParsonsProblemExercise extends BaseExercise {
  type: 'parsons-problem';
  scrambledBlocks: ParsonsBlock[];
}

export interface MultipleChoiceOption {
  id: string;
  label: string;
  isCode?: boolean;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  options: MultipleChoiceOption[];
}

export type Exercise = FillInTheBlankExercise | ParsonsProblemExercise | MultipleChoiceExercise;

export interface LessonDetail {
  id: string;
  trackId: string;
  title: string;
  description: string;
  targetDurationSeconds: number;
  totalXpReward: number;
  exercises: Exercise[];
}

export interface SubmitAnswerPayload {
  lessonId: string;
  exerciseId: string;
  timeElapsedSeconds: number;
  // Unión de valores según el ejercicio:
  // - fill-in-the-blank: string
  // - parsons-problem: string[] (orden de IDs)
  // - multiple-choice: string (ID de opción)
  answerValue: string | string[];
}

export interface SubmitAnswerResult {
  isCorrect: boolean;
  explanation: string;
  xpEarned: number;
  heartsRemaining: number;
  hasStreakBonus: boolean;
  isLessonCompleted: boolean;
}
