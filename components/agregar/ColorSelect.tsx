import React, { useState } from "react";

const ColorSelect: React.FC<{
  setcolorSelected: (data: string) => void;
}> = ({ setcolorSelected }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // const colors = [
  //   '#FFC3A0',
  //   '#FFA8B2',
  //   '#FFD3B5',
  //   '#FFD3E0',
  //   '#BAA3FF',
  //   '#D7AEFB',
  //   '#A7E9AF',
  //   '#9AE4C4',
  //   '#D4E9E2',
  //   '#F1FFE7',
  // ];
  // "#0070ff",
  // "#D7FF00",
  // "#a05195",
  // "#FFD3E0",
  // "#FFEC00",
  // "#007ED6",
  // "#A7E9AF",
  // "#FF7300",
  // "#FF45F9",
  // "#D7FF00",

  const colors = [
    "bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-t from-green-300 via-blue-500 to-purple-600",
    "bg-gradient-to-t from-pink-300 via-purple-300 to-indigo-400",
    "bg-gradient-to-t from-yellow-100 via-yellow-300 to-yellow-500",
    "bg-gradient-to-t from-yellow-200 via-yellow-400 to-yellow-700",
    "bg-gradient-to-t from-indigo-300 to-purple-400",
    "bg-gradient-to-t from-blue-100 via-blue-300 to-blue-500",
    "bg-gradient-to-t from-green-300 to-purple-400",
    "bg-[#0070ff]",
    "bg-[#D7FF00]",
    "bg-[#a05195]",
    "bg-[#FFD3E0]",
    "bg-[#FFEC00]",
    "bg-[#FF7300]",
    "bg-[#FF45F9]",
  ];

  const handleColorSelect = (color: string) => {
    setcolorSelected(color);
    setSelectedColor(color);
  };

  return (
    <div>
      <h4 className="text-sm">Color para representar el segmento</h4>
      <div className="flex flex-wrap justify-center items-center">
        {colors.map((color, index) => (
          <div
            key={index}
            className={` w-[36px] h-[36px] ${color} rounded-md m-1 cursor-pointer border-[1px] border-zinc-500`}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      {/* <p>Color seleccionado: {selectedColor}</p> */}
    </div>
  );
};

export default ColorSelect;
