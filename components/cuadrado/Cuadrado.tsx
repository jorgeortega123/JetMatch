import { ButtonWithLoading } from "../buttons/Paint";

interface SquareProps {
  nombre: string;
  inicial: number;
  final: number;
  id: string;
}

export const Cuadrado: React.FC<SquareProps> = ({
  nombre,
  inicial,
  final,
  id,
}) => {
  const cuadrados: JSX.Element[] = [];

  // const totalCuadrados = Math.min(final, inicial + 8); // Asegurarse de que haya como máximo 8 cuadrados por fila
  const totalCuadrados = final;
  for (let i = 0; i < totalCuadrados; i++) {
    const isPintado = i < inicial; // Verificar si el cuadrado debe estar pintado o no

    // width: "20px",
    // height: "20px",
    const estilo = {
      backgroundColor: isPintado ? "#75CCEB" : "transparent",
      border: isPintado ? "1px solid #0060ff" : "1px solid #ccc",
      display: "inline-block",
    };

    //   cuadrados.push(<div key={i} style={estilo}></div>);


    //#00ff19
    cuadrados.push(
      <div key={i} style={estilo} className="cuadricula-item"></div>
    );
  }

  return (
    <div className="border-[1px] rounded-[6px] shadow-sm  p-2">
      <div className="flex gap-3 pl-2 pr-2 justify-between items-center">
        <h1 className="text-xl">{nombre} </h1>
        <p className="text-sm">{inicial + "/" + final}</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="cuadricula  my-2">{cuadrados}</div>
        <div className="w-full flex justify-end p-2">
          <ButtonWithLoading inicial={inicial} id={id} />
        </div>
      </div>
    </div>
  );
};
