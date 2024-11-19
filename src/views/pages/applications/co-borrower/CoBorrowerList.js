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
  Input,
  UncontrolledTooltip
} from "reactstrap";
import finger from "@src/assets/images/pages/fingerprint.svg";
import fingerapp from "@src/assets/images/pages/fingerprint-app.png";
import { Users, Edit, Trash } from 'react-feather'
import image1 from '@src/assets/images/avatars/1.png'
import image2 from '@src/assets/images/avatars/2.png'
import image3 from '@src/assets/images/avatars/3.png'
import { Tooltip as ReactTooltip } from "react-tooltip";

const CoBorrowerList = (props) => {
  const source = finger;
  const sourceapp = fingerapp;
  // ** States
  const [basicModal, setBasicModal] = useState(false);
  const [coBorrowerList, setCoBorrowerList] = useState(props?.coBorrower);
  const [remarks, setRemarks] = useState('')
  const [userData, setUserData] = useState(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    setCoBorrowerList(props?.coBorrower)
  }, [props?.guarantors])

  const deleteApplication = () => {
    e.preventDefault()
    const sentdata = {
      loanapplication: {
        loan_no: props?.id,
      },
      coBorrower: [{ ...userData, isDeleted: true, remarks: remarks }],
      coBorrowerDelete: true
    }
    setShow(false)
    axios
      .post(`/loandelete`, sentdata)
      .then((res) => {
        if (res.data.result.error === false) {
          toast.success("Gurantor Deleted Successfully");
          allNewApplication();
        } else if (res.data.result.error === true) {
          toast.error(res.data.result.errorMsg);
        }
      })
      .catch((e) => {
        toast.error(e.data.result.errorMsg);
      });
  }
  return (
    <div className="demo-inline-spacing">
      <div className="basic-modal">
        <Badge onClick={() => setBasicModal(!basicModal)} id="CoBorrowerL" color={'warning'} className="text-capitalize" style={{ cursor: "pointer" }} >
          <span ><Users /></span>
        </Badge>
        <UncontrolledTooltip
          placement="top"
          target="CoBorrowerL"
          trigger="hover"
        > Co-Borrower List</UncontrolledTooltip>
        {/* <Button color='primary' outline onClick={() => setBasicModal(!basicModal)}>
          Basic Modal
        </Button> */}
        <Modal
          className="modal-fullscreen"
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
            Co-Borrower List
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
                  coBorrowerList?.length > 0 ? coBorrowerList?.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.nameEn}</td>
                        <td><img src={`data:image/jpeg;base64,${v?.nidphoto}`} alt='img' style={{ width: 30, height: 30, border: "1px solid gray", borderRadius: "2px" }} /></td>
                        <td>{v.nationalId}</td>
                        <td>{v.father}</td>
                        <td>{v.mother}</td>
                        <td>{v.mobile}</td>
                        <td>{v.occupation}</td>
                        <td>{v.createdBy}</td>
                        <td>
                          <Link
                            id='button2'
                            to={`/coborrower-view`}
                            state={{ userinfo: v }}
                          >
                            <Badge id="edit" color={'info'} className="text-capitalize" style={{ cursor: "pointer" }} >
                              <span >View</span>
                            </Badge>
                          </Link>
                          <Badge onClick={() => {
                            setShow(!show)
                            setUserData(v)
                          }} id="delete" color={'danger'} className="text-capitalize" style={{ cursor: "pointer", marginLeft: "5px" }} >
                            <span >Delete</span>
                          </Badge>
                        </td>
                      </tr>)
                  }) : <tr>
                    <td colSpan="7"><p style={{ textAlign: "center", marginTop: "15px" }}>No Co-Borrower Found</p></td>
                  </tr>
                }
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => setBasicModal(!basicModal)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-sm'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
          <ModalBody className='pb-3 px-sm-3'>
            <h3 className='text-center mb-1' style={{ color: "red", fontWeight: "bold" }}>Are you sure ?</h3>
            <p className='text-center mb-2'>You want to Delete this Application</p>
            <form onSubmit={deleteApplication}>
              <Input
                type="textarea"
                rows={3}
                id="basicInput"
                placeholder="Enter remarks"
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value)
                }}
                required
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>

                <Button type="submit" outline
                  color="primary" style={{ marginRight: "10px" }} >Submit</Button>
                <Button outline
                 onClick={()=> setShow(!show)}
                  color="danger">Cancel</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default CoBorrowerList;