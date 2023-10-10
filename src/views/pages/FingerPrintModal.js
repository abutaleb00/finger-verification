// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import finger from "@src/assets/images/pages/fingerprint.svg";
import fingerapp from "@src/assets/images/pages/fingerprint-app.png";

const FingerPrintModal = () => {
  const source = finger;
  const sourceapp = fingerapp;
  // ** States
  const [basicModal, setBasicModal] = useState(false);

  return (
    <div className="demo-inline-spacing">
      <div className="basic-modal">
        <Button
          type="reset"
          color="warning"
          outline
          onClick={() => setBasicModal(!basicModal)}
        >
          <img
            className="icon-only"
            width={80}
            src={source}
            alt="Fingerprint"
          />
        </Button>
        {/* <Button color='primary' outline onClick={() => setBasicModal(!basicModal)}>
          Basic Modal
        </Button> */}
        <Modal
          className="modal-fullscreen"
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
            Tcap Fingerprint
          </ModalHeader>
          <ModalBody>
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={sourceapp} alt="Fingerprint" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Link to="/ec-data" className="btn btn-primary">
              Submit
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default FingerPrintModal;
