import { useMessage } from "cllk";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { updateUserNameById } from "../../database/db";

const FormularioEnlazar: React.FC<{ modal: any }> = ({ modal }) => {
  const { message } = useMessage();
  const [nombre, setNombre] = useState<string | undefined>("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState<string | undefined>("");
  const [contrasena, setContrasena] = useState("");
  const [confirmacionContrasena, setConfirmacionContrasena] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setloading] = useState(false);
  const { userInfo, setmustReloadUser } = useUserContext();
  useEffect(() => {
    var a = localStorage.getItem("token");
    setId(a ? a : "error");
    if (userInfo.name ==="undefined" || userInfo.email==="undefined" ) return;
    setNombre(userInfo?.name );
    setEmail(userInfo?.email );
  }, []);

  const validateEmailFormat = async (email: string) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmailFormat(email ? email: "")) {
      setEmailError("El email no tiene un formato válido");
      return;
    }

    if (contrasena !== confirmacionContrasena) {
      setContrasenaError("Las contraseñas no coinciden");
      return;
    }
    var data = {
      email: email,
      name: nombre,
      password: contrasena,
    };
    setloading(true);
    const res = await updateUserNameById(data);
    if (res === true) {
      message({
        type: "success",
        description: "Datos agregados correctamente",
      });
      modal?.close()
      setmustReloadUser(true)
    } else {
      message({
        type: "error",
        description: "Tus datos no fueron agregados",
      });
    }

    setloading(false);

    // Realizar validación o enviar los datos a la API aquí
  };
  return (
    <form className=" max-w-sm mx-auto bg-zinc-50 dark:bg-zinc-800 rounded  text-zinc-900 dark:text-zinc-50">
      <div className="mb-4">
        <label htmlFor="nombre" className="block mb-1 font-medium">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          placeholder="Tu nombre"
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 border bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="id" className="block mb-1 font-medium">
          ID
        </label>
        <input
          type="text"
          id="id"
          disabled
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-3 py-2 border bg-zinc-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          placeholder="tuemail@hotmail.com"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 border bg-zinc-50 dark:bg-zinc-900 ${
            emailError ? "border-red-500" : "border-gray-300 dark:border-zinc-700"
          } rounded focus:outline-none focus:border-blue-500`}
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>
      {userInfo.verified != false ? (
        <>
          {" "}
          <p className=" border rounded-[6px] p-[3px] font-[input] text-[14px] border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50" >
            {" "}
            Tus datos no son editables, trabajaremos en ello proximamente.
          </p>
        </>
      ) : (
        <>
          {" "}
          <div className="mb-4">
            <label htmlFor="contrasena" className="block mb-1 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value);
                setContrasenaError("");
              }}
              className={`w-full px-3 py-2 border  bg-zinc-50 dark:bg-zinc-900 ${
                contrasenaError ? "border-red-500" : "border-gray-300 dark:border-zinc-700"
              } rounded focus:outline-none focus:border-blue-500`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmacionContrasena"
              className="block mb-1 font-medium"
            >
              Confirmación de Contraseña
            </label>
            <input
              type="password"
              id="confirmacionContrasena"
              value={confirmacionContrasena}
              onChange={(e) => {
                setConfirmacionContrasena(e.target.value);
                setContrasenaError("");
              }}
              className={`w-full px-3 py-2 border  bg-zinc-50 dark:bg-zinc-900 ${
                contrasenaError ? "border-red-500" : "border-gray-300 dark:border-zinc-700"
              } rounded focus:outline-none focus:border-blue-500`}
            />
            {contrasenaError && (
              <p className="text-red-500 text-sm mt-1">{contrasenaError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {loading ? (
              <span className="flex">
                Enviando...
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
              </span>
            ) : (
              "Enviar"
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default FormularioEnlazar;
