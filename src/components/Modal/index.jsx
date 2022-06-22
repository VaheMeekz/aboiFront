import React from "react";
import { Modal, Button } from "react-bootstrap";
import Iframe from "react-iframe";

const Modal1 = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Iframe
          url={`https://www.youtube.com/embed/${props.video}`}
          width="100%"
          height="450px"
          id="myId"
          autoplay
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal.Body>
    </Modal>
  );
};

export default Modal1;
