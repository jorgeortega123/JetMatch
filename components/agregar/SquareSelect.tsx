import { useState } from "react";
import { useFormContext } from "../../context/MainContext";

export const SquareSelect: React.FC = () => {
  const { setNumbersInterval } = useFormContext();
  const [inputValue, setInputValue] = useState<number | "">("");
  const [isNegative, setIsNegative] = useState(false);
  const [isExceeded, setIsExceeded] = useState(false);
  const [isInfinite, setisInfinite] = useState(false);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setIsNegative(true);
      setIsExceeded(false);
    } else if (value > 1095) {
      setIsNegative(false);
      setIsExceeded(true);
    } else {
      setNumbersInterval(isInfinite? 1094: value);
      setInputValue(value);
      setIsNegative(false);
      setIsExceeded(false);
    }
  };
  const infiniteActive = () => {
    setisInfinite(!isInfinite);
  };
  return (
    <div className="flex flex-col space-y-2">
      <div className="">
        <div className="relative flex items-center justify-between gap-2">
          <h4 className="w-12/12 text-sm">Cuantos cuadros son necesarios ?</h4>
          <input
            onChange={handleNumberChange}
            value={inputValue}
            type="number"
            id="number-input"
            className={`w-[46px] px-1 py-2 border rounded-md shadow-sm focus:outline-none ${
              isNegative || isExceeded ? "border-red-600" : "border-gray-300"
            }`}
          />
          <div
            onClick={() => infiniteActive()}
            className={`magic-button cursor-pointer ${isInfinite ? "border-[1px] text-white border-blue-500 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500": ""} flex items-center justify-center border rounded-[6px] px-3 gap-1 h-[42px]`}
          >
            <span className="text-[32px]">&#8734;</span> Indefinido
          </div>
        </div>
        <div className="flex">
          {isNegative && (
            <p className="text-red-600 text-sm mt-1">
              El número no puede ser negativo.
            </p>
          )}
          {isExceeded && (
            <p className="text-red-600 text-sm mt-1">
              El número no puede exceder el valor de 1095.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
