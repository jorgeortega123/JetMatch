import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Agregar from "../infra/agregar/Agregar";
import CustomSelect from "../infra/agregar/Agregar";
import Login from "./login";
import { saludoSegunHora } from "../hooks/functions";
import { useFormContext } from "../context/MainContext";
import {
  addNewSegment,
  fetchObjectById,
  fetchSegment,
  getUserDataById,
  updateSegment,
} from "../database/db";
import useModal from "../hooks/useModal";
import Modal from "../components/modal/Modal";
import FormularioEnlazar from "../infra/enlazar/FormularioEnlazar";
import { Cuadrado } from "../components/cuadrado/Cuadrado";
import dayjs from "dayjs";
import { useUserContext } from "../context/UserContext";
import { NavBar } from "../infra/navbar/TopNav";
import { useThemeContext } from "../context/ThemeContext";
import LoadingScreen from "../infra/LoadingScreen";
import Header from "../components/Header";
import OrdenarPorDropdown from "../components/OrdenarPor";

interface PropsSegment {
  createdAt: string;
  currentNumber: number;
  typeOfRegister: number;
  objectId: string;
  timeInterval: number;
  numbersInterval: number;
  nameSegment: string;
  colorSegment: string
  updatedAt: string;
  userId: string;
  updateTimerAt: string;
}

interface userInfo {
  name: string;
  email: string;
  verified: boolean;
}

export default function MainScreen() {
  const router = useRouter();
  const [showAddSegment, setshowAddSegment] = useState(false);
  const [infoSegments, setinfoSegments] = useState<PropsSegment[] | undefined>([
    {
      createdAt: "2023-05-23T03:12:35.038Z",
      currentNumber: 0,
      nameSegment: "Ejemplo de nombre",
      numbersInterval: 12,
      objectId: "DTGa0f32l9",
      timeInterval: 0,
      typeOfRegister: 0,
      colorSegment: "#fff",
      updatedAt: "2023-05-23T03:12:35.038Z",
      userId: "b77e18",
      updateTimerAt: "",
    },
  ]);

  const { isLoginComplete, mustReload, createSegment } = useFormContext();
  const { isDarkMode } = useThemeContext();
  const [ordenarPorOpcionElegida, setordenarPorOpcionElegida] = useState("")
  const { isLogin, setisLogin, successLogin, userInfo, isLoaded } =
    useUserContext();
    
  useEffect(() => {
    if (!isLoaded) {
      return;
    } else {
      if (isLogin === false) {
        router.push("/login");
      } else {
        handleFecth();
      }
    }
  }, [isLoaded, userInfo, mustReload]);

  const handleFecth = async () => {
    var arr = [];
    var segmentsFromDb = await fetchSegment();
    if (!segmentsFromDb) {
      setisLogin(false);
      return;
    }
    for (let i = 0; i < segmentsFromDb.length; i++) {
      let a = await fetchObjectById(segmentsFromDb[i]);
      arr.push(a);
    }
    setinfoSegments(arr);
  };
  // useEffect(() => {
  //   setisLogin(!isLogin);
  // }, [successLogin]);

  const modal2 = useModal();

  // useEffect(() => {}, []);
  if (isLoaded === false || isLogin === false) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full anim-">
      <NavBar />
      <div className="pt-[46px] flex flex-col items-center">
        <div className="max-w-[700px] w-full px-2 sm:w-[600px] gap-3 flex flex-col mb-12 ">
          <Header></Header>
          <OrdenarPorDropdown onOrdenarPorChange={setordenarPorOpcionElegida} />
          <div className="flex flex-col mb-1  gap-3   ">
            {infoSegments?.map((data) => (
              <Cuadrado
                ultimoEdit={data.updateTimerAt}
                typeTime={data.timeInterval}
                id={data.objectId}
                nombre={data.nameSegment}
                inicial={data.currentNumber}
                final={data.numbersInterval}
                color={data.colorSegment}
              />
            ))}
          </div>
          <div className="border-[1px] dark:border-none text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-800 rounded-[6px] shadow-sm  p-2 mx-2 relative overflow-hidden">
            <div
              style={{
                borderImage:
                  "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255))",
                borderImageSlice: 1,
              }}
              className="absolute top-0 w-full h-[2px] left-0 border-[1px]"
            ></div>
            <div className="flex justify-center items-center ">
              <div className="w-8/12 text-center">
                <p className="text-[13px] px-2 sm:px-5 ">
                  Un botón para un mejor mañana: Registra, rastrea y alcanza tus
                  metas día a día.
                </p>
              </div>
              <div
                style={{
                  transition: "all .4s",
                }}
                className="btn-segment-add h-[130px] cursor-pointer w-5/12 flex flex-col gap-2 justify-center items-center p-2 border-[2px] border-dashed border-[#ccc] hover:border-[black] p-2 rounded-[7px]  font-bold text-sm text-black"
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
            </div>
          </div>
          <Modal modal={modal2} title="Agregar nuevo segmento">
            <div className="p-2 m-1 flex items-center justify-center">
              <Agregar
                modal2={modal2}
                setshowAddSegment={setshowAddSegment}
              ></Agregar>
            </div>
          </Modal>
        </div>
      </div>

      {/* <button onClick={modal.open}>AVTIVE MODAL</button> */}
    </div>
  );
}
