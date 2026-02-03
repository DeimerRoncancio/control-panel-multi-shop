import { useNavigate } from 'react-router';

type Props = {
  isUpdating: boolean;
}

export function HeaderProduct({ isUpdating }: Props) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate("/products")}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-purple-500 bg-clip-text text-transparent">
              Editar Producto
            </h1>
            <p className="text-sm opacity-70">
              Modificando: Mando X-BOX Series X
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="btn w-40 btn-primary bg-purple-500 border-none"
            disabled={isUpdating}
          >
            {isUpdating ? (
                <span className="loading loading-spinner"></span>
            ) : (
              'Actualizar Producto'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
