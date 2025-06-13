import { useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';

function FormRegister() {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  return (
    <form>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer nombre
            </span>
            <input
              type="text"
              id="first_name"
              className="w-full p-2.5 input input-primary"
              placeholder="John"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Segundo nombre
            </span>
            <input
              type="text"
              id="last_name"
              className="w-full p-2.5 input input-primary"
              placeholder="Doe"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastname" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Apellido
            </span>
            <input
              type="text"
              id="company"
              className="w-full p-2.5 input input-primary"
              placeholder="Flowbite"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="phone" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Numero de teléfono
            </span>
            <input
              type="tel"
              id="phone"
              className="w-full p-2.5 input input-primary"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </label>
        </div>
      </div>
      <div className="mb-6">
        <div>
          <label htmlFor="gender" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Genero
            </span>
            <select
              defaultValue=""
              className="select select-primary w-full p-2.5"
            >
              <option disabled>Selecciona Genero</option>
              <option value="male">Hombre</option>
              <option value="fame">Mujer</option>
            </select>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </span>
          <input
            type="email"
            id="email"
            className="w-full p-2.5 input input-primary"
            placeholder="john.doe@company.com"
            required
          />
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </span>
          <span className="w-full p-2.5 input input-primary flex">
            <input
              type={viewPassword ? 'text' : 'password'}
              id="password"
              className="w-[90%] p-2.5"
              placeholder="•••••••••"
              required
            />
            <button
              className="w-[10%] z-10 flex items-center justify-end"
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? (
                <GrFormViewHide size={30} />
              ) : (
                <GrFormView size={30} />
              )}
            </button>
          </span>
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="confirm_password" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirmar contraseña
          </span>
          <span className="w-full p-2.5 input input-primary flex">
            <input
              type={viewPassword ? 'text' : 'password'}
              id="password"
              className="w-[90%] p-2.5"
              placeholder="•••••••••"
              required
            />
            <button
              className="w-[10%] z-10 flex items-center justify-end"
              type="button"
              onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            >
              {viewConfirmPassword ? (
                <GrFormViewHide size={30} />
              ) : (
                <GrFormView size={30} />
              )}
            </button>
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="text-white focus:ring-4 text-sm w-full sm:w-auto px-5 py-2.5 btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
}

export default FormRegister;
