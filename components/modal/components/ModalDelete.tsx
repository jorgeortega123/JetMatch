import React from "react";

function ModalDelete({
  buttonConfig,
}: {
  buttonConfig?: {
    type?: "create" | "delete" | "update";
    text?: string;
    onSuccess?: () => void;
    onCancel?: any;
  };
}) {
  return (
    <>
      {buttonConfig?.type == "delete" && (
        <>
          <svg
            className="w-40 mx-auto dark:fill-zinc-50 fill-zinc-900"
            viewBox="0 0 512 512"
          >
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
          </svg>
        </>
      )}
    </>
  );
}

export default ModalDelete;