import React from 'react';
import { Exercise } from '../../types/lesson.types';
import { FillInTheBlank } from './FillInTheBlank';
import { ParsonsProblem } from './ParsonsProblem';
import { MultipleChoice } from './MultipleChoice';

export interface ExerciseHostProps {
  exercise: Exercise;
  onAnswerChange: (value: string | string[]) => void;
  disabled?: boolean;
}

export const ExerciseHost: React.FC<ExerciseHostProps> = ({
  exercise,
  onAnswerChange,
  disabled = false,
}) => {
  switch (exercise.type) {
    case 'fill-in-the-blank':
      return (
        <FillInTheBlank
          key={exercise.id}
          exercise={exercise}
          onValueChange={onAnswerChange}
          disabled={disabled}
        />
      );

    case 'parsons-problem':
      return (
        <ParsonsProblem
          key={exercise.id}
          exercise={exercise}
          onValueChange={onAnswerChange}
          disabled={disabled}
        />
      );

    case 'multiple-choice':
      return (
        <MultipleChoice
          key={exercise.id}
          exercise={exercise}
          onValueChange={onAnswerChange}
          disabled={disabled}
        />
      );

    default: {
      const _exhaustiveCheck: never = exercise;
      return (
        <div className="border border-red-800 bg-red-950/40 p-4 text-xs text-red-300 font-mono rounded-none">
          [CRITICAL]: Tipo de ejercicio no reconocido: {JSON.stringify(_exhaustiveCheck)}
        </div>
      );
    }
  }
};
