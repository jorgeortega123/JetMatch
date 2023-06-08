import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body className="bg-[#f0f2f5]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
