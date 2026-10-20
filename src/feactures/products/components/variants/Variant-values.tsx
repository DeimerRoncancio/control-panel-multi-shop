import { useState, useEffect } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { UseFormSetValue } from 'react-hook-form';
import {
  inputClass,
  labelTextClass,
  primaryButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  type?: string;
  setValue: UseFormSetValue<any>;
  errors: (clear?: boolean, val?: string) => void;
  handleTextValue: (val?: string[]) => string[];
  handleColorValue: (val?: string[]) => string[];
};

export default function VariantValues({
  type,
  setValue,
  errors,
  handleTextValue,
  handleColorValue,
}: Props) {
  const [colorValue, setColorValue] = useState('#2368b1');
  const [inputValue, setInputValue] = useState('');

  const textValues = handleTextValue();
  const colorValues = handleColorValue();

  useEffect(() => {
    if (type === 'text') setValue('listValues', textValues);
    if (type === 'color') setValue('listValues', colorValues);
  }, [type, setValue, textValues, colorValues]);

  const handleAddText = () => {
    if (!inputValue.trim()) return;
    if (textValues?.includes(inputValue.trim())) {
      errors(false, 'Ningún valor debe repetirse');
      return;
    }

    handleTextValue([...textValues, inputValue.trim()]);
    setInputValue('');
    errors(true);
  };

  const handleAddColor = () => {
    if (!colorValue) return;
    if (colorValues.includes(colorValue)) {
      errors(false, 'Ningún valor debe repetirse');
      return;
    }

    handleColorValue([...colorValues, colorValue]);
    errors(true);
  };

  const removeTextValue = (index: number) => {
    handleTextValue(textValues.filter((_, i) => i !== index));
    errors(true);
  };

  const removeColorValue = (index: number) => {
    handleColorValue(colorValues.filter((_, i) => i !== index));
    errors(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddText();
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      {type === 'text' ? (
        <div className="flex flex-col">
          <span className={labelTextClass}>Escribe un valor</span>
          <div className="flex w-full gap-2.5">
            <input
              type="text"
              placeholder="Escribe un valor y presiona Enter"
              className={inputClass}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                errors(true);
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleAddText}
              className={`${primaryButtonClass} shrink-0`}
            >
              Agregar
            </button>
          </div>
        </div>
      ) : (
        type === 'color' && (
          <div className="flex flex-col gap-4">
            <span className={labelTextClass}>Selecciona un color</span>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <HexColorPicker
                className="!w-full sm:!w-1/2"
                color={colorValue}
                onChange={(color) => {
                  setColorValue(color);
                  errors(true);
                }}
              />
              <div className="flex w-full flex-col gap-2 sm:w-1/2">
                <HexColorInput
                  color={colorValue}
                  onChange={(color) => {
                    setColorValue(color);
                    errors(true);
                  }}
                  prefixed
                  className={inputClass}
                />
                <div
                  className="h-20 w-full rounded-xl border border-line"
                  style={{ backgroundColor: colorValue }}
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className={`${primaryButtonClass} w-full`}
                >
                  Agregar Color
                </button>
              </div>
            </div>
          </div>
        )
      )}

      {type === 'text' && textValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {textValues?.map((val, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-base-100 py-1 pl-3 pr-1 text-xs font-bold text-ink"
            >
              <span>{val}</span>
              <button
                type="button"
                onClick={() => removeTextValue(index)}
                aria-label="Quitar valor"
                className="grid h-6 w-6 place-items-center rounded-full text-ink-muted transition-colors hover:bg-error/10 hover:text-error"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {type === 'color' && colorValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {colorValues.map((val, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-base-100 py-1 pl-3 pr-1 text-xs font-bold text-ink"
            >
              <span
                className="h-4 w-4 rounded-full ring-1 ring-line"
                style={{ backgroundColor: val }}
                title={val}
              />
              <span>{val}</span>
              <button
                type="button"
                onClick={() => removeColorValue(index)}
                aria-label="Quitar valor"
                className="grid h-6 w-6 place-items-center rounded-full text-ink-muted transition-colors hover:bg-error/10 hover:text-error"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
