import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormContext } from "../../context/MainContext";
import { updateSegment } from "../../database/db";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const ButtonWithLoading = ({ typeTime, ultimoEdit, inicial, id }) => {
  const [loading, setLoading] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState("");
  const [tiempoRestanteDetallado, settiempoRestanteDetallado] = useState("");
  const { setmustReload, mustReload } = useFormContext();

  const handleClick = async () => {
    setLoading(true);
    try {
      await updateSegment({ idSegment: id, current: inicial });
      setmustReload(!mustReload);
    } catch (error) {
      console.error("Error updating segment:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    let intervalId;

    const actualizarTiempoRestante = () => {
      if (!ultimoEdit) {
        setTiempoRestante("");
        return;
      }

      const fechaActual = dayjs().utc();
      const fechaUltimoEdit = dayjs(ultimoEdit).utc();
      const tiempoTranscurrido = fechaActual.diff(fechaUltimoEdit, "minutes");

      if (tiempoTranscurrido >= typeTime * 60) {
        setTiempoRestante("");
        return;
      }

      // Resto los 300 minutos para ajustar el bug
      const tiempoRestante = typeTime * 60 - tiempoTranscurrido + 300;
      const minutosDias = 1440;
      const MINUTOS_POR_DIA = 24 * 60; // 24 horas * 60 minutos
      const MINUTOS_POR_MES = 30 * MINUTOS_POR_DIA;

      let tiempoFormateado = "";
      let tiempoDetallado = "";

      if (tiempoRestante > MINUTOS_POR_MES) {
        const meses = Math.floor(tiempoRestante / MINUTOS_POR_MES);
        const dias = Math.floor(
          (tiempoRestante % MINUTOS_POR_MES) / MINUTOS_POR_DIA
        );
        tiempoFormateado = `${meses}m${dias}d`;
        tiempoDetallado = `${meses} meses y ${dias} días`;
      } else if (tiempoRestante > minutosDias) {
        const dias = Math.floor(tiempoRestante / minutosDias);
        tiempoFormateado = `${dias}días`;
        tiempoDetallado = `${dias} días`;
      } else if (tiempoRestante > 60) {
        const horas = Math.floor(tiempoRestante / 60);
        const minutos = tiempoRestante % 60;
        tiempoFormateado = `${horas}h:${minutos}min`;
        tiempoDetallado = `${horas} horas con ${minutos} minutos`;
      }
      settiempoRestanteDetallado(tiempoDetallado);
      setTiempoRestante(tiempoFormateado);
    };

    // Ejecutar la actualización inicial
    actualizarTiempoRestante();

    // Configurar la actualización periódica cada minuto
    intervalId = setInterval(actualizarTiempoRestante, 60000); // 60000 milisegundos = 1 minuto

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [ultimoEdit, typeTime]);

  return (
    <div className="p-[2px] relative container-paint">
      <div className="opacity-0 absolute bottom-[130%] w-full text-[12px] text-center p-2 rounded-[6px] bg-zinc-50 dark:bg-zinc-800 modal-button-paint dark:shadow-zinc-800 ">
        <p className="">
          <span className="text-zinc-900 dark:text-zinc-50">Faltan:</span> <span className="text-zinc-800 dark:text-zinc-50">{tiempoRestanteDetallado}</span> 
          <span className="text-zinc-900 dark:text-zinc-50"> para registrar un nuevo cambio</span>
        </p>{" "}
      </div>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
        }}
        className="rounded-[10px] top-0 left-0 absolute w-full h-full z-[-1]"
      ></div>

      <button
        className="z-[1] bg-zinc-50 dark:bg-zinc-900 items-center font-[500] rounded-[10px] w-[140px] h-[44px] flex  justify-center"
        onClick={handleClick}
        disabled={loading || tiempoRestante !== ""}
      >
        {tiempoRestante !== "" ? (
          <p className="z-[1] text-red-500 text-sm">{tiempoRestante}</p>
        ) : (
          "Pintar"
        )}

        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              margin: 0,
              background: "none",
              display: "block",
              shapeRendering: "auto",
            }}
            width="40px"
            height="40px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="#75CCEB"
              strokeWidth="10"
              fill="none"
            >
              <animate
                attributeName="stroke-dashoffset"
                dur="1.3s"
                repeatCount="indefinite"
                from="0"
                to="502"
              ></animate>
              <animate
                attributeName="stroke-dasharray"
                dur="1.3s"
                repeatCount="indefinite"
                values="150.6 100.4;1 250;150.6 100.4"
              ></animate>
            </circle>
          </svg>
        ) : (
          <svg
            className="z-[1] stroke-black dark:stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="36"
            viewBox="0 0 48 48"
          >
            <g

        

              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            >
              <path d="m15.536 22.898l9.899 9.9m-9.899-9.9L7.05 31.383a7 7 0 1 0 9.9 9.9l8.485-8.486m-9.899 0l-4.243 4.243" />
              <path d="m25.435 32.797l14.907-6.432c2.688-1.16 3.809-4.379 2.086-6.745C38.264 13.903 32.65 8.89 28.51 5.823c-2.29-1.696-5.33-.64-6.46 1.975l-6.514 15.1l9.899 9.9Z" />
            </g>
          </svg>
        )}
      </button>
    </div>
  );
};
