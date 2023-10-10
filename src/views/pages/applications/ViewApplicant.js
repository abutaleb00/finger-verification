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
  import { useLocation, Link } from "react-router-dom";
  import toast from 'react-hot-toast'
  import axios from 'axios'
  import UILoader from '@components/ui-loader'
  import { v4 as uuidv4 } from 'uuid'
  
  const ViewApplicant = (props) => {
    const location = useLocation()
    const [state, setSate] = useState(location.state?.userinfo?.loanee)
    const [block, setBlock] = useState(false)
    const [permanentAddress, setPermanentAddress] = useState(location.state?.userinfo?.loanee?.permanentAddress)
    const [presentAddress, setPresentAddress] = useState(location.state?.userinfo?.loanee?.presentAddress)
    const genderOptions = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female", color: "#0052CC", isFixed: true },
      { value: "third", label: "Third Person" },
    ];
    console.log("location", location.state)
    console.log("location 2", location.state?.userinfo?.permanentAddress)
    const createLoanApplication = (e) =>{
  e.preventDefault()
  const sendata = {
    loanapplication: {
        loan_no: uuidv4().substring(0,13),
        createdBy: "john_doe5",
        branchName: "Main Branch",
        status: 0
    },
    loanee: {
        createdBy: "john_doe5",
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
    guarantors: []
  }
  setBlock(true)
  axios.post('/addloan', sendata).then(res => {
    if(res.data.result.error === false){
      setBlock(false)
      toast.success("Application Submit Succsfully")
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
          <CardTitle tag="h4">Personal Information</CardTitle>
          <Button tag={Link} to="/pending-user" color="primary" className="btn-md" outline>Back to Applicant List</Button>
        </CardHeader>
  
        <CardBody>
          <Row>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
               NID Number
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter NID Number"
                value={state?.nationalId}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Full Name Bangla
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter"
                value={state?.name}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Full Name English
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter"
                value={state?.nameEn}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
               Date of Birth
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter"
                value={state?.dateOfBirth}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Father Name
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter"
                value={state?.father}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Mother Name
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter"
                value={state?.mother}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Gender
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Gender"
                value={state?.gender}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Spouse Name
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Spouse Name"
                value={state?.spouse}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Profession
              </Label>
              <Input 
                type="text" 
                id="basicInput" 
                placeholder="Enter Profession" 
                value={state?.occupation}
                disabled />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" htmlFor="designation">
                Designation
              </Label>
              <Input
                type="text"
                id="designation"
                placeholder="Enter Designation"
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Mobile Number
              </Label>
              <Input
                type="text"
                id="mobile"
                placeholder="Enter Mobile Number"
                value={state?.mobile}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Email Address
              </Label>
              <Input
                type="text"
                id="email"
                placeholder="Enter Email Address"
                value={state?.email}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12">
              <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
                Present Address
              </p>
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               Division
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Division"
                value={presentAddress?.division}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               District
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter District"
                value={presentAddress?.district}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               Upozila
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Upozila"
                value={presentAddress?.upozila}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              City/Municipality
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter City/Municipality"
                value={presentAddress?.cityCorporationOrMunicipality}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Union/Ward
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Union/Ward"
                value={presentAddress?.unionOrWard}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Post Office
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Union/Ward"
                value={presentAddress?.postOffice}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               Postal Code
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Postal Code"
                value={presentAddress?.postalCode}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Mouza/Moholla
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Mouza/Moholla"
                value={presentAddress?.additionalMouzaOrMoholla}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Village/Road
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Mouza/Moholla"
                value={presentAddress?.additionalVillageOrRoad}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              House/Holding No
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Mouza/Moholla"
                value={presentAddress?.homeOrHoldingNo}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12">
              <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
              Permanent Address
              </p>
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               Division
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Division"
                value={permanentAddress?.division}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               District
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter District"
                value={permanentAddress?.district}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               Upozila
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Upozila"
                value={permanentAddress?.upozila}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              City/Municipality
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter City/Municipality"
                value={permanentAddress?.cityCorporationOrMunicipality}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Union/Ward
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Union/Ward"
                value={permanentAddress?.unionOrWard}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Post Office
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Union/Ward"
                value={permanentAddress?.postOffice}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
               Postal Code
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Postal Code"
                value={presentAddress?.postalCode}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Mouza/Moholla
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Mouza/Moholla"
                value={permanentAddress?.additionalMouzaOrMoholla}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              Village/Road
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Mouza/Moholla"
                value={permanentAddress?.additionalVillageOrRoad}
                disabled
              />
            </Col>
            <Col className="mb-1" xl="4" md="4" sm="12">
              <Label className="form-label" for="basicInput">
              House/Holding No
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Mouza/Moholla"
                value={permanentAddress?.homeOrHoldingNo}
                disabled
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default ViewApplicant;  