import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  headerAction,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`border border-zinc-800 bg-zinc-900 rounded-none overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-emerald-500 rounded-none" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
              {title}
            </span>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};
