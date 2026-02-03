import { useState, useEffect } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { UseFormSetValue } from "react-hook-form";

type Props = {
  type?: string;
  setValue: UseFormSetValue<any>;
  errors: (clear?: boolean, val?: string) => void;
  handleTextValue: (val?: string[]) => string[];
  handleColorValue: (val?: string[]) => string[];
}

export default function VariantValues({ type, setValue, errors, handleTextValue, handleColorValue }: Props) {
  const [colorValue, setColorValue] = useState("#2368b1");
  const [inputValue, setInputValue] = useState("");

  const textValues = handleTextValue();
  const colorValues = handleColorValue();

  useEffect(() => {
    if (type === "text") setValue("listValues", textValues);
    if (type === "color") setValue("listValues", colorValues);
  }, [type, setValue, textValues, colorValues]);

  const handleAddText = () => {
    if (!inputValue.trim()) return;
    if (textValues?.includes(inputValue.trim())) {
      errors(false, "Ningún valor debe repetirse");
      return;
    }

    handleTextValue([ ...textValues, inputValue.trim() ]);
    setInputValue("");
    errors(true);
  };

  const handleAddColor = () => {
    if (!colorValue) return;
    if (colorValues.includes(colorValue)) {
      errors(false, "Ningún valor debe repetirse");
      return;
    }

    handleColorValue([...colorValues, colorValue]);
    errors(true);
  };

  const removeTextValue = (index: number) => {
    handleTextValue(textValues.filter((_, i) => i !== index));
    errors(true);
  }

  const removeColorValue = (index: number) => {
    handleColorValue(colorValues.filter((_, i) => i !== index));
    errors(true);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddText();
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {type === "text" ? (
        <div className="flex flex-col gap-2">
          <span className="">Escribe un valor</span>
          <div className="flex gap-4 w-full">
            <input
              type="text"
              placeholder="Escribe un valor y presiona Enter"
              className="input input-bordered w-full bg-gray-700"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                errors(true);
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleAddText}
              className="btn btn-primary"
            >
              Agregar
            </button>
          </div>
        </div>
      ) : type === "color" && (
        <div className="flex flex-col gap-4">
          <span className="">Selecciona un color</span>
          <div className="flex gap-8 items-start">
            <HexColorPicker
              className="w-1/2"
              color={colorValue}
              onChange={(color) => {
                setColorValue(color);
                errors(true);
              }}
            />
            <div className="flex flex-col w-1/2 gap-2">
              <HexColorInput
                color={colorValue}
                onChange={(color) => {
                  setColorValue(color);
                  errors(true);
                }}
                prefixed
                className="input input-bordered w-full bg-gray-700"
              />
              <div className="w-full h-20 rounded-lg border" style={{ backgroundColor: colorValue }}></div>
              <button
                type="button"
                onClick={handleAddColor}
                className="btn btn-primary w-full"
              >
                Agregar Color
              </button>
            </div>
          </div>
        </div>
      )}

      {type === "text" && textValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {textValues?.map((val, index) => (
            <div key={index} className="badge badge-primary badge-soft gap-2 py-4">
              <span>{val}</span>
              <button
                type="button"
                onClick={() => removeTextValue(index)}
                className="btn btn-ghost btn-xs btn-circle"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {type === "color" && colorValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {colorValues.map((val, index) => (
            <div key={index} className="badge badge-primary badge-soft gap-2 py-4">
              <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: val }} title={val} />
              <span>{val}</span>
              <button
                type="button"
                onClick={() => removeColorValue(index)}
                className="btn btn-ghost btn-xs btn-circle"
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
