import React, { useEffect, useRef, useState } from "react";
import { CustomSelect } from "../../components/agregar/CustomSelect";
import { NumberSelect } from "../../components/agregar/NumberSelect";
import { useFormContext } from "../../context/MainContext";
interface Props {
  setshowAddSegment: any;
}
const Agregar: React.FC<Props> = ({ setshowAddSegment }) => {
  const { setNumbersInterval, createSegment } = useFormContext();
  return (
    <div className="flex flex-col gap-2 mb-2">
      <p className="text-sm">Que deseas registrar ? </p>
      <CustomSelect />
      <p className="text-sm">El rango o intervalo de tiempo </p>
      <NumberSelect />

      <p>Como lo vas a llamar ? </p>
      <TextInput></TextInput>
      <div className="flex items-center gap-3">
        <p>Cuantos cuadros son necesarios ?</p>
        <input
          onChange={(e) => setNumbersInterval(Number(e.target.value))}
          className="w-[70px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          type="number"
        />
      </div>
      <div className="flex justify-end gap-1 px-2">
        <button
          onClick={() => setshowAddSegment(false)}
          className="px-2 py-1 border border-blue-500 rounded-[6px] text-blue-500"
        >
          Cancelar
        </button>
        <button onClick={()=>createSegment()} className="px-2 py-1 border rounded-[6px] bg-blue-500 text-white">
          Añadir
        </button>
      </div>
    </div>
  );
};







const TextInput: React.FC = () => {
  const { setNameSegment } = useFormContext();
  return (
    <div className="flex flex-col space-y-2">
      <input
        onChange={(e) => setNameSegment(e.target.value)}
        type="text"
        id="text-input"
        autoCapitalize="sentences"
        className=" w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        placeholder="Ingresa un nombre agradable"
      />
    </div>
  );
};

export default Agregar;
