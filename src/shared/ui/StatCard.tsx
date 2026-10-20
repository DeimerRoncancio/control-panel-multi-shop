import { IconType } from 'react-icons';

type StatCardProps = {
  label: string;
  value: number | string;
  hint?: string;
  icon: IconType;
  tone?: 'brand' | 'success' | 'sun' | 'error' | 'sky' | 'lilac';
};

const tones = {
  brand: 'bg-brand-soft text-brand',
  success: 'bg-mint text-success',
  sun: 'bg-sun-soft text-ink',
  error: 'bg-rose text-error',
  sky: 'bg-sky text-sky-strong',
  lilac: 'bg-lilac text-lilac-strong',
};

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'brand',
}: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-base-100 p-5">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[tone]}`}
      >
        <Icon size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.06em] text-ink-muted">
          {label}
        </p>
        <p className="text-3xl font-extrabold leading-tight tracking-tight text-ink tabular-nums">
          {value}
        </p>
        {hint && <p className="truncate text-xs text-ink-muted">{hint}</p>}
      </div>
    </div>
  );
}
