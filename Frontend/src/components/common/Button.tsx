import React from 'react';
import { soundFx } from '../../services/audio/soundFx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  tactile?: boolean;
  shortcutBadge?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  tactile = true,
  shortcutBadge,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider select-none rounded-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs border',
    md: 'px-5 py-2.5 text-xs border',
    lg: 'px-7 py-3 text-sm border-2',
  }[size];

  const variantStyles = {
    primary: tactile
      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 btn-tactile-emerald'
      : 'bg-emerald-500 text-zinc-950 border-emerald-400 hover:bg-emerald-400 active:bg-emerald-600',
    secondary: tactile
      ? 'bg-zinc-800 text-zinc-100 border-zinc-700 btn-tactile-zinc'
      : 'bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600',
    danger:
      'bg-red-600 text-zinc-100 border-red-500 hover:bg-red-500 active:bg-red-700 shadow-[2px_2px_0px_#7f1d1d]',
    outline:
      'bg-transparent text-zinc-200 border-zinc-600 hover:bg-zinc-800 hover:border-zinc-400 active:bg-zinc-700',
    ghost:
      'bg-transparent text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-zinc-200 active:bg-zinc-800',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundFx.playKeyClick();
    onClick?.(e);
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {shortcutBadge && (
          <span className="text-[10px] px-1.5 py-0.2 bg-black/30 border border-current text-inherit opacity-80">
            {shortcutBadge}
          </span>
        )}
      </span>
    </button>
  );
};
