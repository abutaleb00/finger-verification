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
  import { useLocation, Link, useNavigate } from "react-router-dom";
  import UILoader from '@components/ui-loader'

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
  const UpdateUser = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [picker, setPicker] = useState(new Date());
    const [block, setBlock] = useState(false)
    const [state, setSate] = useState(location?.state?.userinfo)
    const [branchOption, setBranchOption] = useState([])

    const roleOptions = [
        {value: null, label: "Select Role"},
        {value: "admin", label: "Admin"},
        {value: 'maker', label: "Maker"},
        {value: 'checker', label: "Checker"},
    ];
    const branchOptions = [
      { value: "Main Branch", label: "Main Branch" },
      { value: "Gulshan Granch", label: "Gulshan Granch"},
      { value: "Uttara Branch", label: "Uttara Branch" },
    ];
    console.log("props", location?.state?.userinfo)

    const userUpdate = (e) => {
      e.preventDefault()
      const datetosend = {
        userId: state?.id,
        email: state?.email,
        phoneNo: state?.mobile,
        branchName: state?.branchName,
        fullName: state?.fullName,
        branchId: state?.branchId


      }
      setBlock(true)
       axios.put('/updateuserinfo', datetosend)
       .then(res => {
        setBlock(false)
        toast.success('User Info Update Successfully')
        navigate('/admin/user-list')
        // setData(res.data.data)
        console.log("res.data", res.data)
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
     useEffect(()=>{
      getBranchList()
    },[])
    return (
        <UILoader blocking={block}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Update User Information</CardTitle>
          <Button tag={Link} to="/admin/user-list" color="primary" className="btn-sm" >Back to User List</Button>
        </CardHeader>
  
        <CardBody>
            <form onSubmit={userUpdate}>
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
                // onChange={(e) => setSate({...state, username: e.target.value})}
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
              <Label className="form-label" htmlFor="phoneNo">
              Phone Number
              </Label>
              <Input
                type="number"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter phone number"
                required
                value={state?.mobile}
                onChange={(e) => setSate({...state, mobile: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Branch Name
              </Label>
              <Select
                isClearable={false}
                name="branch"
                options={branchOption}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                value = { branchOption?.filter(option => option.value === state?.branchId)}
                onChange={(e) => setSate({...state, branchName: e.label, branchId: e.value})}
                maxMenuHeight={140}  
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Role Name
              </Label>
              <Select
                isClearable={false}
                defaultValue={roleOptions[0]}
                name="roleName"
                styles={styles}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                value = { roleOptions?.filter(option => option.value === state?.roleName)}
                // onChange={(e) => setSate({...state, roleName: e.value})}
                isDisabled
                maxMenuHeight={140}  
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="primary"
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