import { createContext } from "react";
import useM from "./UseM";
//@ts-ignore
const MessageContext = createContext();
export interface IMessageContext {
  message: (data: {
    type: "success" | "error" | "warning" | "alert";
    description: string;
  }) => void;
}
function MessageContextComponent({ children }: { children: any }) {
  const { changeProps, showMessage } = useM();
  return (
    <MessageContext.Provider value={{ message: changeProps }}>
      {showMessage()}
      {children}
    </MessageContext.Provider>
  );
}
export { MessageContext, MessageContextComponent };