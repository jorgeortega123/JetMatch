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
    <table className="flex flex-col gap-2 mb-2 max-w-[490px] border rounded-[6px] p-3">
      <tbody>
        <tr>
          <td className="text-sm text-[#323b43]">Nombre puesto a la actividad:</td>
          <td className="text-sm">{nombre}</td>
        </tr>
        <tr>
          <td className="text-sm">Tipo de actividad a registrar:</td>
          <td className="text-sm">{typeTime}</td>
        </tr>
        <tr>
          <td className="text-sm">Ultima edicion:</td>
          <td className="text-sm">{ultimoEdit.slice(0,16)}</td>
        </tr>
      </tbody>
    </table>
  );
}
