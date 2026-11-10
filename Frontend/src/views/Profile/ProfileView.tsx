import React from 'react';
import { Card } from '../../components/common/Card';
import { TerminalBadge } from '../../components/common/TerminalBadge';
import { soundFx } from '../../services/audio/soundFx';

export const ProfileView: React.FC = () => {
  const achievements = [
    {
      id: 'ach-1',
      title: 'PRIMER_COMMIT',
      desc: 'Completar tu primer micro-reto sin fallos sintácticos.',
      date: '2026-11-01',
      unlocked: true,
      xpBonus: 50,
    },
    {
      id: 'ach-2',
      title: 'SPEED_RUNNER',
      desc: 'Resolver una lección en menos de 60 segundos con 100% de precisión.',
      date: '2026-11-04',
      unlocked: true,
      xpBonus: 100,
    },
    {
      id: 'ach-3',
      title: 'SEVEN_DAY_STREAK',
      desc: 'Mantener la racha activa durante 7 días consecutivos.',
      date: '2026-11-08',
      unlocked: true,
      xpBonus: 150,
    },
    {
      id: 'ach-4',
      title: 'CLEAN_CODER',
      desc: 'Reordenar un problema de Parsons al primer intento sin reintentos.',
      date: '2026-11-09',
      unlocked: true,
      xpBonus: 75,
    },
    {
      id: 'ach-5',
      title: 'WASM_INITIATE',
      desc: 'Ejecutar 50 instrucciones en el sandbox Pyodide del cliente.',
      date: 'PENDIENTE',
      unlocked: false,
      xpBonus: 200,
    },
    {
      id: 'ach-6',
      title: 'SOCRATIC_SCHOLAR',
      desc: 'Resolver 10 lecciones consecutivas sin consultar pistas de Tier 3.',
      date: 'PENDIENTE',
      unlocked: false,
      xpBonus: 120,
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto font-mono select-none">
      {/* Tarjeta de Identidad de Desarrollador */}
      <div className="border-2 border-zinc-800 bg-zinc-900 p-6 flex flex-col sm:flex-row items-center gap-6 rounded-none shadow-[6px_6px_0px_#18181b]">
        <div className="h-24 w-24 border-2 border-emerald-500 bg-zinc-950 flex flex-col items-center justify-center text-center font-bold text-emerald-400 rounded-none shadow-[4px_4px_0px_#064e3b]">
          <span className="text-xl">DEV</span>
          <span className="text-[9px] text-zinc-500">OPERATOR</span>
        </div>
        <div className="flex flex-col gap-1 text-center sm:text-left flex-1">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <h1 className="text-xl font-bold text-zinc-100 uppercase">DEV_OPERATOR_001</h1>
            <TerminalBadge label="PRO_PLAN" variant="emerald" />
          </div>
          <span className="text-xs text-zinc-400 font-mono">UID: 8f92a10b-6c4d-498b-90f1</span>
          <span className="text-xs text-zinc-500">Miembro desde Noviembre 2026 // Stack: Python, TypeScript, .NET Core</span>
          <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
            <span>COHORTE: #2026-B</span>
            <span>EFICIENCIA: 98.4%</span>
            <span>RANKING GLOBAL: #42</span>
          </div>
        </div>
      </div>

      {/* Grid de Logros e Hitos */}
      <Card title="REGISTRO DE HITOS Y LOGROS DESBLOQUEADOS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              onClick={() => soundFx.playKeyClick()}
              className={`p-4 border transition-all rounded-none cursor-pointer ${
                ach.unlocked
                  ? 'border-zinc-800 bg-zinc-950 hover:border-emerald-700 shadow-[2px_2px_0px_#18181b]'
                  : 'border-zinc-900 bg-zinc-950/40 opacity-40 hover:opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${ach.unlocked ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  [{ach.title}]
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {ach.unlocked ? ach.date : `BLOQUEADO (+${ach.xpBonus} XP)`}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{ach.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
