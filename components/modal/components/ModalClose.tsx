function ModalClose({ text, closeModal }: { text: any; closeModal: any }) {
  return (
    <div className="flex justify-between items-center p-3  dark:border-zinc-50 border-zinc-900 relative ">
      <h1 className="capitalize text-black dark:text-white ml-3">{text}</h1>
      <div onClick={closeModal} className="cursor-pointer border rounded-full bg-[#e4e6eb]">
        <svg
          
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#606770]"
          width="36"
          height="36"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </div>
  );
}

export default ModalClose;
