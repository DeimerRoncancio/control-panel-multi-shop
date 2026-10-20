import { ToastContainer } from 'react-toastify';
import { FiArrowRight, FiBox, FiGrid, FiUserPlus } from 'react-icons/fi';
import ButtonModal from '../../../shared/components/globalComponents/ButtonModal';
import ModalUserCreate from '../../../shared/components/users/register/Modal-user-create';
import ModalProductCreate from '../../products/components/create/Modal-create-product';
import ModalCreateCategory from '../../categories/components/Modal-create-category';

const actions = [
  {
    id: 'create_product',
    title: 'Crear producto',
    text: 'Fotos, precio y categorías',
    icon: FiBox,
    tone: 'bg-brand-soft text-brand',
  },
  {
    id: 'create_category',
    title: 'Nueva categoría',
    text: 'Con su propio color',
    icon: FiGrid,
    tone: 'bg-lilac text-lilac-strong',
  },
  {
    id: 'create_user',
    title: 'Registrar usuario',
    text: 'Cliente con cuenta',
    icon: FiUserPlus,
    tone: 'bg-sky text-sky-strong',
  },
];

export default function QuickActions() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {actions.map(({ id, title, text, icon: Icon, tone }) => (
        <ButtonModal
          key={id}
          idModal={id}
          className="group flex items-center gap-4 rounded-2xl border border-line bg-base-100 p-4 text-left transition-[border-color,box-shadow] hover:border-brand/40 hover:shadow-card-hover"
        >
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tone}`}
          >
            <Icon size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-extrabold text-ink">{title}</span>
            <span className="block text-xs text-ink-muted">{text}</span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink transition-colors group-hover:bg-brand group-hover:text-white">
            <FiArrowRight size={16} />
          </span>
        </ButtonModal>
      ))}

      <ModalUserCreate isAdmin={false} />
      <ModalCreateCategory />
      <ModalProductCreate />
      <ToastContainer />
    </div>
  );
}
