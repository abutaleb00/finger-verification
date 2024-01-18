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
  import Select, { components } from "react-select"; // eslint-disable-line
  import Flatpickr from "react-flatpickr";
  import { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import toast from 'react-hot-toast'
  import moment from "moment";
  import axios from 'axios'
  import UILoader from '@components/ui-loader'
  import { v4 as uuidv4 } from 'uuid'
  
  const GuarantorEcData = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [picker, setPicker] = useState(new Date());
    const [state, setSate] = useState(location.state?.guarantor)
    const [loanee, setLoanee] = useState(location.state?.loanee)
    const [block, setBlock] = useState(false)
    const [nidPhoto, setNidPhoto] = useState(null)
    const [permanentAddress, setPermanentAddress] = useState(location.state?.guarantor?.permanentAddress)
    const [presentAddress, setPresentAddress] = useState(location.state?.guarantor?.presentAddress)
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
    ecjobid :location.state?.jobId,
    nidphoto: nidPhoto,
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
}
  const sendata2 = {
    loanapplication: {
        loan_no: loanee?.loan_no,
        createdBy: loanee?.createdBy,
        branchName: loanee?.branchName,
        status: loanee?.status,
        id: loanee?.id
    },
    loanee: loanee?.loanee,
    guarantors: [...loanee?.guarantors, sendata]
  }

    let gg = [loanee]
        let newObj = gg.map((item, index) => {
              return { ...item, guarantors: [...item?.guarantors, sendata ]};
          })
        let senddata = {} 
        // loop elements of the array 
        for(let i = 0; i < newObj.length; i++ ) {
            Object.assign(senddata, newObj[i]);
        }
  setBlock(true)
  axios.post('/addloan', sendata2).then(res => {
    if(res.data.result.error === false){
      setBlock(false)
      toast.success("Application Submit Succsfully")
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
    const getNidPhoto = () => {
      let sendData = {
        jobid: location.state?.jobId
      }
      setBlock(true)
       axios.post('/callECData', sendData).then(res => {
        if(res.data.result.error === false){
          setBlock(false)
          console.log("res.data.data", res.data.data)
          setNidPhoto(res.data.data?.photolink)
          // setData(res.data.data)
        } else if(res.data.result.error === true){
          setBlock(false)
          toast.error(res.data.result.errorMsg)
        }
       })
       .catch((err) =>{
        setBlock(false)
          toast.error(err.data.result.errorMsg)
       })
     }
  useEffect(()=>{
    getNidPhoto()
  },[])
    return (
      <UILoader blocking={block}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Personal Information</CardTitle>
        </CardHeader>
  
        <CardBody>
          <form onSubmit={createLoanApplication}>
          <Row>
        <Col className="mb-1" xl="9" md="9" sm="12" style={{display:"inline-block"}}>
        <Col className="mb-1" xl="6" md="6" sm="12" style={{display:"inline-block", paddingRight:"15px"}}>
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
          <Col className="mb-1" xl="6" md="6" sm="12" style={{display:"inline-block"}}>
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
          <Col className="mb-1" xl="6" md="6" sm="12" style={{display:"inline-block", paddingRight:"15px"}}>
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
          <Col className="mb-1 mr-2" xl="6" md="6" sm="12" style={{display:"inline-block"}}>
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
          <Col className="mb-1" xl="6" md="6" sm="12" style={{display:"inline-block", paddingRight:"15px"}}>
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
          <Col className="mb-1" xl="6" md="6" sm="12" style={{display:"inline-block"}}>
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
        </Col>
        <Col className="mb-1" xl="3" md="3" sm="12" style={{textAlign:"center"}}>
          <div style={{}}>
            <p style={{color:"black", fontWeight:"bold", marginBottom:"5px"}}>Guarantor Photo</p>
          {/* <img src={`data:image/jpeg;base64,${nidPhoto}`} alt='nid photo' style={{width: 130, height: 160, border:"1px solid gray", borderRadius:"5px", padding:"5px"}} /> */}
          <img src={state?.photo} alt='nid photo' style={{width: 130, height: 160, border:"1px solid gray", borderRadius:"5px", padding:"5px"}} />
          </div>
        </Col>
        </Row>
          <Row>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Gender
              </Label>
              <Select
                isClearable={false}
                defaultValue={genderOptions[0]}
                name="colors"
                options={genderOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(e) => setSate({...state, gender: e.value})}
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
                onChange={(e) => setSate({...state, spouse: e.target.value})}
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
                onChange={(e) => setSate({...state, occupation: e.target.value})} />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" htmlFor="designation">
                Designation
              </Label>
              <Input
                type="text"
                id="designation"
                placeholder="Enter Designation"
                onChange={(e) => setSate({...state, designation: e.target.value})}
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
                onChange={(e) => setSate({...state, mobile: e.target.value})}
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
                onChange={(e) => setSate({...state, email: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, division: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, district: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, upozila: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, cityCorporationOrMunicipality: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, unionOrWard: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, postOffice: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, postalCode: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, additionalMouzaOrMoholla: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, additionalVillageOrRoad: e.target.value})}
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
                onChange={(e) => setPresentAddress({...presentAddress, homeOrHoldingNo: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, division: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, district: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, upozila: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, cityCorporationOrMunicipality: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, unionOrWard: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, postOffice: e.target.value})}
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
                value={permanentAddress?.postalCode}
                onChange={(e) => setPresentAddress({...permanentAddress, postalCode: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, additionalMouzaOrMoholla: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, additionalVillageOrRoad: e.target.value})}
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
                onChange={(e) => setPermanentAddress({...permanentAddress, homeOrHoldingNo: e.target.value})}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="primary"
                // onClick={() => {
                //   localStorage.setItem("accountType", "5")
                //   window.location.href = "/nid-verify";
                // }}
              >
                Submit
              </Button>
              
            </Col>
          </Row>
          </form>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default GuarantorEcData;  