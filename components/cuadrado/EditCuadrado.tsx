import React, { useState } from "react";
import Icons from "../../styles/Icons";
import { eliminarObjetoPorId } from "../../database/db";
import { useMessage } from "cllk";

export default function EditCuadrado({
  ultimoEdit,
  typeTime,
  nombre,
  inicial,
  final,
  id,
  color,
}: {
  ultimoEdit: string;
  typeTime: number;
  nombre: string;
  inicial: number;
  final: number;
  id: string;
  color: string;
}) {
  const { message } = useMessage();
  const [isRemoving, setisRemoving] = useState(false);
  const handleDestroy = async () => {
    setisRemoving(true);
    var res = await eliminarObjetoPorId(id);
    if (res.value) { 
      message({
        type: "success",
        description: res.data,
      });
      setisRemoving(false);
    } else { 
      message({
        type: "error",
        description: res.data,
      });
      setisRemoving(false);
    }
  };
  return (
    <>
      <div className="w-full dark:text-white text-[#323b43] text-sm mb-2">
        Te encuentras editando: <strong>{nombre} </strong>({id})
      </div>
      <div className="flex flex-col items borders gap-3 mb-2 max-w-[490px] rounded-[6px] p-3">
        <div className="flex justify-between items-center">
          <div className="text-sm dark:text-white text-[#323b43]">
            Nombre puesto a la actividad:
          </div>
          <input
            type="text"
            className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%] bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={nombre}
            // onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <hr className="my-2 border-gray-300 dark:border-zinc-700" />
        <div className="flex justify-between items-center">
          <div className="text-sm dark:text-white">
            Tipo de actividad a registrar:
          </div>
          <input
            type="text"
            className="text-sm dark:text-[#ccc] border  p-1 w-[70%] bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={typeTime}
            // onChange={(e) => setTypeTime(e.target.value)}
          />
        </div>
        <hr className="my-2 border-gray-300 dark:border-zinc-700" />
        <div className="flex justify-between items-center">
          <div className="text-sm dark:text-white">Color de los cuadrados:</div>
          <input
            type="text"
            className="text-sm dark:text-[#ccc] border  p-1 w-[70%] bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={color}
            // onChange={(e) => setUltimoEdit(e.target.value)}
          />
          <div
            className={`mx-2 w-[28px] h-[24px] rounded-[6px] ${color}`}
          ></div>
        </div>
        <hr className="my-2 border-gray-300 dark:border-zinc-700" />
        <div className="flex justify-between items-center">
          <div className="text-sm dark:text-white">Numero de cuadrados:</div>
          <input
            type="text"
            className="text-sm dark:text-[#ccc] border  p-1 w-[70%] bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={final}
            // onChange={(e) => setUltimoEdit(e.target.value)}
          />
        </div>
        <hr className="my-2 border-gray-300 dark:border-zinc-700" />
        <div className="flex justify-between items-center">
          <div className="text-sm dark:text-white">Ultima edicion:</div>
          <input
            type="text"
            className="text-sm dark:text-[#ccc] border rounded p-1 w-[70%] bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={ultimoEdit.slice(0, 16)}
            // onChange={(e) => setUltimoEdit(e.target.value)}
          />
        </div>
        <hr className="my-2 border-gray-300 dark:border-zinc-700" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="">
          <button
            onClick={() => handleDestroy()}
            className="flex text-sm justify-center items-center px-2 py-1 border border-red-500 rounded-[6px] text-red-500 dark:border-red-600 dark:text-red-300"
          >
            {isRemoving ? (
              <>
                Eliminando segmento...
                <Icons
                  className="w-5 h-5 stroke-[red]"
                  stroke="red"
                  icon="loading"
                ></Icons>
              </>
            ) : (
              <>
                Eliminar segmento{" "}
                <Icons className="w-5 h-5" icon="delete"></Icons>
              </>
            )}
          </button>
        </div>
        <div className="flex justify-end gap-1">
          <button className="px-2 py-1 border border-blue-500 rounded-[6px] text-blue-500 dark:border-blue-600 dark:text-blue-300">
            Cancelar
          </button>
          <button
            className={`px-2 py-1 border rounded-[6px] bg-blue-500 dark:bg-blue-600 dark:border-blue-600  text-white`}
          >
            Aplicar cambios
          </button>
          <div
            className={`h-full background-delay top-0 w-[5px] absolute left-0`}
          ></div>
        </div>
      </div>
    </>
  );
}
