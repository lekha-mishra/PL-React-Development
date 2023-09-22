import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = (props) => {
  return (
    <Modal
      fullscreen={props?.isFullWidth || true}
      {...props}
      size={props?.modalSize || "md"}
      centered
      scrollable={false}
      backdropClassName="backdrop-2"
    >
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer className="p-2 border-0 justify-content-between">
        <div>{props?.footerLeftPanelChildren}</div>
        <Button variant="CloseBtn" onClick={props.onClose} className="closeBtn">
          {props?.cancelBtnTitle || "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
