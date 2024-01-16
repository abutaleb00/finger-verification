// ** React Imports
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
// ** Reactstrap Imports
import {
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Button,
  UncontrolledTooltip,
  Row,
  Col,
  FormGroup,
  Input
} from "reactstrap";
import finger from "@src/assets/images/pages/fingerprint.svg";
import fingerapp from "@src/assets/images/pages/fingerprint-app.png";
import { FilePlus } from 'react-feather'
import UILoader from '@components/ui-loader'
import toast from 'react-hot-toast'
import Select from 'react-select'
export const baseAPI_URL = globalThis.baseAPI_URL;

const RoleUpdate = (props) => {
  const [block, setBlock] = useState(false)
  const [data, setData] = useState([])

  // ** States
  const [basicModal, setBasicModal] = useState(false);


  const paymentOption = [
    {value: 'maker', label: "Maker"},
    {value: 'checker', label: "Checker"},
    {value: 'bankUser', label: "Bank User"},
    {value: 'user', label: "User"},
    {value: 'admin', label: "Admin"}
  ]


useEffect(() =>{
  setData(props.id)
 console.log("props", props)
},[props])
  return (
    <UILoader blocking={block}>
    <div className="demo-inline-spacing">
      <div className="basic-modal">
      <Badge id="AddDocumentL" color={'success'} className="text-capitalize" style={{cursor:"pointer"}} >
        <span onClick={() => setBasicModal(!basicModal)}><FilePlus /></span>
      </Badge>
      <UncontrolledTooltip
        placement="top"
        target="AddDocumentL"
        trigger="hover"
        > Add Document</UncontrolledTooltip>
        <Modal
          className="sm"
          centered={true}
          isOpen={basicModal}
          backdrop={false}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
          Add New Document
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col className="mt-1" xl="12" md="12" sm="12" >
            <FormGroup>
            <Label for="selectDocument">Select Document Type</Label>
                <Select
                    className='react-select'
                    classNamePrefix='Select'
                    id='label'
                    options={paymentOption}
                    placeholder="Select Document"
                      onChange={(e) => {
                        setData([...data, {rolename: e.value}])
                        }}
                    />
            </FormGroup>
             </Col>
            <Col className="mb-1" xl="12" md="12" sm="12" style={{textAlign:"center"}}>
            <FormGroup>
            <Button style={{marginRight:"10px"}} color='success' >
                Upload
              </Button>
              <Button style={{marginLeft:"10px"}} color='danger' onClick={() => setBasicModal(!basicModal)}>
                Cancel
              </Button>
            </FormGroup>
             </Col>
        </Row>
          </ModalBody>
        </Modal>
      </div>
    </div>
    </UILoader>
  );
};
export default RoleUpdate;