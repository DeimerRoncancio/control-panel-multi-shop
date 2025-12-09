import React from 'react';

type Props = {
  idModal: string;
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

export function ButtonModal({ idModal, children, className, onClick }: Props) {
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
