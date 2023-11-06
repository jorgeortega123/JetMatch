import React, { useEffect, useRef, useState } from "react";

const OrdenarPorDropdown: React.FC<{
  onOrdenarPorChange: (opcion: string) => void;
}> = ({ onOrdenarPorChange }) => {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOpcionSeleccionada = (opcion: string) => {
    setOpcionSeleccionada(opcion);
    onOrdenarPorChange(opcion);
    setMostrarDropdown(false); // Ocultar el menú desplegable después de seleccionar una opción
  };

  return (
    <div className="relative inline-block text-black dark:text-white text-[12px]">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setMostrarDropdown(!mostrarDropdown)}
      >
        <p className="mr-1">Ordenar por:</p>
        <div className="border flex px-4 rounded-md border-[#ccc]">
          <p> {opcionSeleccionada}</p>
          <svg
            className={`w-3 h-3 transition-transform transform ${
              mostrarDropdown ? "rotate-180" : ""
            }`}
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
      </div>
      {mostrarDropdown && (
        <div className="absolute z-10 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg">
          <div
            className={`cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
              opcionSeleccionada === "fecha"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            }`}
            onClick={() => handleOpcionSeleccionada("fecha")}
          >
            Fecha
          </div>
          <div
            className={`cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
              opcionSeleccionada === "cantidad"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            }`}
            onClick={() => handleOpcionSeleccionada("cantidad")}
          >
            Cantidad de Cuadros
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenarPorDropdown;
