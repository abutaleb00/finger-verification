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

const AddDocument = (props) => {
  const source = finger;
  const sourceapp = fingerapp;
  const [block, setBlock] = useState(false)
  const [data, setData] = useState([])
  const [files, setFiles] = useState([])
  const [fileName, setFileName] = useState('')
  const [docymentType, setDocymentType] = useState(1)

  // ** States
  const [basicModal, setBasicModal] = useState(false);
  const [guarantorList, setGuarantorList] = useState(props?.guarantors);

  const paymentOption = [
    {value: 1, label: "Applicant Photo"},
    {value: 10, label: "Nominee Photo"},
    {value: 2, label: "Signature"},
    {value: 3, label: "NID Front"},
    {value: 4, label: "NID Back"},
    {value: 5, label: "Passport"},
    {value: 6, label: "Birth Certificate"},
    {value: 7, label: "TIN Certificate"},
    {value: 9, label: "Driving License"},
    {value: 8, label: "Others"},
  ]
 const handleFileChange = ({target: {files}}) => {
    
    const cancel = !files.length;
    if (cancel) return;

    const [{ size, name }] = files;
    const maxSize = 50000;
    console.log("files", files)
    let reader = new FileReader();
    setFiles(files)
    let file = files[0];
    console.log("file", file)
    if (size < maxSize) {
        setFileName(name)
    } else {
        setFileName('')
    }
  }
const uploadAllDocument =() =>{
setBlock(true)
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`);
 let subdata = {
    tags:[
                {
                    fileName:files[0].name,
                    tag:files[0].name,
                    docType:docymentType
                }
            ]
 }
var formdata = new FormData();
formdata.append("filedata", files[0]);
formdata.append("doctype", docymentType);
formdata.append("tags", JSON.stringify(subdata))
formdata.append("uniquereference", props?.uniquereference);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${baseAPI_URL}/api/fileupload`, requestOptions)
  .then(response => response.json())
  .then(result => { 
    if(result?.result?.error === false){
    setBlock(false)
    console.log(result)
    setBasicModal(false)
    toast.success('File Upload Successful!')
    } else if(result.result.error === true){
        setBlock(false)
        toast.error(result.result?.errorMsg)
    }
})
  .catch(error => {
    setBlock(false)
    console.log('error', error)});
}
useEffect(() =>{
  setGuarantorList(props?.guarantors)
},[props?.guarantors])
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
                        setDocymentType(e.value)
                        }}
                    />
            </FormGroup>
             </Col>
            <Col className="mb-1" xl="12" md="12" sm="12" >
            <FormGroup>
                <Label for="documentFile">Document</Label>
                <Input
                id="documentFile"
                name="file"
                type="file"
                onChange={handleFileChange}
                />
            </FormGroup>
             </Col>
            <Col className="mb-1" xl="12" md="12" sm="12" style={{textAlign:"center"}}>
            <FormGroup>
            <Button style={{marginRight:"10px"}} color='success' onClick={() => uploadAllDocument()}>
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
export default AddDocument;