import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { TerminalBadge } from '../../components/common/TerminalBadge';
import { soundFx } from '../../services/audio/soundFx';

interface StoreItem {
  id: string;
  name: string;
  category: 'UTILIDAD' | 'TEMA' | 'SONIDO' | 'TÍTULO';
  price: number;
  description: string;
  isOwned: boolean;
  isEquipped: boolean;
}

export const StoreView: React.FC = () => {
  const [balance, setBalance] = useState<number>(480);
  const [items, setItems] = useState<StoreItem[]>([
    {
      id: 'item-freeze',
      name: 'Escudo Protector de Racha (Streak Freeze)',
      category: 'UTILIDAD',
      price: 200,
      description: 'Mantiene tu racha activa si no puedes ingresar durante 24 horas.',
      isOwned: false,
      isEquipped: false,
    },
    {
      id: 'item-theme-amber',
      name: 'Tema Visual: Terminal CRT Amber Phosphor',
      category: 'TEMA',
      price: 450,
      description: 'Monocromo ámbar con efecto de fósforo de alta persistencia y brillo angular.',
      isOwned: false,
      isEquipped: false,
    },
    {
      id: 'item-sfx-mech',
      name: 'Pack SFX: Interruptores Mecánicos IBM Model M',
      category: 'SONIDO',
      price: 300,
      description: 'Efectos acústicos táctiles para validaciones y pulsaciones de código.',
      isOwned: true,
      isEquipped: true,
    },
    {
      id: 'item-title-kernel',
      name: 'Título: Kernel Hacker',
      category: 'TÍTULO',
      price: 600,
      description: 'Badge visible en tu perfil y clasificaciones de cohorte.',
      isOwned: false,
      isEquipped: false,
    },
  ]);

  const handlePurchase = (item: StoreItem) => {
    if (balance < item.price) {
      soundFx.playErrorBuzz();
      alert(`[FONDOS INSUFICIENTES]: Requiere $${item.price} DEV. Tu balance actual es $${balance} DEV.`);
      return;
    }

    soundFx.playSuccessChime();
    setBalance((prev) => prev - item.price);
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, isOwned: true, isEquipped: true } : i
      )
    );
  };

  const handleToggleEquip = (item: StoreItem) => {
    soundFx.playSelectBeep();
    setItems((prev) =>
      prev.map((i) => {
        if (i.category === item.category) {
          return { ...i, isEquipped: i.id === item.id ? !i.isEquipped : false };
        }
        return i;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto font-mono select-none">
      <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 uppercase">
            TIENDA DE PERSONALIZACIÓN Y COSMÉTICOS
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Economía basada en mérito técnico. Canjea tus $DEV acumulados sin mecánicas pay-to-win.
          </p>
        </div>
        <div className="border border-emerald-800 bg-emerald-950/40 px-4 py-2 text-sm text-emerald-400 font-bold shadow-[2px_2px_0px_#064e3b]">
          BALANCE DISPONIBLE: ${balance} DEV
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} title={item.category} className="shadow-[4px_4px_0px_#18181b]">
            <div className="flex flex-col justify-between h-full gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-200">{item.name}</h3>
                  <span className="text-xs font-bold text-emerald-400">
                    ${item.price} DEV
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-center">
                <TerminalBadge
                  label={
                    item.isEquipped
                      ? 'EQUIPADO'
                      : item.isOwned
                      ? 'ADQUIRIDO'
                      : 'DISPONIBLE'
                  }
                  variant={item.isEquipped ? 'emerald' : item.isOwned ? 'amber' : 'zinc'}
                />

                {item.isOwned ? (
                  <Button
                    variant={item.isEquipped ? 'outline' : 'secondary'}
                    size="sm"
                    onClick={() => handleToggleEquip(item)}
                  >
                    {item.isEquipped ? 'DESEQUIPAR' : 'EQUIPAR'}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={balance < item.price}
                    onClick={() => handlePurchase(item)}
                  >
                    ADQUIRIR
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
