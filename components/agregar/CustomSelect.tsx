import { useEffect, useRef, useState } from "react";
import { useFormContext } from "../../context/MainContext";

export const CustomSelect: React.FC = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const { setTypeOfRegister, typeOfRegister } = useFormContext();
  
    const options = [
      'Implemento de un nuevo hábito',
      'Conteo de préstamo bancario',
      'Semestres',
      'Rutina',
    ];
  
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowOptions(false);
        }
      
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    const handleToggleOptions = () => {
      setShowOptions(!showOptions);
    };
  
    const handleOptionClick = (option: string, index: number) => {
      setSelectedOption(option);
      setShowOptions(false);
      setTypeOfRegister(index + 1);
    };
  
    return (
      <div ref={containerRef} className="relative z-[3]">
        <button
          className="w-full py-[5px] px-4 border border-gray-300 bg-white rounded-md shadow-sm flex items-center justify-between focus:outline-none focus:border-blue-500"
          onClick={handleToggleOptions}
        >
          <span>{selectedOption || 'Seleccione una opción'}</span>
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
              showOptions ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
          </svg>
        </button>
        {showOptions && (
          <>
            <div className="absolute z-[1] top-full left-0 w-full py-2 px-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm">
              {options.map((option, index) => (
                <div
                  key={option}
                  className="py-1 hover:bg-gray-100 cursor-pointer px-2 rounded-[6px]"
                  onClick={() => handleOptionClick(option, index)}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };