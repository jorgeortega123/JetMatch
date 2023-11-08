import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import useModal from "../../hooks/useModal";
import Icons from "../../styles/Icons";
import { ButtonWithLoading } from "../buttons/Paint";
import Modal from "../modal/Modal";
import EditCuadrado from "./EditCuadrado";

interface SquareProps {
  ultimoEdit: string;
  typeTime: number;
  nombre: string;
  inicial: number;
  final: number;
  id: string;
  color: string;
}

export const Cuadrado: React.FC<SquareProps> = ({
  ultimoEdit,
  typeTime,
  nombre,
  inicial,
  final,
  id,
  color,
}) => {
  const modal = useModal();
  const { isDarkMode } = useThemeContext();
  const cuadrados: JSX.Element[] = [];
  var infinite = false;
  // const totalCuadrados = Math.min(final, inicial + 8); // Asegurarse de que haya como máximo 8 cuadrados por fila
  if (final === 1094) {
    final = inicial;
    infinite = true;
  }
  const totalCuadrados = final;
  for (let i = 0; i < totalCuadrados; i++) {
    const isPintado = i < inicial; // Verificar si el cuadrado debe estar pintado o no

    // width: "20px",
    // height: "20px",
    const estilo = {
      backgroundColor: isPintado ? "" : "transparent",
      border: isPintado
        ? "1px solid black"
        : ` ${isDarkMode ? "1px solid  #3f3f46" : "1px solid #ccc"}`,
      display: "inline-block",
    };

    //   cuadrados.push(<div key={i} style={estilo}></div>);

    //#00ff19
    //#75cceb
    cuadrados.push(
      <div
        key={i}
        style={estilo}
        className={`cuadricula-item ${isPintado ? color : ""} `}
      ></div>
    );
  }

  return (
    <>
      <Modal modal={modal} title={`Editar segmento`}>
        <EditCuadrado
          nombre={nombre}
          typeTime={typeTime}
          ultimoEdit={ultimoEdit}
          id={id}
          final={final}
          inicial={inicial}
          color={color}
        />
      </Modal>
      <div className="border-[1px] dark:border-none text-black dark:text-zinc-50 rounded-[6px] shadow-sm  p-2 bg-zinc-50 dark:bg-zinc-800 ">
        <div
          onClick={() => modal.open()}
          className="flex gap-3 pl-3 pt-2 pr-2 justify-between items-center"
        >
          <h1 className="text-md flex gap-1">{nombre}</h1>
          <div className="flex items-center gap-2 justify-center">
            <p className="text-[13px]">
              <span className="ligth-text">{inicial}</span>
              <span>{"/"}</span>
              {infinite ? <>&#8734;</> : <> {final}</>}
            </p>
            <Icons icon="info" className="w-5"></Icons>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="cuadricula  my-2">{cuadrados}</div>
          <div className="w-full z-[2] flex justify-end p-2">
            <ButtonWithLoading
              typeTime={typeTime}
              ultimoEdit={ultimoEdit}
              inicial={inicial}
              id={id}
            />
          </div>
        </div>
      </div>
    </>
  );
};
