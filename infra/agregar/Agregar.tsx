import React, { useEffect, useRef, useState } from "react";
import ColorSelect from "../../components/agregar/ColorSelect";
import { CustomSelect } from "../../components/agregar/CustomSelect";
import { NumberSelect } from "../../components/agregar/NumberSelect";
import { SquareSelect } from "../../components/agregar/SquareSelect";
import { useFormContext } from "../../context/MainContext";
import Icons from "../../styles/Icons";
interface Props {
  setshowAddSegment: any;
  modal2: any;
}
const Agregar: React.FC<Props> = ({ setshowAddSegment, modal2 }) => {
  const { setNumbersInterval, createSegment } = useFormContext();
  const [colorSelected, setcolorSelected] = useState("transparent");
  useEffect(() => {

  }, []);

  return (
    <div className="flex flex-col gap-2 mb-2 max-w-full rounded-[6px] text-zinc-900 dark:text-zinc-50">
      <h4 className="text-sm relative ">
        Escribe el nombre que pondras a tu actividad{" "}
        <span className="text-[red]">*</span>{" "}
      </h4>
      <TextInput></TextInput>
      <h4 className="text-sm">
        Tipo de actividad que deseas registrar{" "}
        <span className="text-[red]">*</span>{" "}
      </h4>
      <CustomSelect />
      <h4 className="text-sm">
        Intervalo de tiempo entre dicha actividad{" "}
        <span className="text-[red]">*</span>{" "}
      </h4>
      <NumberSelect />
      <SquareSelect />
      <ColorSelect setcolorSelected={setcolorSelected} />
      {/* <Icons className="w-4 fill-green-500" icon="check" />
      <Icons className="w-4 fill-yellow-500" icon="alert" /> */}

      <div className="flex justify-end gap-1 pt-3">
        <button
          onClick={() => {
            setshowAddSegment(false);
            modal2.close();
          }}
          className="px-2 py-1 border border-blue-500 rounded-[6px] text-blue-500 dark:border-blue-600 dark:text-blue-300"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            // modal2.close();
            createSegment();
          }}
          className={`px-2 py-1 border rounded-[6px] bg-blue-500 dark:bg-blue-600 dark:border-blue-600  text-white`}
        >
          Añadir
        </button>
        <div
          className={`h-full background-delay top-0 w-[5px] absolute bg-[${colorSelected}] left-0`}
        ></div>
      </div>
    </div>
  );
};

const TextInput: React.FC = () => {
  const { setNameSegment, nameSegment } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const [isExceeded, setIsExceeded] = useState(false);
  useEffect(() => {
    if (nameSegment === "null") {
      return;
    } else {
      setInputValue(nameSegment);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setNameSegment(value);
      setInputValue(value);
      setIsExceeded(false);
    } else {
      setNameSegment("");
      setIsExceeded(true);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className={` relative ${isExceeded ? "text-red-600" : ""}`}>
        <div className="hidden absolute w-[10px] my-auto rounded-full h-[10px] bg-blue-300 left-[101%]"></div>
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          id="text-input"
          autoCapitalize="sentences"
          className={`bg-zinc-50 dark:bg-zinc-900 w-full px-4 py-[5px]  border rounded-md shadow-sm focus:outline-none ${
            isExceeded ? "border-red-600" : "border-gray-300 dark:border-zinc-700"
          }`}
          placeholder="Ingresa un nombre agradable"
        />
        {isExceeded && (
          <p className="text-red-600 text-sm mt-1">
            El nombre excede los límites de caracteres.
          </p>
        )}
      </div>
    </div>
  );
};

export default Agregar;
