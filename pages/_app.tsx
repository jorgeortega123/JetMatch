import "../styles/globals.css";
import "../styles/wave.css";
import type { AppProps } from "next/app";

import { FormProvider } from "../context/MainContext";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "cllk";
import { UserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <UserProvider>
        <FormProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </FormProvider>
      </UserProvider>
    </Provider>
  );
}
