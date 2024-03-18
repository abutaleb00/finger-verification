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
  import React from 'react';
  import axios from 'axios'
  import { useState } from "react";
  import toast from 'react-hot-toast'
  import {useNavigate } from "react-router-dom";
  import UILoader from '@components/ui-loader'
  import useJwt from '@src/auth/jwt/useJwt'
  import { CheckCircle } from 'react-feather'

  const config = useJwt.jwtConfig
  const ChangePassword = (props) => {
    const navigate = useNavigate()
    const [block, setBlock] = useState(false)
    const [state, setSate] = useState({
      currentPassword: "",
      newPasswordSt: "",
      confirmedPasswordSt: ""
    })
    const UpdatePassword = (e) => {
        e.preventDefault()
        setBlock(true)
         axios.put('/user-list/change-password', state).then(res => {
            if(res.data?.result?.error === false){
                setBlock(false)
                toast.success('Password change Successfully!')
                logoutapicall()
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
       const logoutapicall = () =>{
      
        axios.delete('/oauth/revoke').then(res => {
          if(res.data.result.error === false){
            console.log("res.data", res.data)
            localStorage.removeItem('userData')
            localStorage.removeItem('individual')
          localStorage.removeItem('company')
          localStorage.removeItem('type')
          localStorage.removeItem(config.storageTokenKeyName)
          localStorage.removeItem(config.storageRefreshTokenKeyName)
            navigate('/login')
            
          } else if(res.data?.result.error === true){
            setBlock(false)
            toast.error(res.data.result.errorMsg)
          }
         })
         .catch(err => {
            toast.error(err.data.result.errorMsg)
         })
    
      }
    return (
        <UILoader blocking={block}>
      <Card>
        <CardHeader style={{borderBottom:"1px solid gray", paddingBottom:"10px"}}>
          <CardTitle tag="h4" >Change Password</CardTitle>
        </CardHeader>
  
        <CardBody>
            <form onSubmit={UpdatePassword}>
            <div>
          <Row>
          <Col className="mb-1 mt-3 pl-5" xl="8" md="8" sm="12">
          <p style={{color:"black", fontSize:"16px"}}>
              {" "}
              In order to <b>protect your account,</b> make sure your password:
            </p>
            <p>
            <CheckCircle color="green" size={14} /> At least 8 characters
            </p>
            <p>
            <CheckCircle color="green" size={14} /> At least 1 letters
            </p>
            <p>
            <CheckCircle color="green" size={14} /> At Least 1 digits
            </p>
            <p>
            <CheckCircle color="green" size={14} /> Must not contain database name
            </p>
            <p>
            <CheckCircle color="green" size={14} /> Must not contain user name or
              reverse user name
            </p>
            <p>
            <CheckCircle color="green" size={14} /> Must not contain oracle
            </p>
            <p>
            <CheckCircle color="green" size={14} /> Must not be too simple like
              welcome1
            </p>
            <p>
            <CheckCircle color="green" size={14} /> Password must differ by at
              least 3 characters from the old password
            </p>
          </Col>
          <Col className="mb-1 mt-3" xl="4" md="4" sm="12">
            <Col className="mb-1" xl="12" md="12" sm="12">
              <Label className="form-label required-field" htmlFor="currentPassword">
              Current Password
              </Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter Current Password"
                required
                onChange={(e) => setSate({...state, currentPassword: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12">
              <Label className="form-label required-field" htmlFor="newPasswordSt">
              New Password
              </Label>
              <Input
                type="password"
                id="newPasswordSt"
                name="newPasswordSt"
                placeholder="Enter New Password"
                required
                onChange={(e) => setSate({...state, newPasswordSt: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12">
              <Label className="form-label required-field" htmlFor="confirmedPasswordSt">
              Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmedPasswordSt"
                name="confirmedPasswordSt"
                placeholder="Enter Confirm Password"
                required
                onChange={(e) => setSate({...state, confirmedPasswordSt: e.target.value})}
              />
            </Col>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="primary"
              >
                Submit
              </Button>
            </Col>
            </Col>
          </Row>
          </div>
          </form>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default ChangePassword;