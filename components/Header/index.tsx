import React, { useState } from "react";
import { saludoSegunHora } from "../../hooks/functions";
import { useUserContext } from "../../context/UserContext";
import { useThemeContext } from "../../context/ThemeContext";
import { Modal, useModal } from "cllk";
import dayjs from "dayjs";
import Agregar from "../../infra/agregar/Agregar";

export default function Header() {
  const { isLogin, setisLogin, successLogin, userInfo, isLoaded } =
    useUserContext();
  const { isDarkMode } = useThemeContext();
  const [showAddSegment, setshowAddSegment] = useState(false);

  const modal2 = useModal();
  const fechaActual = dayjs();
  const horaMinutos = fechaActual.format("HH:mm");
  return (
    <div className= "relative bg-white text-black dark:text-zinc-50 dark:bg-zinc-800 w-full h-[180px] flex justify-between rounded-[6px]  p-3 mt-3 ">
      <div>
        <p className=" font-[600] text-[18px]">
          {saludoSegunHora()} {userInfo?.name?.split(" ")[0]}
        </p>

        <div className=" text-sm h-full  max-w-[260px] select-none  ">
          {userInfo.verified != false ? (
            <>
              <span>We will make Life great again </span>
              <div
                style={{
                  transition: "all .4s",
                }}
                className="absolute bottom-3 w-[210px] cursor-pointer flex s gap-2 justify-center items-center p-2 border-[2px] border-dashed border-[#ccc] hover:border-[black] rounded-[7px]  font-bold text-sm text-black"
                onClick={() => modal2.open()}
              >
                <svg
                  className={` stroke-black dark:stroke-white `}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke-width="1.5" />
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <h1 className="text-center text-black dark:text-white w-full select-none">
                  {" "}
                  AGREGAR SEGMENTO
                </h1>
              </div>
            </>
          ) : (
            <span className="">
              Gracias por entrar a la App, recuerda que para guardar tus datos
              puedes
              <span className="cursor-pointer relative span-slice underline font-herit px-[4px]">
                enlazar tu cuenta
                <span className="opacity-0 z-[-1] w-full absolute border bg-zinc-50 p-2 rounded-[8px] left-[100%]">
                  En la seccion de usuario la encontraras
                </span>
              </span>
              para acceder desde cualquier parte del mundo
            </span>
          )}
        </div>
      </div>
      <div className="sticky">
        <img
          draggable={false}
          className={`h-full img-to-dark ${isDarkMode ? "filter-img" : ""}`}
          src={
            "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1685745720/22._success-3--success-interface-trophy-winner-champion-achieve-accomplish-mountain-peak-award-goal-man_k1iizc.png"
          }
          alt=""
        />
      </div>
      <p className="absolute top-2 right-2 text-sm">{horaMinutos}</p>
      <Modal modal={modal2} title="Agregar nuevo segmento">
        <div className="p-2 m-1 flex items-center justify-center">
          <Agregar
            modal2={modal2}
            setshowAddSegment={setshowAddSegment}
          ></Agregar>
        </div>
      </Modal>
    </div>
  );
}
