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

  const colors = [
    "#0070ff",
    "#D7FF00",
    "#a05195",
    "#FFD3E0",
    "#FFEC00",
    "#007ED6",
    "#A7E9AF",
    "#FF7300",
    "#FF45F9",
    "#D7FF00",
  ];

  const handleColorSelect = (color: string) => {
    setcolorSelected(color);
    setSelectedColor(color);
  };

  return (
    <div>
      <h4 className="text-dm">Color para representar el segmento</h4>
      <div className="flex flex-wrap">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-[36px] h-[36px] rounded-md m-1 cursor-pointer border-[1px] border-zinc-500"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      {/* <p>Color seleccionado: {selectedColor}</p> */}
    </div>
  );
};

export default ColorSelect;
