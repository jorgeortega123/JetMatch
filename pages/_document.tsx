import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {



  return (
    <Html lang="en">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>JetMatch</title>
      </Head>
      <body className="bg-zinc-50 dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
