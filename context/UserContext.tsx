import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserDataById } from "../database/db";
interface UserProps {
  name?: string;
  email?: string;
  password?: string;
  verified?: boolean;
}

interface UserContextProps {
  isLogin: boolean;
  setisLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setsuccessLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setmustReloadUser: React.Dispatch<React.SetStateAction<boolean>>;
  successLogin: boolean;
  mustReloadUser: boolean;
  userInfo: UserProps;
  isLoaded: boolean;
  logOut: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const [isLoaded, setisLoaded] = useState(false);
  const [isLogin, setisLogin] = useState<boolean>(false);
  const [successLogin, setsuccessLogin] = useState(false);
  const [mustReloadUser, setmustReloadUser] = useState(false);
  const [userInfo, setuserInfo] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    verified: false,
  });
  useEffect(() => {
    getInfoUser();
  }, [isLogin, mustReloadUser]);

  const logOut = () => {
    var res = localStorage.removeItem("token");
    console.log(res);
    setsuccessLogin(false);
    setuserInfo({
      name: "",
      email: "",
      password: "",
      verified: false,
    })
    router.push("/login")
  };
  const getInfoUser = async () => {
    try {
      var resUser = await getUserDataById();
      var data = localStorage.getItem("token");
  
      if (!data || resUser === null) {
        setisLogin(false);
      } else {
        setuserInfo({ ...resUser });
        setisLogin(true);
      }
  
      setisLoaded(true);
    } catch (error) {
      console.error(error);
      setisLogin(false);
      setisLoaded(true);
    }
  };
  
  return (
    <UserContext.Provider
      value={{
        isLogin,
        setisLogin,
        successLogin,
        setsuccessLogin,
        setmustReloadUser,
        mustReloadUser,
        userInfo,
        logOut,
        isLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
