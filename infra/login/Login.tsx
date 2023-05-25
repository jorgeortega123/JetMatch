import React, { useState } from "react";
import { createUser } from "../../database/db";

interface LoginProps {
  setisLogin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({setisLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const loginLogic = async() => {
    var s = await createUser();
    setisLogin(false)
    console.log(s);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md px-2  pt-6 pb-8 mb-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center">Jet Match</h2>
            {/* <p className="mt-4 text-center">
              Te ayudamos a gestionar rutinas de largos plazos de una manera
              intuitiva y divertida!
            </p> */}
          </div>
          <div className=" px-5 p-2 rounded-[6px]">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
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
                Si deseas entrar de invitado, puedes dar click en iniciar sesion;
                se generara de manera automatica un ID para que disfrutes de la
                app
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs">
          &copy; 2023 Jet match. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
