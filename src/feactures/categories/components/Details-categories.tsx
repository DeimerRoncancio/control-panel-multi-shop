import { AiFillProduct } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";

export default function DetailsCategories() {
  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaBoxOpen size={35} />
        </div>
        <div className="stat-title">Total Categorias</div>
        <div className="stat-value text-primary">5</div>
        <div className="stat-desc">Categorias registradas</div>
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