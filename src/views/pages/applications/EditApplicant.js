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
  import { useState } from "react";
  import { useLocation, Link, useNavigate } from "react-router-dom";
  import toast from 'react-hot-toast'
  import axios from 'axios'
  import UILoader from '@components/ui-loader'
  import Select, { components } from "react-select";
  import SelectRequired from "../../components/SelectRequired";
  import { v4 as uuidv4 } from 'uuid'
  import { nidfield, presentAddressData, parmanentAddressData } from "../../components/localjs/data";
  import TextBox from "../../components/TextBox"
  const styles = {
    control: base => ({
      ...base,
      fontFamily: "Times New Roman"
    }),
    menu: base => ({
      ...base,
      fontSize: 11,
      lineHeight: 1
    })
  }
  const Selects = props => (
    <SelectRequired
      {...props}
      SelectComponent={Select}
      options={props.options || options}
    />
  )
  const EditApplicant = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [application, setApplication] = useState(location.state?.userinfo)
    const [state, setState] = useState(location.state?.userinfo?.loanee)
    const [block, setBlock] = useState(false)
    const [branchOption, setBranchOption] = useState([])
    const [branchName, setBranchName] = useState(location.state?.userinfo?.branchName)
    const [permanentAddress, setPermanentAddress] = useState(location.state?.userinfo?.loanee?.permanentAddress)
    const [presentAddress, setPresentAddress] = useState(location.state?.userinfo?.loanee?.presentAddress)
    console.log("location", location.state)

   const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
      }
   const handlePresentChange = (e) => {
    setPresentAddress({ ...presentAddress, [e.target.name]: e.target.value })
      }
   const handlePermanentChange = (e) => {
    setPermanentAddress({ ...permanentAddress, [e.target.name]: e.target.value })
      }
    const updateLoanApplication = (e) =>{
  e.preventDefault()
  const sendata = {
    loanapplication: {
        loan_no: application?.loan_no,
        createdBy: application?.createdBy,
        branchName: branchName,
        status: application?.status,
        id: application?.id
    },
    companyProfile: location.state?.type === 2 ? application?.companyProfile : null,
    loanee: {
        ecjobid: state?.ecjobid,
        nidphoto: state?.nidphoto,
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
    guarantors: application?.guarantors,
    coBorrowers: [...application?.coBorrowers]
  }
  setBlock(true)
  axios.put('/updateloanee', sendata).then(res => {
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
    useEffect(()=>{
      getBranchList()
    },[])
    const getBranchList = () => {
      setBlock(true)
       axios.post('/getbranches?first=0&limit=200').then(res => {
        if(res.data.result.error === false){
          setBlock(false)
          const branchOption = res.data?.data?.content?.map(
            (item) => {
              return { value: item.name, label: item.name }
            }
          )
          setBranchOption([{ value: null, label: 'Select Branch'},...branchOption])
          console.log("res.data.data", res.data.data)
          // setNidPhoto(res.data.data?.photolink)
          // setData(res.data.data)
        } else  if(res.data.result.error === false){
          setBlock(false)
          toast.error(res.data.result.errorMsg)
        }
       })
       .catch((err) =>{
        setBlock(false)
          toast.error(err.data.result.errorMsg)
       })
}
    return (
      <UILoader blocking={block}>
      <Card>
        <CardHeader style={{marginBottom:"10px", borderBottom:"1px dashed gray"}}>
          <CardTitle tag="h4">Update Applicant Information</CardTitle>
          <Button onClick={() => navigate(-1)} color="primary" className="btn-md" outline>Back to Applicant List</Button>
          {/* <Button tag={Link} to="/pending-user" color="primary" className="btn-md" outline>Back to Applicant List</Button> */}
        </CardHeader>
  
        <CardBody>
        <form onSubmit={updateLoanApplication}>
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
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Branch Name <span style={{color:"red"}}>*</span>
            </Label>
            <Selects
              className='react-select'
              styles={styles}
              options={branchOption}
              placeholder="Select Branch"
              value={branchOption?.filter((v) => v.value === branchName)}
              onChange={(e) => setBranchName(e.value)}
              maxMenuHeight={140}
              isSearchable
              required 
              />
          </Col>
        </Col>
        <Col className="mb-1" xl="3" md="3" sm="12" style={{textAlign:"center"}}>
          <div style={{}}>
            <p style={{color:"black", fontWeight:"bold", marginBottom:"5px"}}>Applicant Photo</p>
          <img src={`data:image/jpeg;base64,${state?.nidphoto}`} alt='nid photo' style={{width: 130, height: 160, border:"1px solid gray", borderRadius:"5px", padding:"5px"}} />
          </div>
        </Col>
        </Row>
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
                    // val={presentAddress[v.id] !== undefined && presentAddress[v.id] !== null ? presentAddress[v.id] : "" }
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