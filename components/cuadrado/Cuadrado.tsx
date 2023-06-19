import { useThemeContext } from "../../context/ThemeContext";
import useModal from "../../hooks/useModal";
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
}

export const Cuadrado: React.FC<SquareProps> = ({
  ultimoEdit,
  typeTime,
  nombre,
  inicial,
  final,
  id,
}) => {
  const modal = useModal();
  const {isDarkMode} = useThemeContext()
  const cuadrados: JSX.Element[] = [];

  // const totalCuadrados = Math.min(final, inicial + 8); // Asegurarse de que haya como máximo 8 cuadrados por fila
  const totalCuadrados = final;
  for (let i = 0; i < totalCuadrados; i++) {
    const isPintado = i < inicial; // Verificar si el cuadrado debe estar pintado o no

    // width: "20px",
    // height: "20px",
    const estilo = {
      backgroundColor: isPintado ? "#75CCEB" : "transparent",
      border: isPintado ? "1px solid black" : ` ${isDarkMode ? "1px solid  #3f3f46" : "1px solid #ccc"}`,
      display: "inline-block",
    };

    //   cuadrados.push(<div key={i} style={estilo}></div>);

    //#00ff19
    cuadrados.push(
      <div key={i} style={estilo} className="cuadricula-item"></div>
    );
  }

  return (
    <>
      <Modal modal={modal} title={`Editar "${nombre}"`}>
        <EditCuadrado nombre={nombre} typeTime={typeTime} ultimoEdit={ultimoEdit} id={id} final={final} inicial={inicial} />
      </Modal>
      <div className="border-[1px] dark:border-none text-black dark:text-zinc-50 rounded-[6px] shadow-sm  p-2 bg-zinc-50 dark:bg-zinc-800 ">
        <div className="flex gap-3 pl-3 pt-2 pr-2 justify-between items-center">
          <h1 onClick={() => modal.open()} className="text-md flex gap-1">
            {nombre}
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13 7.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-3 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.25h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75V12h-.75a.75.75 0 0 1-.75-.75Z"
                />
                <path
                  fill="currentColor"
                  d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5A9.5 9.5 0 0 0 2.5 12Z"
                />
              </svg>
            </span>
          </h1>
          <p className="text-[13px]">
            {" "}
            <span className="ligth-text">{inicial}</span>
            <span>{"/"}</span>
            {final}
          </p>
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
