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
  import { gruntfield, gpresentAddressData, parmanentAddressData } from "../../components/localjs/data";
  import TextBox from "../../components/TextBox"
  
  const ViewGuarantor = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [application, setApplication] = useState(location.state?.userinfo)
    const [state, setState] = useState(location.state?.userinfo)
    const [block, setBlock] = useState(false)
    const [permanentAddress, setPermanentAddress] = useState(location.state?.userinfo?.permanentAddress)
    const [presentAddress, setPresentAddress] = useState(location.state?.userinfo?.presentAddress)
    console.log("location", location.state)

    return (
      <UILoader blocking={block}>
      <Card>
        <CardHeader style={{marginBottom:"10px", borderBottom:"1px dashed gray"}}>
          <CardTitle tag="h4">Guarantor Information</CardTitle>
          <Button onClick={() => navigate(-1)} color="primary" className="btn-md" outline>Back to Guarantor List</Button>
          {/* <Button tag={Link} to="/pending-user" color="primary" className="btn-md" outline>Back to Applicant List</Button> */}
        </CardHeader>
  
        <CardBody>
        <form >
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
          <img src={`data:image/jpeg;base64,${state?.nidphoto}`} alt='nid photo' style={{width: 130, height: 160, border:"1px solid gray", borderRadius:"5px", padding:"5px"}} />
          </div>
        </Col>
        </Row>
          <Row>
          {gruntfield.map((v, k) => {
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
                    // ChangeHandler={(e) => handleChange(e)}
                    />
                    );
                  })}
            <Col className="mb-1" xl="12" md="12" sm="12">
              <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
                Present Address
              </p>
            </Col>
            {gpresentAddressData.map((v, k) => {
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
                    // ChangeHandler={(e) => handlePresentChange(e)}
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
                    // ChangeHandler={(e) => handlePermanentChange(e)}
                    />
                    );
                  })}
          </Row>
        </form>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default ViewGuarantor