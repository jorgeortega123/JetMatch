import React from "react";

export default function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-zinc-900 dark:text-zinc-50">
      Jet Match
      <img
        className="w-[120px]"
        src="https://res.cloudinary.com/ddcoxtm2v/image/upload/v1687306449/Frame_2_1_bobvho.png"
        alt=""
      />
    </div>
  );
}
