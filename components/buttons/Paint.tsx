import { useState } from "react";
import { useFormContext } from "../../context/MainContext";
import { updateSegment } from "../../database/db";

interface ButtonProps {
    inicial: number;
    id: string;
  }
export const ButtonWithLoading: React.FC<ButtonProps> = ({ inicial, id }) => {
    const [loading, setLoading] = useState(false);
    const { setmustReload, mustReload } = useFormContext();
  
    const handleClick = async () => {
      setLoading(true);
      var s = await updateSegment({ idSegment: id, current: inicial });
      console.log(s);
      setLoading(false);
      setmustReload(!mustReload);
    };
  
    return (
      <div className=" p-[2px] relative">
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
          }}
          className="  rounded-[10px] top-0 left-0 absolute w-full h-full z-[-1]"
        ></div>
        <button
          className=" z-[5] bg-slate-50 font-[500] rounded-[10px] w-[140px] h-[44px] flex items-center justify-center  "
          onClick={handleClick}
          disabled={loading}
        >
          Pintar
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                margin: 0,
                background: "none",
                display: "block",
                shapeRendering: "auto",
              }}
              width="40px"
              height="40px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#75CCEB"
                strokeWidth="10"
                fill="none"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="1.3s"
                  repeatCount="indefinite"
                  from="0"
                  to="502"
                ></animate>
                <animate
                  attributeName="stroke-dasharray"
                  dur="1.3s"
                  repeatCount="indefinite"
                  values="150.6 100.4;1 250;150.6 100.4"
                ></animate>
              </circle>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="36"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="m15.536 22.898l9.899 9.9m-9.899-9.9L7.05 31.383a7 7 0 1 0 9.9 9.9l8.485-8.486m-9.899 0l-4.243 4.243" />
                <path d="m25.435 32.797l14.907-6.432c2.688-1.16 3.809-4.379 2.086-6.745C38.264 13.903 32.65 8.89 28.51 5.823c-2.29-1.696-5.33-.64-6.46 1.975l-6.514 15.1l9.899 9.9Z" />
              </g>
            </svg>
          )}
        </button>
      </div>
    );
  };