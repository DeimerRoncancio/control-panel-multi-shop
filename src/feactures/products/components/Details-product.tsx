import { AiFillProduct } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa6';

function DetailsProduct() {
  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaBoxOpen size={35} />
        </div>
        <div className="stat-title">Total Productos</div>
        <div className="stat-value text-primary">6</div>
        <div className="stat-desc">productos registrados</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-success">
          <AiFillProduct size={35} />
        </div>
        <div className="stat-title">Multi-Categoría</div>
        <div className="stat-value text-success">5</div>
        <div className="stat-desc">productos versátiles</div>
      </div>
    </div>
  );
}
export default DetailsProduct;
