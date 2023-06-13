import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/Modal";
import { useUserContext } from "../../context/UserContext";
import useModal from "../../hooks/useModal";
import FormularioEnlazar from "../enlazar/FormularioEnlazar";

export const NavBar: React.FC = () => {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const router = useRouter();
  const modal = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userInfo, logOut } = useUserContext();
  console.log("asd", userInfo);

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
  const handleClickLogOut = () => {
    logOut();

    setShowMenuUser(false);
  };

  return (
    <>
      <nav className="nav-bar fixed z-[3] w-full max-h-[46px] bg-[#fff] flex justify-between items-center">
        <h3 className="font-bold text-[22px] px-2">JetMatch</h3>
        <div  onTouchStart={(e) => e.preventDefault()} className="flex flex-col py-[5px] px-[5px]">
          <div
           onFocus={(e)=>e.preventDefault()}
            onClick={(e) => {e.preventDefault();setShowMenuUser(!showMenuUser)}}
            className=" cursor-pointer relative border rounded-full flex bg-[#e4e6eb]"
          >
            <svg width="36" height="36" viewBox="0 0 30 30">
              <circle cx="15" cy="9" r="4" />
              <ellipse cx="15" cy="20" rx="7" ry="4" />
            </svg>
            {showMenuUser && (
              <div
                ref={containerRef}
                className="user-menu py-2 px-1 rounded-[7px] bg-[#fff] w-[240px] h-auto bg-slate-50 absolute top-[128%] right-0 text-[12px]"
              >
                <p
                  className="hover:bg-gray-200 p-2 rounded-[6px] text-[14px]"
                  onClick={modal.open}
                >
                  {" "}
                  {userInfo.verified != false ? "Cuenta" : "Enlazar cuenta"}
                </p>
                <p className="hover:bg-gray-200 p-2 rounded-[6px] text-[14px]">
                  Archivados
                </p>
                <p
                  className="hover:bg-gray-200 hover:text-red-700 p-2 rounded-[6px] text-[14px]"
                  onClick={() => {
                    handleClickLogOut();
                  }}
                >
                  Cerrar sesión
                </p>
              </div>
            )}
          </div>
        </div>
        <Modal
          modal={modal}
          title={
            userInfo.verified != false
              ? "Datos personales"
              : "Formulario para enlazar cuenta"
          }
        >
          <FormularioEnlazar modal={modal} />
        </Modal>
      </nav>
    </>
  );
};
