import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { TerminalBadge } from '../../components/common/TerminalBadge';
import { Terminal, Flame, Zap, Award, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../services/audio/soundFx';

export interface DashboardViewProps {
  onStartLesson: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onStartLesson }) => {
  const [hasClaimedStreak, setHasClaimedStreak] = useState<boolean>(false);
  const [streakDays, setStreakDays] = useState<number>(7);

  // Soporte de tecla Espacio para iniciar lección rápidamente
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        soundFx.playKeyClick();
        onStartLesson();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartLesson]);

  const handleClaimStreak = () => {
    if (hasClaimedStreak) return;
    soundFx.playSuccessChime();
    setHasClaimedStreak(true);
    setStreakDays((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto font-mono select-none">
      {/* Banner Principal / Quick Action con Estética Neo-Brutalista */}
      <div className="border-2 border-emerald-500 bg-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-none shadow-[6px_6px_0px_#064e3b]">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <TerminalBadge label="MISIÓN DIARIA LISTA" variant="emerald" />
            <span className="text-xs text-zinc-500 font-semibold tracking-wider">
              RUTA: PYTHON_CORE_V1 // SESIÓN 101
            </span>
          </div>
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-zinc-100 uppercase leading-snug">
            Control de Flujo: Funciones y Retornos
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Micro-lección calibrada de 3 minutos. Evalúa la mecánica de retorno de valores, reordenamiento lógico y ámbito léxico en Python mediante 3 micro-retos dinámicos.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500 pt-1">
            <span>⏱ ~180 SEGUNDOS</span>
            <span>⚡ +50 XP RECOMPENSA</span>
            <span>❤ INTEGRIDAD DE VIDAS ACTIVADA</span>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartLesson}
            shortcutBadge="[ESPACIO]"
            className="text-sm py-4 px-8"
          >
            INICIAR RETO
          </Button>
        </div>
      </div>

      {/* Grid de Estado y Telemetría Interactivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="TELEMETRÍA DE RACHA"
          headerAction={
            !hasClaimedStreak ? (
              <button
                onClick={handleClaimStreak}
                className="text-[10px] text-amber-400 hover:text-amber-300 border border-amber-800 bg-amber-950/40 px-2 py-0.5 rounded-none cursor-pointer"
              >
                RECLAMAR HOY
              </button>
            ) : (
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> ACTIVA
              </span>
            )
          }
        >
          <div className="flex items-center gap-4 py-2">
            <div className="p-3 border border-amber-800 bg-amber-950/40 text-amber-400 rounded-none shadow-[2px_2px_0px_#78350f]">
              <Flame size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400 tracking-wider">
                {streakDays} DÍAS
              </div>
              <div className="text-[10px] text-zinc-500 uppercase mt-0.5">
                Récord: 14 Días // Escudo: [FZ: 1]
              </div>
            </div>
          </div>
        </Card>

        <Card title="POTENCIA Y RENDIMIENTO">
          <div className="flex items-center gap-4 py-2">
            <div className="p-3 border border-emerald-800 bg-emerald-950/40 text-emerald-400 rounded-none shadow-[2px_2px_0px_#064e3b]">
              <Zap size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 tracking-wider">
                1,250 XP
              </div>
              <div className="text-[10px] text-zinc-500 uppercase mt-0.5">
                +150 XP Hoy // Top 5% de la cohorte
              </div>
            </div>
          </div>
        </Card>

        <Card title="RANGO DE SISTEMA">
          <div className="flex items-center gap-4 py-2">
            <div className="p-3 border border-cyan-800 bg-cyan-950/40 text-cyan-400 rounded-none shadow-[2px_2px_0px_#164e63]">
              <Award size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400 tracking-wider">
                NIVEL 4
              </div>
              <div className="text-[10px] text-zinc-500 uppercase mt-0.5">
                Terminal Operator
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Árbol de Módulos (Syllabus) */}
      <Card title="ÁRBOL DE HABILIDADES TÉCNICAS">
        <div className="flex flex-col gap-3 py-2">
          {[
            {
              id: 'm1',
              title: 'Módulo 1: Fundamentos y Lógica Pura (Python)',
              status: 'COMPLETADO',
              progress: 100,
              badge: 'emerald',
              description: 'Variables, estructuras de control, listas, diccionarios y funciones sin fricción sintáctica.',
            },
            {
              id: 'm2',
              title: 'Módulo 2: Núcleo Web y Persistencia Relacional',
              status: 'EN PROGRESO',
              progress: 45,
              badge: 'amber',
              description: 'HTML5 semántico, Tailwind CSS angular, React 19 y consultas PostgreSQL optimizadas.',
            },
            {
              id: 'm3',
              title: 'Módulo 3: Especialización Backend de Producción (ASP.NET Core)',
              status: 'BLOQUEADO',
              progress: 0,
              badge: 'zinc',
              description: 'APIs REST de alto rendimiento con C#, Clean Architecture y Entity Framework Core.',
            },
          ].map((mod) => (
            <div
              key={mod.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-zinc-800 bg-zinc-950 rounded-none gap-3 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Terminal size={18} className="text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-zinc-200 block">{mod.title}</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">{mod.description}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
                <span className="text-xs text-zinc-500 font-bold">{mod.progress}%</span>
                <TerminalBadge
                  label={mod.status}
                  variant={mod.badge as 'emerald' | 'amber' | 'zinc'}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
