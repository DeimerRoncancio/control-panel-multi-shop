// Espejo de UserDTO. `admin` es obligatorio: el DTO lo recibe como boolean y,
// si no viaja en el cuerpo, Jackson lo deja en false y el usuario pierde el rol.
interface UserUpdate {
  name: string;
  secondName: string;
  lastnames: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  email: string;
  admin: 'true' | 'false';
}

export default UserUpdate;
