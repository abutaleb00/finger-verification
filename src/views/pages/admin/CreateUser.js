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
  import axios from 'axios'
  import Select, { components } from "react-select"; // eslint-disable-line
  import { useState } from "react";
  import toast from 'react-hot-toast'
  import { useLocation, Link } from "react-router-dom";
  import UILoader from '@components/ui-loader'
  const CreateUser = (props) => {
    const location = useLocation()
    const [picker, setPicker] = useState(new Date());
    const [block, setBlock] = useState(false)
    const [state, setSate] = useState({
        username: "",
        roleName: "",
        email: "",
        phoneNo: "",
        branchName: "",
        branchId: "1",
        userType: 1,
        ownBankLimit: 1000000,
        rtgsLimit: 500000,
        bachLimit: 200000,
        fullName: "",
        cbsCustId: "CUST122",
        isLocked: false,
        roles: [
            "Admin",
            "Checker"
        ],
        pages: [
            {
                name: "Dashboard",
                permissions: [
                    "view",
                    "read"
                ]
            },
            {
                name: "FingerPrintVerify",
                permissions: [
                    "read",
                    "write"
                ]
            }
        ]
    })
    const userCreate = (e) => {
        e.preventDefault()
        setBlock(true)
         axios.post('/register', state).then(res => {
            if(res.data?.result?.error === false){
                setBlock(false)
                toast.success('Successfully Created!')
                window.location.href = "/admin/user-list";
            } else if(res.data?.result?.error === true) {
                setBlock(false)
                toast.error(res.data.result.errorMsg)
            }
         })
         .catch(err => {
            setBlock(false)
            toast.error(err.data?.result?.errorMsg)
         })
       }
    const roleOptions = [
        {value: null, label: "Select Role"},
        {value: "Admin", label: "Admin"},
        {value: 'Maker', label: "Maker"},
        {value: 'Checker', label: "Checker"},
    ];
    const branchOptions = [
      { value: "Main Branch", label: "Main Branch" },
      { value: "Gulshan Granch", label: "Gulshan Granch"},
      { value: "Uttara Branch", label: "Uttara Branch" },
    ];
    console.log("props", location.state)
    return (
        <UILoader blocking={block}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" >Account Information</CardTitle>
          <Button tag={Link} to="/admin/user-list" color="primary" className="btn-sm" >Back to User List</Button>
        </CardHeader>
  
        <CardBody>
            <form onSubmit={userCreate}>
            <div>
          <Row>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label required-field" htmlFor="username">
              Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                required
                onChange={(e) => setSate({...state, username: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label required-field" htmlFor="fullName">
              Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                required
                onChange={(e) => setSate({...state, fullName: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" htmlFor="email">
              Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                required
                onChange={(e) => setSate({...state, email: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" htmlFor="phoneNo">
              Phone Number
              </Label>
              <Input
                type="number"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter phone number"
                required
                onChange={(e) => setSate({...state, phoneNo: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Branch Name
              </Label>
              <Select
                isClearable={false}
                defaultValue={branchOptions[0]}
                name="colors"
                options={branchOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(e) => setSate({...state, branchName: e.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Role
              </Label>
              <Select
                isClearable={false}
                defaultValue={roleOptions[0]}
                name="colors"
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(e) => setSate({...state, roleName: e.value})}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="primary"
              >
                Submit
              </Button>
            </Col>
          </Row>
          </div>
          </form>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default CreateUser;  