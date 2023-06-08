import React, { useCallback, useState } from "react";
function useModal(initial: boolean = false) {
  const [modal, setModal] = useState<boolean>(initial);
  const open = useCallback(() => {
    document.body.style.overflowY = "hidden"
    setModal(true);
  }, []);
  const close = useCallback(() => {
    setModal(false);
  }, []);
  const toggle = useCallback(() => {
    setModal((state) => !state);
  }, []);
  return { open, close, value: modal, toggle };
}

export default useModal;