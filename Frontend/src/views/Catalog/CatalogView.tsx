import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { TerminalBadge } from '../../components/common/TerminalBadge';
import { soundFx } from '../../services/audio/soundFx';

export const CatalogView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('TODAS');

  const tracks = [
    {
      id: 'py-track',
      title: 'Módulo 1: Fundamentos y Lógica Pura (Python)',
      lessons: 24,
      duration: '4h 30m',
      level: 'INICIAL',
      runtime: 'Pyodide WASM',
      category: 'PYTHON',
      tags: ['Variables', 'Listas', 'Estructuras de Control', 'Funciones'],
    },
    {
      id: 'web-track',
      title: 'Módulo 2: Núcleo Web y Persistencia Relacional',
      lessons: 36,
      duration: '8h 00m',
      level: 'INTERMEDIO',
      runtime: 'Web Workers JS / SQLite WASM',
      category: 'WEB',
      tags: ['HTML5', 'Tailwind CSS', 'React 19', 'SQL PostgreSQL'],
    },
    {
      id: 'dotnet-track',
      title: 'Módulo 3: Especialización Backend de Producción (ASP.NET Core)',
      lessons: 40,
      duration: '10h 15m',
      level: 'AVANZADO',
      runtime: 'Docker Runner Efímero',
      category: 'BACKEND',
      tags: ['C#', '.NET Minimal APIs', 'Entity Framework Core', 'Clean Architecture'],
    },
  ];

  const filters = ['TODAS', 'PYTHON', 'WEB', 'BACKEND'];

  const filteredTracks =
    selectedFilter === 'TODAS'
      ? tracks
      : tracks.filter((t) => t.category === selectedFilter);

  const handleFilterClick = (f: string) => {
    soundFx.playSelectBeep();
    setSelectedFilter(f);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto font-mono select-none">
      <div className="border-b border-zinc-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 uppercase">
            CATÁLOGO DE RUTAS Y ESPECIALIZACIONES
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Rutas de micro-aprendizaje desacopladas orientadas a arquitectura de software.
          </p>
        </div>

        {/* Filtros Interactivos */}
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              className={`px-3 py-1.5 text-xs uppercase font-bold border transition-colors cursor-pointer rounded-none ${
                selectedFilter === f
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => (
          <Card key={track.id} title={track.level} className="flex flex-col justify-between shadow-[4px_4px_0px_#18181b]">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-zinc-100 leading-snug">
                {track.title}
              </h3>
              <div className="text-[10px] text-zinc-400">
                <span>{track.lessons} Lecciones</span> // <span>{track.duration}</span>
              </div>
              <div className="border border-zinc-800 bg-zinc-950 p-2 text-[10px] text-zinc-500">
                RUNTIME: <span className="text-emerald-400">{track.runtime}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {track.tags.map((t) => (
                  <TerminalBadge key={t} label={t} variant="zinc" />
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => alert(`[CATALOG] Inspeccionando ruta: ${track.title}`)}
              >
                INSPECCIONAR RUTA &gt;
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
