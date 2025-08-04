type Field = 'NAME' | 'NUMBER' | 'EMAIL';

export interface SearchProducts {
  identifier: string;
  isEnabled: string | null;
  field: Field;
}
