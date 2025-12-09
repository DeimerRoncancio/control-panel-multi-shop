import React from 'react';

export function ButtonModal({
  idModal,
  children,
  className,
  onClick,
}: {
  idModal: string;
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`${className}`}
      onClick={() => {
        const modal = document.getElementById(
          idModal
        ) as HTMLDialogElement | null;
        if (modal) {
          modal.showModal();
        }
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

export default ButtonModal;
