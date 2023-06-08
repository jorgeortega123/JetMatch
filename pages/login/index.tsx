import { useMessage } from "cllk";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { createUser, loginByEmail } from "../../database/db";

interface LoginProps {
  setisLogin?: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({  }) => {
  const router = useRouter();
  const { message } = useMessage();
  const {setisLogin, setsuccessLogin} = useUserContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setisFetching] = useState(false);
  const [isSuccessFetch, setisSuccessFetch] = useState(false);
  const [transitionScreen, settransitionScreen] = useState(false);
  const [messageForm, setmessageForm] = useState("Validando credenciales...");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para enviar los datos de inicio de sesión
  };
  const loginLogic = async () => {
    // var s = await createUser();
    setisFetching(true);
    var log = () => {
      var local = localStorage.getItem("token")
      if (!local) { 
        message({
          type: "error",
          description:
            "No se pudo crear un sesion",
        });
        setisFetching(false);
        return
      }
      message({
        type: "success",
        description:
          "Bienvenido!",
      });
      setisLogin(true)
      router.push("/");
      // setTimeout(() => {
      //   setisSuccessFetch(true);
      //   setTimeout(() => {
      //     settransitionScreen(true);
      //   }, 300);
      // }, 800);
      // setTimeout(() => {
      //   setisLogin(true);
      //   setsuccessLogin(true)
      // }, 2200);
    };

    var logFail = () => {
      setTimeout(() => {
        setisSuccessFetch(false);
      }, 1200);
    };

    if (email === "") {
      var res = await createUser();
      if (res === true) {
        log();
      } else {
        message({
          type: "error",
          description:
            "Error creando el usuario",
        });
        setisFetching(false);
      }
    } else {
      var res_0:boolean = await loginByEmail(email, password);
      if (res_0 === false) {
        log();
      } else {
        message({
          type: "error",
          description:
            "Usuario y/o contrasena no valida",
        });
        setisFetching(false);
      }
    }

    //
    // console.log(s);
  };
  return (
    <div className=" relative flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <div className={``}>
        <svg
          className={`${
            transitionScreen ? "transition-wave" : ""
          } absolute z-[1] left-[-260px] sm:left-0 top-0 min-w-[500px] w-[1100px] lg:w-screen lg:max-w-[2000px] rotate-180 `}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,128L17.1,122.7C34.3,117,69,107,103,101.3C137.1,96,171,96,206,101.3C240,107,274,117,309,149.3C342.9,181,377,235,411,245.3C445.7,256,480,224,514,181.3C548.6,139,583,85,617,85.3C651.4,85,686,139,720,154.7C754.3,171,789,149,823,149.3C857.1,149,891,171,926,170.7C960,171,994,149,1029,149.3C1062.9,149,1097,171,1131,170.7C1165.7,171,1200,149,1234,138.7C1268.6,128,1303,128,1337,106.7C1371.4,85,1406,43,1423,21.3L1440,0L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div
        className={`${
          transitionScreen ? "transition-login" : ""
        } w-full max-w-md z-[2] `}
      >
        <div className="bg-white rounded-lg shadow-md px-2  pt-6 pb-8 mb-4 relative ">
          {isFetching && (
            <div className="absolute bg-[#ffffffc7] rounded-[6px] w-full h-full top-0 left-0 flex items-center justify-center ">
              <div className="mt-[220px] text-black">
                <div className="flex flex-col items-center justify-center relative">
                  <div
                    className={`${
                      isFetching && isSuccessFetch ? "border-[#3498db]" : ""
                    }  relative loader w-12 h-12`}
                  ></div>
                  {isFetching && isSuccessFetch ? (
                    <svg
                      className="absolute mt-[3px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#28a745"
                        d="M9.93 16.36L5.71 12.15a.75.75 0 0 1 1.06-1.06l3.16 3.17 7.09-7.09a.75.75 0 0 1 1.06 1.06l-8.48 8.48a.75.75 0 0 1-1.06 0z"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </div>
                <p>{messageForm}</p>
              </div>
            </div>
          )}
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-[30px] font-bold text-center">Jet Match</h2>
            <div className="w-[220px]">
              <img
                  draggable={false}
                src="https://res.cloudinary.com/ddcoxtm2v/image/upload/v1685672962/8._interface-testing_wc6toa.png"
                alt=""
              />
            </div>
            {/* <p className="mt-4 text-center">
              Te ayudamos a gestionar rutinas de largos plazos de una manera
              intuitiva y divertida!
            </p> */}
          </div>

          <div className=" px-5 rounded-[6px]">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="email"
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>{" "}
          </div>
          <div className="flex flex-col mx-4 sm:flex-row items-center justify-between">
            <button
              onClick={() => loginLogic()}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
              type="submit"
            >
              Iniciar sesión
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
          <div className="m-4">
            <div className="bg-yellow-200 p-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-24 mr-4 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2L2 22h20L12 2zM12 16v-4m0 0V8m0 4h0"
                />
                <circle cx="12" cy="19" r="1" fill="currentColor" />
              </svg>
              <div className="text-yellow-800 text-[14px]">
                Si deseas entrar de invitado, puedes dar click en iniciar
                sesion; se generara de manera automatica un ID para que
                disfrutes de la app.
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs">
          &copy; 2023 Jet match. Desarrollado por <a href="https://jorge-ortega.pages.dev/" target={"_blank"}>Jorge Ortega</a>.
        </p>
      </div>
      <div className="absolute bottom-0 w-screen hidden ">
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1920" height="1080" fill="#ffffff" />
          <path
            d="M1920,1080C1600.5,1097.6666666666667,307.8333333333333,1089.3333333333333,0,1080C-307.8333333333333,1070.6666666666667,48.83333333333333,1039.3333333333333,73,1024C97.16666666666667,1008.6666666666666,120.5,986.8333333333334,145,988C169.5,989.1666666666666,195,1025.8333333333333,220,1031C245,1036.1666666666667,270.8333333333333,1022.1666666666666,295,1019C319.1666666666667,1015.8333333333334,340.6666666666667,1014.6666666666666,365,1012C389.3333333333333,1009.3333333333334,416.3333333333333,1004,441,1003C465.6666666666667,1002,488.6666666666667,1003.1666666666666,513,1006C537.3333333333334,1008.8333333333334,562,1014,587,1020C612,1026,637.8333333333334,1041.3333333333333,663,1042C688.1666666666666,1042.6666666666667,713.3333333333334,1020,738,1024C762.6666666666666,1028,786.6666666666666,1066.8333333333333,811,1066C835.3333333333334,1065.1666666666667,859.5,1019.8333333333334,884,1019C908.5,1018.1666666666666,933.5,1051.5,958,1061C982.5,1070.5,1006.5,1073.1666666666667,1031,1076C1055.5,1078.8333333333333,1080.1666666666667,1089.6666666666667,1105,1078C1129.8333333333333,1066.3333333333333,1155,1018.5,1180,1006C1205,993.5,1230.6666666666667,1000.6666666666666,1255,1003C1279.3333333333333,1005.3333333333334,1301.8333333333333,1020,1326,1020C1350.1666666666667,1020,1375.1666666666667,993.8333333333334,1400,1003C1424.8333333333333,1012.1666666666666,1450.1666666666667,1064.5,1475,1075C1499.8333333333333,1085.5,1524.5,1066.1666666666667,1549,1066C1573.5,1065.8333333333333,1597.1666666666667,1077.5,1622,1074C1646.8333333333333,1070.5,1673.1666666666667,1056.6666666666667,1698,1045C1722.8333333333333,1033.3333333333333,1746.5,1000.1666666666666,1771,1004C1795.5,1007.8333333333334,1820.6666666666667,1073,1845,1068C1869.3333333333333,1063,1904.5,972,1917,974C1929.5,976,2239.5,1062.3333333333333,1920,1080C1600.5,1097.6666666666667,307.8333333333333,1089.3333333333333,0,1080"
            fill="#df6688"
          />
        </svg>
      </div>
    </div>
  );
};

export default Login;
