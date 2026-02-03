import {
  FaBoxOpen,
  FaLayerGroup,
  FaUserPlus,
  FaUsers,
  FaPlus,
  FaTags,
  FaHistory,
  FaCalendarAlt,
  FaTrophy,
} from 'react-icons/fa';

function Dashboard() {
  return (
    <div className="w-full h-full p-8 bg-base-100 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-base-content mb-2">
          Panel de Control
        </h1>
        <p className="text-lg text-base-content/60">
          Gestiona tu tienda, productos y usuarios desde un solo lugar.
        </p>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">128</h2>
              <p className="opacity-90">Productos Activos</p>
            </div>
            <FaBoxOpen className="text-5xl opacity-80" />
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">24</h2>
              <p className="opacity-90">Categorías</p>
            </div>
            <FaLayerGroup className="text-5xl opacity-80" />
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">1,250</h2>
              <p className="opacity-90">Usuarios Registrados</p>
            </div>
            <FaUsers className="text-5xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaTags className="text-primary" /> Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-outline btn-primary h-auto py-4 flex flex-col gap-2 hover:scale-105 transition-transform">
            <FaPlus className="text-2xl" />
            <span>Crear Producto</span>
          </button>
          <button className="btn btn-outline btn-secondary h-auto py-4 flex flex-col gap-2 hover:scale-105 transition-transform">
            <FaLayerGroup className="text-2xl" />
            <span>Nueva Categoría</span>
          </button>
          <button className="btn btn-outline btn-accent h-auto py-4 flex flex-col gap-2 hover:scale-105 transition-transform">
            <FaUserPlus className="text-2xl" />
            <span>Registrar Usuario</span>
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Latest Products */}
        <div className="xl:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Últimos Productos Agregados</h3>
            <button className="btn btn-link btn-sm no-underline text-base-content/60 hover:text-primary">
              Ver catálogo completo
            </button>
          </div>

          <div className="overflow-x-auto bg-base-200 rounded-2xl p-4">
            <table className="table">
              <thead>
                <tr className="text-base-content/70 border-b-base-content/10">
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Variantes</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-base-100 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-base-300">
                            <img
                              src={`https://placehold.co/100x100?text=Prod${item}`}
                              alt="Producto"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Nike Air Max {item}00</div>
                          <div className="text-xs opacity-50">
                            Ref: NK-{2024 + item}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        Deportivos
                      </span>
                    </td>
                    <td className="font-semibold text-primary">
                      ${(120 + item * 10).toFixed(2)}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full bg-red-500"
                          title="Rojo"
                        ></div>
                        <div
                          className="w-3 h-3 rounded-full bg-blue-500"
                          title="Azul"
                        ></div>
                        <div
                          className="w-3 h-3 rounded-full bg-black"
                          title="Negro"
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* New Section: Top Popular Products */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              Productos en Tendencia
            </h3>
            <div className="bg-base-200 rounded-2xl p-4">
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-base-100 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning/10 text-warning font-bold">
                        #{idx}
                      </div>
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-lg bg-base-200">
                          <img 
                            src={`https://placehold.co/100x100?text=Top${idx}`} 
                            alt="Product" 
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Producto Estrella {idx}</h4>
                        <p className="text-xs opacity-60">Categoría Popular</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">$299.99</div>
                      <div className="text-xs opacity-50 flex items-center justify-end gap-1">
                        <FaTrophy className="text-[10px] text-warning" /> Top Ventas
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Additions Sidebar */}
        <div className="flex flex-col gap-8">
          {/* Recent Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categorías Recientes</h3>
            <div className="bg-base-200 rounded-2xl p-4">
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Nueva Colección Verano', date: 'Hace 2 horas', color: 'primary' },
                  { name: 'Accesorios Tech', date: 'Hace 1 día', color: 'secondary' },
                  { name: 'Ofertas Flash', date: 'Hace 2 días', color: 'accent' },
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-base-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${cat.color}/10 text-${cat.color}`}>
                        <FaLayerGroup />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{cat.name}</div>
                        <div className="text-xs opacity-50 flex items-center gap-1">
                          <FaCalendarAlt className="text-[10px]" /> {cat.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-ghost btn-sm btn-block mt-3 text-xs uppercase tracking-wide opacity-50 hover:opacity-100">
                Ver todas las categorías
              </button>
            </div>
          </div>

          {/* Recent Users */}
          <div>
            <h3 className="text-xl font-bold mb-4">Usuarios Recientes</h3>
            <div className="bg-base-200 rounded-2xl p-4">
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((u) => (
                  <div key={u} className="flex items-center gap-3 p-3 bg-base-100 rounded-xl">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=User+${u}&background=random`}
                          alt="user"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">Nuevo Usuario {u}</div>
                      <div className="text-xs opacity-50 flex items-center gap-1">
                        <FaHistory className="text-[10px]" /> Registrado hace {u * 4}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-ghost btn-sm btn-block mt-3 text-xs uppercase tracking-wide opacity-50 hover:opacity-100">
                Ver todos los usuarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
