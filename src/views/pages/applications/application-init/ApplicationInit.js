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
  import { useState, useEffect } from "react";
  import Select from "react-select";
  import toast from 'react-hot-toast'
  import { useLocation, useNavigate, Link } from "react-router-dom";
  import UILoader from '@components/ui-loader'
  import { v4 as uuidv4 } from 'uuid'
  import CompanyProfile from "../../CompanyProfile";
  import { getUserData } from '@utils'

  const ApplicationInit = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = getUserData()
    const [block, setBlock] = useState(false)
    const [userinfo, setUserinfo] = useState(null)
    const [state, setState] = useState({
        applicantInfo:"",
        name:"",
        fatherName:"",
        applicantMobile:""
    })
    const [accountType, setAccountType] = useState("0")
    const accountOption = [
        { value: "0", label: "Select Borrower" },
        { value: "1", label: "Individual" },
        { value: "2", label: "Enterprise" },
      ];
    const loanInitApi = (e) => {
        const sentdata = {
            loanapplication: {
                loan_no: uuidv4().substring(0,13),
                branchName: null,
                applicantInfo: state?.applicantInfo,
                applicantName: state?.name,
                applicantFatherName: state?.fatherName,
                applicantMobile: state?.applicantMobile,
                status: 4
            },
            loanee: null,
            guarantors: [],
            coBorrowers: []
        }
        e.preventDefault()
        setBlock(true)
         axios.post('/addloan', sentdata).then(res => {
            if(res.data?.result?.error === false){
                setBlock(false)
                toast.success('Successfully Created!')
                setUserinfo(res.data)
                // localStorage.setItem("individual", JSON.stringify(res.data?.data))
                // localStorage.setItem("type", 1)
                navigate('/nid-verify',{state:{userData: res.data?.data, type: 1}})
                // console.log("res", res)
                // document.getElementById("button2").click()
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
       useEffect(()=> {
        if(user?.passwordChange === false){
          navigate('/user/change-password')
        }
      }, [])
    return (
        <UILoader blocking={block}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">New Application</CardTitle>
        </CardHeader>
  
        <CardBody>
        {accountType === "3" || accountType === "4" || accountType === "5" ? "" :
          <Row style={{marginBottom:"10px"}}>
          <Col
            sm={{
              offset: 4,
              order: 2,
              size: 4,
            }}
              >
              <Label className="form-label" for="basicInput">
              Borrower Type
              </Label>
              <Select
                isClearable={false}
                defaultValue={accountOption[0]}
                name="accountOption"
                options={accountOption}
                className="react-select"
                classNamePrefix="select"
                onChange={(e) => {
                    setAccountType(e.value)
                  // localStorage.setItem("accountType", e.value)
                }}
              />
            </Col>
          </Row>
          }
          {accountType === "1" ?
            <form onSubmit={loanInitApi}>
            <div>
          <Row style={{marginBottom:"20px", marginTop:"30px", paddingTop:"25px", borderTop:"1px dashed gray"}}>
            <Col className="mb-1" xl="12" md="12" sm="12">
              <Label className="form-label required-field" htmlFor="applicantInfo">
              Borrower Info
              </Label>
              <Input
                type="text"
                id="applicantInfo"
                name="applicantInfo"
                placeholder="Enter Borrower Info"
                required
                onChange={(e) => setState({...state, applicantInfo: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label required-field" htmlFor="Name">
              Name
              </Label>
              <Input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter Name"
                required
                onChange={(e) => setState({...state, name: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label required-field" htmlFor="fatherName">
              Father Name
              </Label>
              <Input
                type="text"
                id="fatherName"
                name="fatherName"
                placeholder="Enter father name"
                required
                onChange={(e) => setState({...state, fatherName: e.target.value})}
              />
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="form-label required-field" htmlFor="applicantMobile">
              Mobile Number
              </Label>
              <Input
                type="number"
                id="applicantMobile"
                name="applicantMobile"
                placeholder="Enter mobile number"
                required
                onChange={(e) => setState({...state, applicantMobile: e.target.value})}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="success"
              >
                Submit
              </Button>
            </Col>
          </Row>
          </div>
          </form>
          : ""
          }
          {accountType === "2" && <CompanyProfile />}
          <Link
            id='button2'
            style={{display:"none"}}
            to="/nid-verify"
            state={{ userinfo: userinfo }}
            >
             redirect
            </Link>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default ApplicationInit; 