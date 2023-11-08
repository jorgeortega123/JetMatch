import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import useModal from "../../hooks/useModal";
import ModalClose from "./components/ModalClose";

function Modal({
  children,
  className,
  modal,
  title,
  full,
  ...props
}: {
  children?: any;
  className?: string;
  modal: any;
  title: string;
  full?: boolean;
  delete?: boolean;
}) {
  const scrollBody = (scroll: string) => {
    document.body.style.overflowY = scroll;
  };
  const nodeRef = useRef(null);
  const ref = useRef(null);
  const closeModal = () => {
    modal?.close();
    scrollBody("scroll");
  };

  return (
    <CSSTransition
      classNames="modal"
      timeout={300}
      unmountOnExit
      nodeRef={nodeRef}
      in={modal?.value}
    >
      <div
        ref={nodeRef}
        style={{ marginTop: 0 }}
        className={`bo fixed w-full h-screen top-0 left-0 z-[70] flex justify-center items-center py-16  bg-[#0000005e] backdrop-blur-[2px]`}
      >
        <div
          onClick={() => closeModal()}
          className="z-[9] a absolute h-screen w-screen"
        >
        </div>
        <div
          ref={ref}
          {...props}
          className={`z-[10] relative overflow-auto bg-zinc-50 dark:bg-zinc-800 dark:border-[2px] dark:border-zinc-700   rounded-lg shadow max-h-full w-11/12 sm:max-w-[600px]  mx-auto`}
        >
          <ModalClose closeModal={closeModal} text={title} />
          {props.delete && (
            <svg
              className="w-40 mx-auto bg-white"
              viewBox="0 0 512 512"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
            </svg>
          )}
          <div className={` mb-5 w-11/12 mx-auto ${className} font-[Normal] flex flex-col justify-center items-center `}>
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
export default Modal;
