import { cn } from '@/lib/utils';

export default function HudCorners({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 opacity-30', className)}>
      <div className="absolute left-4 top-4 w-6 h-5 border-l border-t border-primary/20 rounded-tl" />
      <div className="absolute right-4 top-4 w-6 h-5 border-r border-t border-primary/20 rounded-tr" />
      <div className="absolute left-4 bottom-4 w-6 h-5 border-l border-b border-primary/20 rounded-bl" />
      <div className="absolute right-4 bottom-4 w-6 h-5 border-r border-b border-primary/20 rounded-br" />
    </div>
  );
}
