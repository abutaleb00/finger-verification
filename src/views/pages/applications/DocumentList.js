// ** React Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ** Reactstrap Imports
import {
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  UncontrolledTooltip,
  Row,
  Col,
} from "reactstrap";
import finger from "@src/assets/images/pages/fingerprint.svg";
import fingerapp from "@src/assets/images/pages/fingerprint-app.png";
import { Users, File, FilePlus } from 'react-feather'
import UILoader from '@components/ui-loader'
import toast from 'react-hot-toast'
import { Tooltip as ReactTooltip } from "react-tooltip";
export const baseAPI_URL = globalThis.baseAPI_URL;

const DocumentList = (props) => {
  const source = finger;
  const sourceapp = fingerapp;
  const [block, setBlock] = useState(false)
  const [data, setData] = useState([])
  // ** States
  const [basicModal, setBasicModal] = useState(false);
  const [basicModalPdf, setBasicModalPdf] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [guarantorList, setGuarantorList] = useState(props?.guarantors);

const getAllDocument =() =>{
    setBlock(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`);
    
    var formdata = new FormData();
    formdata.append("uniquereference", props?.uniquereference );
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${baseAPI_URL}/api/filesusingreference`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("data", result)
        console.log("result.result", result.result)
        if(result.result?.error === false){
            setBlock(false)
            setBasicModal(!basicModal)
            console.log(result?.data)  
            setData(result?.data)
        } else if(result.result.error === true){
            setBlock(false)
            toast.error(result.result?.errorMsg)
        }
        })
      .catch(error => setBlock(false));
}
useEffect(() =>{
  setGuarantorList(props?.guarantors)
},[props?.guarantors])
  return (
    <UILoader blocking={block}>
    <div className="demo-inline-spacing">
      <div className="basic-modal">
      <Badge id="DocumentL" color={'dark'} className="text-capitalize" style={{cursor:"pointer"}} >
        {/* <span onClick={() => setBasicModal(!basicModal)}><File /></span> */}
        <span onClick={() => block !== true ? getAllDocument() : preventDefault()}><File /></span>
      </Badge>
      <UncontrolledTooltip
        placement="top"
        target="DocumentL"
        trigger="hover"
        > Document List</UncontrolledTooltip>
        {/* <Button color='primary' outline onClick={() => setBasicModal(!basicModal)}>
          Basic Modal
        </Button> */}
        <Modal
          className="modal-fullscreen"
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
          Document List
          </ModalHeader>
          <ModalBody>
          <Row style={{}}>
            {data.length > 0 ? data.map((v, i) =>{
                return(
                    <Col key={i} className="mb-1" xl="3" md="3" sm="12" style={{textAlign:"center"}} >
                            <table className="table table-bordered" style={{with:"100%", border:"1px solid gray"}}>
                                <tr>
                                    <td colSpan={2}>
                                    {v.fileName.includes("pdf") ? <embed src={`data:application/pdf;base64,${v.base64Content}`}  type="application/pdf" width="100%"></embed> : <img className='img-thumbnail' src={`data:image/jpeg;base64,${ v.base64Content}`} alt='photo'
                                     style={{ border:"1px solid gray", borderRadius:"5px", padding:"5px"}} />}
                                    </td>
                                    {/* {v.fileName.includes("pdf") ? <img src="/pdf.png" alt="pdf" width={100} /> : <img className='img-thumbnail' src={`data:image/jpeg;base64,${ v.base64Content}`} alt='photo'
                                     style={{ border:"1px solid gray", borderRadius:"5px", padding:"5px"}} />}
                                    </td> */}
                                </tr>
                                <tr>
                                    <td style={{textAlign:"left", fontWeight:"bold"}}>Name:</td>
                                    <td style={{textAlign:"left"}}>{v.fileName}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:"left", fontWeight:"bold"}}>Size:</td>
                                    <td style={{textAlign:"left"}}>{v.fileSize}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:"left", fontWeight:"bold"}}>Type:</td>
                                    <td style={{textAlign:"left"}}>{v.documentType === 1 ? "Applicant Photo" : v.documentType === 2 ? "Signature" :
                                     v.documentType === 3 ? "NID Front" : v.documentType === 4 ? "NID Back" : v.documentType === 5 ? "Passport" :
                                     v.documentType === 6 ? "Birth Certificate" : v.documentType === 7 ? "TIN Certificate" : v.documentType === 9 ?
                                      "Driving License" : v.documentType === 10 ? "Nominee Photo" :"Others" }</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{textAlign:"left", fontWeight:"bold"}}>
                                      {v.fileName.includes("pdf") && 
                                      <div style={{textAlign:"center", padding:"2px"}}>
                                      <button 
                                      className="btn btn-primary"
                                      onClick={()=> {
                                        setBasicModalPdf(true)
                                        setBasicModal(false)
                                        setPdfData(v.base64Content)
                                      }}
                                      >
                                        Large View
                                      </button>
                                      </div>}
                                    </td>
                                </tr>
                            </table>
                    </Col>
                )
            }): <p style={{textAlign:"center"}}>No Docyment Found</p>}
       
        </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => setBasicModal(!basicModal)}>
                Close
              </Button>
          </ModalFooter>
        </Modal>
        <Modal
          className="modal-fullscreen"
          isOpen={basicModalPdf}
          toggle={() => setBasicModalPdf(!basicModalPdf)}
        >
          <ModalHeader toggle={() => setBasicModalPdf(!basicModalPdf)}>
          Document
          </ModalHeader>
          <ModalBody>
          <Row style={{height:"100%"}}>
            <Col className="mb-1" xl="12" md="12" sm="12" style={{textAlign:"center"}} >
            <embed src={`data:application/pdf;base64,${pdfData}`}  type="application/pdf" height="100%" width="100%"></embed>               
            </Col>     
        </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => setBasicModalPdf(!basicModalPdf)}>
                Close
              </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
    </UILoader>
  );
};
export default DocumentList;