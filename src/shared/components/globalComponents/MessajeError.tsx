import { FieldErrors, FieldValues } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';

type ErrorMessageProps<T extends FieldValues> = {
  fieldName: keyof T;
  errors: FieldErrors<T>;
};

export default function ErrorMessage<T extends FieldValues>({
  fieldName,
  errors,
}: ErrorMessageProps<T>) {
  if (!fieldName) {
    return null;
  }
  const error = errors[fieldName];
  if (error && typeof error.message === 'string') {
    return (
      <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-error">
        <FiAlertCircle size={13} />
        {error.message}
      </span>
    );
  }
  return null;
}
