type Field = 'NAME' | 'NUMBER' | 'EMAIL';

export interface SearchProducts {
  identifier: string;
  // El backend espera Boolean y Field opcionales: si el filtro no se eligió
  // se manda null para que el parámetro no viaje en la URL.
  isEnabled: 'true' | 'false' | null;
  field: Field | null;
}
