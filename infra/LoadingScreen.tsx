import React from "react";
import Icons from "../styles/Icons";

export default function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-zinc-900 dark:text-zinc-50">
      <div className="flex flex-col items-center justify-center mt-[-56px]">
        <h1 className="text-[24px] font-bold">Jet Match</h1>
        <div className="flex gap-1 items-center justify-center">
          <Icons stroke="#96A7AF" icon="loading"></Icons>
          <p className=" text-[12px] font-thin text-[#96A7AF]">
            Consultando datos...
          </p>
        </div>
      </div>
    </div>
  );
}
