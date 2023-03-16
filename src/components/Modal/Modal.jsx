import ReactDOM from "react-dom";
import React from "react";

const modalRootElement = document.querySelector("#react-modals");

export default function Modal(props) {
  const { children, open} = props;
  const element = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);

      return () => {
        modalRootElement.removeChild(element);
      };
    }
  });

  return ReactDOM.createPortal(open && children, element);
}
