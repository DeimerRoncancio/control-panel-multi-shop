import React from 'react';

export function ButtonModal({
  idModal,
  children,
  className,
}: {
  idModal: string;
  children: React.ReactNode;
  className: string;
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
      }}
    >
      {children}
    </button>
  );
}
