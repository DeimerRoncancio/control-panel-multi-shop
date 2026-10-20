import { ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

type ModalHeaderProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  tone?: 'brand' | 'error';
  onClose: () => void;
};

export default function ModalHeader({
  icon,
  title,
  description,
  tone = 'brand',
  onClose,
}: ModalHeaderProps) {
  return (
    <div className="mb-4 flex items-start gap-3.5">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
          tone === 'error'
            ? 'bg-error/10 text-error'
            : 'bg-brand-soft text-brand'
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-extrabold leading-tight text-ink">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-ink-soft">{description}</p>
        )}
      </div>
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
      >
        <IoCloseOutline size={22} />
      </button>
    </div>
  );
}
