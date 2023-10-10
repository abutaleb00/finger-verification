// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Label,
    Input,
    Button,
    Row,
    Col,
  } from "reactstrap";
  import React, { useEffect } from 'react';
  import Select from "react-select"; // eslint-disable-line
  import { useState } from "react";
  import { useLocation, Link, useNavigate } from "react-router-dom";
  import toast from 'react-hot-toast'
  import axios from 'axios'
  import UILoader from '@components/ui-loader'
  import { v4 as uuidv4 } from 'uuid'
  import { nidfield, presentAddressData, parmanentAddressData } from "../../components/localjs/data";
  import TextBox from "../../components/TextBox"
  
  const EditApplicant = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [application, setApplication] = useState(location.state?.userinfo)
    const [state, setState] = useState(location.state?.userinfo?.loanee)
    const [block, setBlock] = useState(false)
    const [permanentAddress, setPermanentAddress] = useState(location.state?.userinfo?.loanee?.permanentAddress)
    const [presentAddress, setPresentAddress] = useState(location.state?.userinfo?.loanee?.presentAddress)
    console.log("location", location.state)

   const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
      }
   const handlePresentChange = (e) => {
    setPresentAddress({ ...state, [e.target.name]: e.target.value })
      }
   const handlePermanentChange = (e) => {
    setPermanentAddress({ ...state, [e.target.name]: e.target.value })
      }
    const updateLoanApplication = (e) =>{
  e.preventDefault()
  const sendata = {
    loanapplication: {
        loan_no: application?.loan_no,
        createdBy: application?.createdBy,
        branchName: application?.branchName,
        status: application?.status,
        id: application?.id
    },
    loanee: {
        name: state?.name,
        nameEn: state?.nameEn,
        bloodGroup: state?.bloodGroup,
        dateOfBirth: state?.dateOfBirth,
        father: state?.father,
        mother: state?.mother,
        spouse: state?.spouse,
        mobile: state?.mobile,
        designation: state?.designation,
        email: state?.email,
        nationalId: state?.nationalId,
        occupation: state?.occupation,
        permanentAddress: permanentAddress,
        presentAddress: presentAddress
    },
    guarantors: application?.guarantors
  }
  setBlock(true)
  axios.post('/addloan', sendata).then(res => {
    if(res.data.result.error === false){
      setBlock(false)
      toast.success("Application Update Succsfully")
      navigate('/new-applications')
    } else if(res.data.result.error === true){
      setBlock(false)
      toast.error(res.data.result.errorMsg)
    }
   })
   .catch(err => {
    setBlock(false)
      toast.error(err.data.result.errorMsg)
   })
  console.log("send data", sendata)
    }
    return (
      <UILoader blocking={block}>
      <Card>
        <CardHeader style={{marginBottom:"10px", borderBottom:"1px dashed gray"}}>
          <CardTitle tag="h4">Update Applicant Information</CardTitle>
          <Button tag={Link} to="/pending-user" color="primary" className="btn-md" outline>Back to Applicant List</Button>
        </CardHeader>
  
        <CardBody>
        <form onSubmit={updateLoanApplication}>
          <Row>
          {nidfield.map((v, k) => {
            return (
                <TextBox
                    key={"tp_text" + k}
                    col={v.col}
                    id={v.id}
                    type={v.type}
                    maxLength={v.maxLength}
                    name={v.id}
                    title={v.title}
                    isMandatory={v.isMandatory}
                    placeholder={v.placeholder}
                    disable={v.disable}
                    val={state[v.id] !== undefined && state[v.id] !== null ? state[v.id] : "" }
                    ChangeHandler={(e) => handleChange(e)}
                    />
                    );
                  })}
            <Col className="mb-1" xl="12" md="12" sm="12">
              <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
                Present Address
              </p>
            </Col>
            {presentAddressData.map((v, k) => {
            return (
                <TextBox
                    key={"tp_text" + k}
                    col={v.col}
                    id={v.id}
                    type={v.type}
                    maxLength={v.maxLength}
                    name={v.id}
                    title={v.title}
                    isMandatory={v.isMandatory}
                    placeholder={v.placeholder}
                    disable={v.disable}
                    val={presentAddress[v.id] !== undefined && presentAddress[v.id] !== null ? presentAddress[v.id] : "" }
                    ChangeHandler={(e) => handlePresentChange(e)}
                    />
                    );
                  })}
            <Col className="mb-1" xl="12" md="12" sm="12">
              <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
              Permanent Address
              </p>
            </Col>
            {parmanentAddressData.map((v, k) => {
            return (
                <TextBox
                    key={"tp_text" + k}
                    col={v.col}
                    id={v.id}
                    type={v.type}
                    maxLength={v.maxLength}
                    name={v.id}
                    title={v.title}
                    isMandatory={v.isMandatory}
                    placeholder={v.placeholder}
                    disable={v.disable}
                    val={permanentAddress[v.id] !== undefined && permanentAddress[v.id] !== null ? permanentAddress[v.id] : "" }
                    ChangeHandler={(e) => handlePermanentChange(e)}
                    />
                    );
                  })}
          </Row>
          <Row style={{marginTop:"15px", borderTop:"1px dashed gray"}}>
          <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="submit"
              color="success"
            >
              Update
            </Button>
          </Col>
        </Row>
        </form>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default EditApplicant