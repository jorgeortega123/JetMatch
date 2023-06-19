import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/Modal";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import useModal from "../../hooks/useModal";
import Icons from "../../styles/Icons";
import FormularioEnlazar from "../enlazar/FormularioEnlazar";

export const NavBar: React.FC = () => {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const router = useRouter();
  const modal = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userInfo, logOut } = useUserContext();
  const {toggleTheme} = useThemeContext()
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
      <nav className="nav-bar fixed z-[3] w-full max-h-[46px] bg-[#fff] dark:bg-zinc-900 flex justify-between items-center">
        <h3 className="font-bold text-[22px] px-2 text-black dark:text-[#f0f8ff] transition-text">JetMatch</h3>
      
        <div className="flex gap-2 items-center py-[5px] px-[5px] ">
          <div className="flex relative " onClick={()=>toggleTheme()}>
            <Icons icon="dark" className="fill-black delay-width dark:fill-[#f0f8ff]  h-6 w-6 dark:h-0 dark:w-0"></Icons>
            <Icons icon="light" className="fill-black delay-width dark:fill-[#f0f8ff] h-0 w-0 dark:h-6 dark:w-6"></Icons>
          </div>
          <div
            onClick={(e) => {e.preventDefault();setShowMenuUser(!showMenuUser)}}
            className=" cursor-pointer relative  rounded-full flex bg-[#e4e6eb] dark:bg-slate-700"
          >
            <svg className="fill-zinc-900 dark:fill-zinc-50" width="36" height="36" viewBox="0 0 30 30">
              <circle cx="15" cy="9" r="4" />
              <ellipse cx="15" cy="20" rx="7" ry="4" />
            </svg>
            {showMenuUser && (
              <div
                ref={containerRef}
                className="user-menu py-2 px-1 rounded-[7px] bg-[#fff] dark:bg-[#12151E] text-black dark:text-[#f0f8ff] w-[240px] h-auto  absolute top-[128%] right-0 text-[12px]"
              >
                <p
                  className="hover:bg-gray-200 dark:hover:bg-slate-600  p-2 rounded-[6px] text-[14px]"
                  onClick={modal.open}
                >
                  {" "}
                  {userInfo.verified != false ? "Cuenta" : "Enlazar cuenta"}
                </p>
                <p className="hover:bg-gray-200  dark:hover:bg-slate-600 p-2 rounded-[6px] text-[14px]">
                  Archivados
                </p>
                <p
                  className="hover:bg-gray-200 dark:hover:bg-slate-600 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-[6px] text-[14px]"
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
