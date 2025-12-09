import { AiFillProduct } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa6';

type Props = {
  totalProducts?: number;
};

function DetailsProduct({ totalProducts }: Props) {
  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaBoxOpen size={35} />
        </div>
        <div className="stat-title">Total Productos</div>
        <div className="stat-value text-primary">{totalProducts || 0}</div>
        <div className="stat-desc">Productos registrados</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-success">
          <AiFillProduct size={35} />
        </div>
        <div className="stat-title">Productos variables</div>
        <div className="stat-value text-success">5</div>
        <div className="stat-desc">Productos versátiles</div>
      </div>
    </div>
  );
}
export default DetailsProduct;
