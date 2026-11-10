import { HttpClient } from './client';
import { LessonDetail, SubmitAnswerPayload, SubmitAnswerResult } from '../../types/lesson.types';

// Lección de demostración para desarrollo y testing sin backend activo
export const MOCK_LESSON_DEMO: LessonDetail = {
  id: 'lesson-py-101',
  trackId: 'track-python-core',
  title: 'Control de Flujo: Funciones y Retornos',
  description: 'Aprende la anatomía básica de una función en Python y la emisión de valores de retorno.',
  targetDurationSeconds: 180,
  totalXpReward: 50,
  exercises: [
    {
      id: 'ex-1',
      type: 'fill-in-the-blank',
      prompt: 'Completa la palabra clave necesaria para emitir un valor desde la función:',
      language: 'python',
      baseXp: 15,
      template: 'def duplicar(numero):\n    ____ numero * 2',
      blankTokenId: 'return',
      placeholder: 'palabra_clave',
      hint: 'En Python se usa la palabra reservada return.',
    },
    {
      id: 'ex-2',
      type: 'parsons-problem',
      prompt: 'Ordena los siguientes bloques lógicos para construir una función que valide si un número es positivo:',
      language: 'python',
      baseXp: 20,
      scrambledBlocks: [
        { id: 'b3', code: '    return False' },
        { id: 'b1', code: 'def es_positivo(val):' },
        { id: 'b2', code: '    if val > 0:\n        return True' },
      ],
      hint: 'Primero define la cabecera con def, luego la rama verdadera y finalmente el retorno por defecto.',
    },
    {
      id: 'ex-3',
      type: 'multiple-choice',
      prompt: '¿Cuál es la salida impresa en consola tras ejecutar este bloque?',
      language: 'python',
      baseXp: 15,
      codeSnippet: 'def add(a, b=5):\n    return a + b\n\nprint(add(10))',
      options: [
        { id: 'opt-a', label: '10', isCode: true },
        { id: 'opt-b', label: '15', isCode: true },
        { id: 'opt-c', label: 'TypeError: missing argument', isCode: true },
        { id: 'opt-d', label: 'None', isCode: true },
      ],
      hint: 'El parámetro b tiene un valor por defecto igual a 5.',
    },
  ],
};

export class LessonService {
  /**
   * Obtiene la estructura y retos de una lección desde la API
   */
  public async getLessonById(lessonId: string, signal?: AbortSignal): Promise<LessonDetail> {
    try {
      return await HttpClient.get<LessonDetail>(`/lessons/${lessonId}`, signal);
    } catch (error) {
      console.warn(`[LessonService] Fallo al conectar con backend. Cargando lección mock: ${lessonId}`, error);
      return MOCK_LESSON_DEMO;
    }
  }

  /**
   * Envía la respuesta de un reto al backend para su validación formal y gamificación
   */
  public async submitAnswer(
    payload: SubmitAnswerPayload,
    signal?: AbortSignal
  ): Promise<SubmitAnswerResult> {
    try {
      return await HttpClient.post<SubmitAnswerResult>(
        `/lessons/${payload.lessonId}/submit`,
        payload,
        signal
      );
    } catch {
      // Fallback de validación simulada en cliente para pruebas locales
      return this.evaluateMockAnswer(payload);
    }
  }

  private evaluateMockAnswer(payload: SubmitAnswerPayload): SubmitAnswerResult {
    let isCorrect = false;
    let explanation = '';

    if (payload.exerciseId === 'ex-1') {
      isCorrect = typeof payload.answerValue === 'string' && payload.answerValue.trim() === 'return';
      explanation = isCorrect
        ? '¡Correcto! "return" finaliza la ejecución de la función y devuelve el valor resultante.'
        : 'Sintaxis errónea: Para retornar valores en Python se utiliza la palabra reservada "return".';
    } else if (payload.exerciseId === 'ex-2') {
      const order = Array.isArray(payload.answerValue) ? payload.answerValue : [];
      isCorrect = order.join(',') === 'b1,b2,b3';
      explanation = isCorrect
        ? '¡Excelente reordenamiento! La definición precede a la condición y el caso base.'
        : 'El orden lógico no es el adecuado. Revisa la secuencia de ejecución de las instrucciones.';
    } else if (payload.exerciseId === 'ex-3') {
      isCorrect = payload.answerValue === 'opt-b';
      explanation = isCorrect
        ? '¡Exacto! El argumento b asume su valor por defecto 5, resultando en 10 + 5 = 15.'
        : 'Incorrecto. Recuerda considerar el valor predeterminado del parámetro b.';
    }

    return {
      isCorrect,
      explanation,
      xpEarned: isCorrect ? 15 : 0,
      heartsRemaining: isCorrect ? 5 : 4,
      hasStreakBonus: isCorrect && payload.timeElapsedSeconds < 60,
      isLessonCompleted: payload.exerciseId === 'ex-3' && isCorrect,
    };
  }
}

export const lessonService = new LessonService();
