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
  import { nidfield, presentAddressData, parmanentAddressData } from "../../components/localjs/data2";
  import TextBox from "../../components/TextBox"
  
  const CreateEcUser = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [state, setState] = useState([])
    const [block, setBlock] = useState(false)
    const [permanentAddress, setPermanentAddress] = useState([])
    const [presentAddress, setPresentAddress] = useState([])
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
        name: state?.name,
        nameEn: state?.nameEn,
        bloodGroup: state?.bloodGroup,
        dateOfBirth: state?.dateOfBirth,
        father: state?.father,
        mother: state?.mother,
        spouse: state?.spouse,
        nationalId: state?.nationalId,
        occupation: state?.occupation,
        permanentAddress: permanentAddress,
        presentAddress: presentAddress
  }
  setBlock(true)
  axios.post('/addvoter', sendata).then(res => {
    if(res.data.result.error === false){
      setBlock(false)
      toast.success("Application Update Succsfully")
      navigate('/admin/ec-data')
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
          <Button tag={Link} to="/admin/ec-data" color="primary" className="btn-md" outline>Back to User List</Button>
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
  export default CreateEcUser