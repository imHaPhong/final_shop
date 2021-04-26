import React, { useEffect, useRef, useState } from "react";
import { Icon } from "rsuite";
import useOnClickOutside from "../../utilities/custom-hooks/outSideClick";

const CModal = ({ isShow, setIsShow, title, msgErr }) => {
  const [show, setShow] = useState(isShow);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    // setShow(!isShow);
    setIsShow(!isShow);
  });
  return (
    <div className={`mModal ${show ? "" : "mShow"}`}>
      <div className="boder modalContainer" ref={ref}>
        <div className="modalTitle">
          <span>{title}</span>
          <Icon
            icon="close"
            onClick={() => {
              setIsShow(false);
            }}
          />
        </div>
        <div className="modalContent">{msgErr}</div>
        <div
          className="btn"
          onClick={() => {
            setIsShow(false);
          }}
        >
          Okay
        </div>
      </div>
    </div>
  );
};

export default CModal;
