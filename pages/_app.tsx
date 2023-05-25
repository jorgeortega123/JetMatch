import "../styles/globals.css";
import type { AppProps } from "next/app";

import { FormProvider } from "../context/MainContext";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "cllk";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </Provider>
  );
}
