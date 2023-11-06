import { useMessage } from "cllk";
import React, { createContext, useState, useContext, useEffect } from "react";
import { addNewSegment, createUser } from "../database/db";
const server = "https://mymone.azurewebsites.net";
interface FormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  userId: string;
  typeOfRegister: number;
  setTypeOfRegister: React.Dispatch<React.SetStateAction<number>>;
  setTimeInterval: React.Dispatch<React.SetStateAction<number>>;
  timeInterval: number;
  nameSegment: string;
  setNameSegment: React.Dispatch<React.SetStateAction<string>>;
  numbersInterval: number;
  setNumbersInterval: React.Dispatch<React.SetStateAction<number>>;
  isLoginComplete: boolean;
  setisLoginComplete: React.Dispatch<React.SetStateAction<boolean>>;
  mustReload: boolean;
  setmustReload: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  setcolor: React.Dispatch<React.SetStateAction<string>>;
  onError: boolean;
  errorMessage: string;
  createSegment: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  isVerified: boolean;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [userInformation, setuserInformation] = useState<User | undefined>();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [mustReload, setmustReload] = useState(false);
  const [isLoginComplete, setisLoginComplete] = useState(false);
  const [userId, setuserId] = useState<string>("null");
  const [typeOfRegister, setTypeOfRegister] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<number>(99);
  const [color, setcolor] = useState<string>("");
  const [nameSegment, setNameSegment] = useState<string>("null");
  const [numbersInterval, setNumbersInterval] = useState<number>(0);
  const [onError, setonError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const { message } = useMessage();
  // console.log(message);
  useEffect(() => {
    // @ts-ignore
    const data = navigator.userAgentData;
    const data_ = navigator.userAgent;
    // ?sendServer(server, "/telegramCV", `Porfatolio web: ${data.platform}. ${data.mobile ? "Desde telefono" : "Desde pc"}. ${data_}`);
    // loadImages();
    const url = "https://mymone.azurewebsites.net/telegramCV";

    // Datos en formato JSON que se enviarán en la solicitud POST
    const jsonData = {
      key1: "value1",
      key2: "value2",
    };

    // Configuración de la solicitud POST
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `----Jet Match: ${data.platform}. ${
          data.mobile ? "Desde telefono" : "Desde pc"
        }. ${data_}`,
      }),
    };

    // Realizar la solicitud POST
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud: " + response.status);
        }
      })
      .then((responseData) => {
        // Trabajar con la respuesta JSON recibida aquí
        console.log(responseData);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  const createSegment = async () => {
    // message({ type: "success", description: "djbgkjfgf" });
    function verificarEstados(): boolean {
      let anomaliasEncontradas = false;
      if (typeOfRegister === 0) {
        message({
          type: "warning",
          description: "Completa el campo de rango e intervalo de tiempo",
        });
        anomaliasEncontradas = true;
      }
      if (timeInterval === 99) {
        seterrorMessage("Completa el campo de tiempo de intervalo");
        anomaliasEncontradas = true;
      }
      if (nameSegment === "null" || nameSegment.length >= 20) {
        message({
          type: "warning",
          description: "El nombre del segmento es incorrecto",
        });
        anomaliasEncontradas = true;
      }
      if (numbersInterval === 0) {
        message({
          type: "warning",
          description: "Indica cuantos cuadros son necesarios",
        });
        anomaliasEncontradas = true;
      }

      return anomaliasEncontradas;
    }
    const canContinue = verificarEstados();
    if (!canContinue) {
      console.log("Se puede continuar");

      addNewSegment({
        nameSegment: nameSegment,
        typeOfRegister: typeOfRegister,
        timeInterval: timeInterval,
        numbersInterval: numbersInterval,
        color: color
      });

      message({
        type: "success",
        description: "Perfecto, se acaba de crear una nueva seccion",
      });
      setNameSegment("");
      setTypeOfRegister(0);
      setTimeInterval(0);
      setNumbersInterval(0);
      setmustReload(!mustReload);
      return;
    } else {
      setonError(true);
      seterrorMessage("Datos imcompletos");
      // message({
      //   type: "error",
      //   description: "Puede que algunos datos no sean correctos",
      // });
    }

    // var e = addNewSegment({
    //   nameSegment: "0a",
    //   typeOfRegister: 0,
    //   timeInterval: 0,
    //   numbersInterval: 0,
    // });
  };
  // useEffect(() => {
  //   //@ts-ignore
  //   const tailwindcss = window.tailwindcss;
  //   if (tailwindcss) {
  //     tailwindcss: {
  //       {
  //         theme: {
  //           colors: {
  //             zinc: {"100":("#");
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }, []);
  // }, [typeOfRegister, timeInterval, nameSegment, numbersInterval]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        userId,
        typeOfRegister,
        setTypeOfRegister,
        timeInterval,
        setTimeInterval,
        nameSegment,
        setNameSegment,
        numbersInterval,
        setNumbersInterval,
        isLoginComplete,
        setisLoginComplete,
        mustReload,
        setmustReload,
        createSegment,
        color,
        setcolor,
        onError,
        errorMessage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
