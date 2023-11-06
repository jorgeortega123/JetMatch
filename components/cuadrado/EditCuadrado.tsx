import React from "react";

export default function EditCuadrado({
  ultimoEdit,
  typeTime,
  nombre,
  inicial,
  final,
  id,
}: {
  ultimoEdit: string;
  typeTime: number;
  nombre: string;
  inicial: number;
  final: number;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-3 mb-2 max-w-[490px] border rounded-[6px] p-3">
      <div className="flex justify-between items-center">
        <div className="text-sm dark:text-white text-[#323b43]">
          Nombre puesto a la actividad:
        </div>
        <input
          type="text"
          className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%]"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Asigna el nuevo valor a 'nombre' al cambiar el input
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm dark:text-white">
          Tipo de actividad a registrar:
        </div>
        <input
          type="text"
          className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%]"
          value={typeTime}
          onChange={(e) => setTypeTime(e.target.value)} // Asigna el nuevo valor a 'typeTime' al cambiar el input
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm dark:text-white">Color de los cuadrados:</div>
        <input
          type="text"
          className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%]"
          value={ultimoEdit.slice(0, 16)}
          onChange={(e) => setUltimoEdit(e.target.value)} // Asigna el nuevo valor a 'ultimoEdit' al cambiar el input
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm dark:text-white">Numero de cuadrados:</div>
        <input
          type="text"
          className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%]"
          value={final}
          onChange={(e) => setUltimoEdit(e.target.value)} // Asigna el nuevo valor a 'ultimoEdit' al cambiar el input
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm dark:text-white">Ultima edicion:</div>
        <input
          type="text"
          className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%]"
          value={ultimoEdit.slice(0, 16)}
          onChange={(e) => setUltimoEdit(e.target.value)} // Asigna el nuevo valor a 'ultimoEdit' al cambiar el input
        />
      </div>
    </div>
  );
}
