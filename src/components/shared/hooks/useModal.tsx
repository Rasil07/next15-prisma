import React from "react";

type ModalPropType = {
  callback: () => void;
};
const useModal = (props: ModalPropType) => {
  const [showModal, setModal] = React.useState(false);
  return <div>useModal</div>;
};

export default useModal;
