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
import { useLocation, useNavigate, Link } from "react-router-dom";
import UILoader from '@components/ui-loader'
const UpdateUser = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [picker, setPicker] = useState(new Date());
  const [block, setBlock] = useState(false)
  const [state, setSate] = useState(location?.state?.userinfo)
  const [branchOptions, setBranchOptions] = useState([])
  const userCreate = (e) => {
    let senddata = {...state, passwordSt: null}
      e.preventDefault()
      setBlock(true)
       axios.post('/updateuser', senddata).then(res => {
          if(res.data?.result?.error === false){
              setBlock(false)
              toast.success('Update Successfully!')
              navigate('/user-list')
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
     const getBranchList = () => {
      setBlock(true)
       axios.post('/getbranches?first=0&limit=200').then(res => {
        if(res.data.result.error === false){
          setBlock(false)
          const branchOption = res.data?.data?.content?.map(
            (item) => {
              return { value: item.id, label: item.name }
            }
          )
          setBranchOptions([{ value: null, label: 'Select Branch'},...branchOption])
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
  const roleOptions = [
      {value: null, label: "Select Role"},
      {value: "admin", label: "Admin"},
      {value: 'maker', label: "Maker"},
      {value: 'checker', label: "Checker"},
      {value: 'user', label: "User"},
  ];
  const statusOptions = [
    {value: false, label: "Active"},
    {value: true, label: "Inactive"},
];
const employeeOptions = [
    {value: null, label: "Select Type"},
    {value: 1, label: "Permanent"},
    {value: 2, label: "Contractual"},
];
  useEffect(()=>{
    getBranchList()
  },[])
  console.log("props", location?.state?.userinfo)
  return (
      <UILoader blocking={block}>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Update User Information</CardTitle>
        <Button tag={Link} to="/user-list" color="primary" className="btn-sm" >Back to User List</Button>
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
              value={state?.username}
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
              value={state?.fullName}
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
              value={state?.email}
              onChange={(e) => setSate({...state, email: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" htmlFor="email">
            Phone Number
            </Label>
            <Input
              type="mobile"
              id="mobile"
              name="mobile"
              placeholder="Enter mobile"
              required
              value={state?.mobile}
              onChange={(e) => setSate({...state, mobile: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label required-field" for="basicInput">
              Employee Type
            </Label>
            <Select
              isClearable={false}
              defaultValue={employeeOptions[0]}
              name="colors"
              options={employeeOptions}
              className="react-select"
              classNamePrefix="select"
              value = { employeeOptions?.filter(option => option.value === state?.employeeType)}
              onChange={(e) => setSate({...state, employeeType: e.value, employeeTypeRef: e.label})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" htmlFor="mobile">
           Designation
            </Label>
            <Input
              type="text"
              id="Designation"
              name="Designation"
              placeholder="Enter Designation"
              value={state?.employeeDesignation}
              onChange={(e) => setSate({...state, employeeDesignation: e.target.value})}
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
              value = { branchOptions?.filter(option => option.value === Number(state?.branchId))}
              onChange={(e) => setSate({...state, branchId: e.value,  branchName: e.label})}
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
              value = { roleOptions?.filter(option => option.value === state?.roleName)}
              onChange={(e) => setSate({...state, roleName: e.value, roles: [e.value]})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label required-field" for="basicInput">
              Status
            </Label>
            <Select
              isClearable={false}
              defaultValue={statusOptions[0]}
              name="colors"
              options={statusOptions}
              className="react-select"
              classNamePrefix="select"
              value = { statusOptions?.filter(option => option.value === state?.isLocked)}
              onChange={(e) => setSate({...state, isLocked: e.value})}
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="submit"
              color="success"
            >
              Update
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
export default UpdateUser; 