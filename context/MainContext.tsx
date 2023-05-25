import { useMessage } from "cllk";
import React, { createContext, useState, useContext, useEffect } from "react";
import { addNewSegment, createUser } from "../database/db";

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
  createSegment: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [mustReload, setmustReload] = useState(false);
  const [isLoginComplete, setisLoginComplete] = useState(false);
  const [userId, setuserId] = useState<string>("null");
  const [typeOfRegister, setTypeOfRegister] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<number>(0);
  const [nameSegment, setNameSegment] = useState<string>("null");
  const [numbersInterval, setNumbersInterval] = useState<number>(0);
  const { message } = useMessage();
  console.log(message);
  useEffect(() => {
    createUser();
  }, [typeOfRegister]);
  const createSegment = async () => {
    // message({ type: "success", description: "djbgkjfgf" });
    function verificarEstados(): boolean {
      let anomaliasEncontradas = false;

      // if (userId === "null") {
      //   message({ type: "warning", description: "El estado userId está vacío o establecido en su valor por defecto." });
      //   anomaliasEncontradas = true;
      // }
      if (typeOfRegister === 0) {
        message({
          type: "warning",
          description: "Completa el campo de rango e intervalo de tiempo",
        });
        anomaliasEncontradas = true;
      }
      if (timeInterval === 0) {
        message({
          type: "warning",
          description:
            "El estado timeInterval está vacío o establecido en su valor por defecto.",
        });
        anomaliasEncontradas = true;
      }
      if (nameSegment === "null") {
        message({
          type: "warning",
          description:
            "El estado nameSegment está vacío o establecido en su valor por defecto.",
        });
        anomaliasEncontradas = true;
      }
      if (numbersInterval === 0) {
        message({
          type: "warning",
          description:
            "El estado numbersInterval está vacío o establecido en su valor por defecto.",
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
      });

      message({
        type: "success",
        description: "Puede que si...",
      });
      setmustReload(!mustReload);
      return;
    }
    setmustReload(!mustReload);
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
