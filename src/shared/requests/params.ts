export type ParamValue = string | number | boolean | null | undefined;

export type ParamsType = Record<string, ParamValue>;

export const PAGINATION_DEFAULT: ParamsType = { page: 0, size: 10 };

/**
 * Axios ya omite los parámetros `null` y `undefined`, pero no los vacíos:
 * `field=''` llega al backend como una cadena vacía y rompe la conversión a
 * enum o a boolean. Aquí los quitamos antes de armar la URL.
 */
export const cleanParams = (params?: ParamsType): ParamsType | undefined => {
  if (!params) return undefined;

  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== ''
    )
  );
};
