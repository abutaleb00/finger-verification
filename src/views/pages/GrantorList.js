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
  UncontrolledTooltip
} from "reactstrap";
import finger from "@src/assets/images/pages/fingerprint.svg";
import fingerapp from "@src/assets/images/pages/fingerprint-app.png";
import { Users, Edit, Trash } from 'react-feather'
import image1 from '@src/assets/images/avatars/1.png'
import image2 from '@src/assets/images/avatars/2.png'
import image3 from '@src/assets/images/avatars/3.png'
import { Tooltip as ReactTooltip } from "react-tooltip";

const GrantorList = (props) => {
  const source = finger;
  const sourceapp = fingerapp;
  // ** States
  const [basicModal, setBasicModal] = useState(false);
  const [guarantorList, setGuarantorList] = useState(props?.guarantors);
useEffect(() =>{
  setGuarantorList(props?.guarantors)
},[props?.guarantors])
  return (
    <div className="demo-inline-spacing">
      <div className="basic-modal">
      <Badge id="GuarantorL" color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
        <span onClick={() => setBasicModal(!basicModal)}><Users /></span>
      </Badge>
      <UncontrolledTooltip
        placement="top"
        target="GuarantorL"
        trigger="hover"
        > Guarantor List</UncontrolledTooltip>
        {/* <Button color='primary' outline onClick={() => setBasicModal(!basicModal)}>
          Basic Modal
        </Button> */}
        <Modal
          className="modal-fullscreen"
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
          Guarantor List
          </ModalHeader>
          <ModalBody>
          <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Photo</th>
          <th>NID Number</th>
          <th>Father Name</th>
          <th>Mother Name</th>
          <th>Phone Number</th>
          <th>Profession</th>
          <th>Created By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          guarantorList?.length > 0 ? guarantorList?.map((v, i) => {
            return (
            <tr key={i}>
              <td>{v.nameEn}</td>
              <td><img src={`data:image/jpeg;base64,${v?.nidphoto}`} alt='img' style={{width: 30, height: 30, border:"1px solid gray", borderRadius:"2px"}} /></td>
              <td>{v.nationalId}</td>
              <td>{v.father}</td>
              <td>{v.mother}</td>
              <td>{v.mobile}</td>
              <td>{v.occupation}</td>
              <td>{v.createdBy}</td>
              <td>
              <Link
                id='button2'
                to={`/grantor-view`}
                state={{ userinfo: v }}
                >
                  <Badge id="edit" color={'info'} className="text-capitalize" style={{cursor:"pointer"}} >
                    <span >View</span>
                  </Badge>
                  </Link>
                </td>
            </tr>)
          }) : <tr>
            <td colSpan="7"><p style={{textAlign:"center", marginTop:"15px"}}>No Guarantor Found</p></td>
            </tr>
        }
        {/* <tr>
          <td>
            <img className='me-75' src={image2} alt='angular' height='20' width='20' />
          </td>
          <td><span className='align-middle fw-bold'>Abdul Kalam</span></td>
          <td>Ahamed Sharif</td>
          <td>9088768732423</td>
          <td>01927485676</td>
          <td>Brother</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
              <Link to="/grantor-edit" >
              <Badge color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
                <span >Edit</span>
              </Badge>
              </Link>
          </td>
        </tr>
        <tr>
          <td>
            <img className='me-75' src={image1} alt='angular' height='20' width='20' />
          </td>
          <td><span className='align-middle fw-bold'>Nadia Hassan</span></td>
          <td>Kaser Hossain</td>
          <td>8963453459</td>
          <td>0192792304</td>
          <td>Friend</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
            <Link to="/grantor-edit" >
              <Badge color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
                <span >Edit</span>
              </Badge>
              </Link>
          </td>
        </tr>
        <tr>
          <td>
            <img className='me-75' src={image3} alt='angular' height='20' width='20' />
          </td>
          <td><span className='align-middle fw-bold'>Amirul Islam</span></td>
          <td>Javed Iqbal</td>
          <td>9088768732423</td>
          <td>01723426478</td>
          <td>Wife</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
            <Link to="/grantor-edit" >
              <Badge color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
                <span >Edit</span>
              </Badge>
              </Link>
          </td>
        </tr> */}
      </tbody>
    </Table>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => setBasicModal(!basicModal)}>
                Close
              </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default GrantorList;