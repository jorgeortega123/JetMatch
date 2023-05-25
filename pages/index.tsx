import React, { useEffect, useRef, useState } from "react";
import Agregar from "../infra/agregar/Agregar";
import CustomSelect from "../infra/agregar/Agregar";
import Login from "../infra/login/Login";
import { useFormContext } from "../context/MainContext";
import {
  addNewSegment,
  fetchObjectById,
  fetchSegment,
  updateSegment,
} from "../database/db";
import useModal from "../hooks/useModal";
import Modal from "../components/modal/Modal";
import FormularioEnlazar from "../infra/enlazar/FormularioEnlazar";
import { Cuadrado } from "../components/cuadrado/Cuadrado";

interface PropsSegment {
  createdAt: string;
  currentNumber: number;
  typeOfRegister: number;
  objectId: string;
  timeInterval: number;
  numbersInterval: number;
  nameSegment: string;
  updatedAt: string;
  userId: string;
}

export default function MainScreen() {
  const [infoSegments, setinfoSegments] = useState<PropsSegment[] | undefined>([
    {
      createdAt: "2023-05-23T03:12:35.038Z",
      currentNumber: 0,
      nameSegment: "Ejemplo de nombre",
      numbersInterval: 12,
      objectId: "DTGa0f32l9",
      timeInterval: 0,
      typeOfRegister: 0,
      updatedAt: "2023-05-23T03:12:35.038Z",
      userId: "b77e18",
    },
  ]);

  const { isLoginComplete, mustReload, createSegment } = useFormContext();
  const [isLogin, setisLogin] = useState(true);
  const [showAddSegment, setshowAddSegment] = useState(false);
  useEffect(() => {
    handleFecth();
    // setisLogin(!isLogin)
  }, [mustReload]);
  const handleFecth = async () => {
    var arr = [];
    var s = await fetchSegment();
    for (let i = 0; i < s.length; i++) {
      let a = await fetchObjectById(s[i]);
      arr.push(a);
    }
    console.log("asdas", arr);
    setinfoSegments(arr);
  };
  // useEffect(() => {}, []);
  if (isLogin) {
    const modal = useModal();
    const modal2 = useModal();
    return (
      <div className="w-full">
        <NavBar />
        <div className="pt-[46px] flex flex-col items-center">
          <div className="max-w-[700px] w-full px-2 sm:w-[600px] gap-3 flex flex-col ">
            <div className="m-1">
              <p className="text-black font-[600] indent-1 text-xl">
                Hola, Jorge
              </p>{" "}
              <p className="text-[#75CCEB] text-sm ">
                Aqui tienes tu informacion
              </p>{" "}
            </div>
            <div className="flex flex-col mb-1 mx-2 gap-3  ">
              {infoSegments?.map((data) => (
                <Cuadrado
                  id={data.objectId}
                  nombre={data.nameSegment}
                  inicial={data.currentNumber}
                  final={data.numbersInterval}
                />
              ))}
            </div>
            <button
              style={{
                transition: "all .4s",
              }}
              disabled={showAddSegment}
              className="btn-segment-add p-2 w-max rounded-[7px] text-white font-bold text-sm bg-[#91216d] hover:bg-[#d22b9c]"
              onClick={() => setshowAddSegment(!showAddSegment)}
            >
              AGREGAR SEGMENTO
            </button>
            {showAddSegment && (
              <div className="p-2 m-1 border rounded-[6px]">
                <Agregar setshowAddSegment={setshowAddSegment}></Agregar>
              </div>
            )}
          </div>
        </div>
        <Modal modal={modal} title="Agregar nuevo segmento"></Modal>
        {/* <button onClick={modal.open}>AVTIVE MODAL</button> */}
      </div>
    );
  } else {
    return <Login setisLogin={setisLogin} />;
  }
}

const NavBar: React.FC = () => {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const modal = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowMenuUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  return (
    <>
      <nav className="nav-bar fixed w-full max-h-[46px] bg-[#fff] flex justify-between items-center">
        <h1 className="font-bold text-[22px] px-2">JetMatch</h1>
        <div className="flex flex-col py-[5px] px-[5px]">
          <div
            onClick={() => setShowMenuUser(!showMenuUser)}
            className="cursor-pointer relative border rounded-full flex bg-[#e4e6eb]"
          >
            <svg width="36" height="36" viewBox="0 0 30 30">
              <circle cx="15" cy="9" r="4" />
              <ellipse cx="15" cy="20" rx="7" ry="4" />
            </svg>
            {showMenuUser && (
              <div
                ref={containerRef}
                className="user-menu py-2 px-1 rounded-[7px] bg-[#fff] w-[180px] h-[100px] bg-slate-50 absolute top-[128%] right-0 text-[12px]"
              >
                <p
                  className="hover:bg-gray-200 px-2 rounded-[6px]"
                  onClick={modal.open}
                >
                  Enlazar cuenta
                </p>
                <p className="hover:bg-gray-200 px-2 rounded-[6px]">
                  Archivados
                </p>
                <p
                  className="hover:bg-gray-200 hover:text-red-700 px-2 rounded-[6px]"
                  onClick={() => {
                    setShowMenuUser(false);
                    // Aquí puedes agregar la lógica para cerrar la sesión
                  }}
                >
                  Cerrar sesión
                </p>
              </div>
            )}
          </div>
        </div>
        <Modal modal={modal} title={"Formulario para enlazar a cuenta"}>
          <FormularioEnlazar />
        </Modal>
      </nav>
    </>
  );
};
