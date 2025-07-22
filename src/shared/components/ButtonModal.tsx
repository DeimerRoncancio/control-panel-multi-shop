import React from 'react';

export function ButtonModal({
  idModal,
  children,
}: {
  idModal: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="text-[12px] btn btn-secondary btn-sm"
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
