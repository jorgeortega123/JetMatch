import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "../../context/MainContext";

export const NumberSelect: React.FC = () => {
  const { setTimeInterval } = useFormContext();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | 0>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleNumberClick = (number: number,value:number) => {
    
    setSelectedNumber(number);
    setTimeInterval(value);
    setShowOptions(false);
  };
  const arrtext = [
    { text: "Cada dia", value: 24 },
    { text: "Cada 15 dias", value: 360 },
    { text: "Cada mes (28 dias)", value: 672 },
    { text: "Cada 6 meses", value: 4320 },
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const generateNumberOptions = () => {
    const options: JSX.Element[] = [];
   
    for (let i = 0; i <= arrtext.length; i++) {
      options.push(
        <div
          key={i}
          className="py-1 hover:bg-gray-100 cursor-pointer px-2 rounded-[6px]"
          onClick={() => handleNumberClick(i, arrtext[i].value)}
        >
          {arrtext[i]?.text}
        </div>
      );
    }
    return options;
  };

  return (
    <div ref={containerRef} className="relative z-3">
      <button
        className="w-full py-[5px] px-4 border border-gray-300 bg-white rounded-md shadow-sm flex items-center justify-between focus:outline-none focus:border-blue-500"
        onClick={handleToggleOptions}
      >
      
        <span>{arrtext[selectedNumber]?.text || "Seleccione una opción"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
            showOptions ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
        </svg>
      </button>
      {showOptions && (
        <div className="absolute z-[1] top-full left-0 w-full py-2 px-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm">
          {generateNumberOptions()}
        </div>
      )}
    </div>
  );
};
