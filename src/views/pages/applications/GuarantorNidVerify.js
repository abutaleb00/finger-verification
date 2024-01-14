import React, { Component } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
  } from "reactstrap";
  import { useLocation, Link } from 'react-router-dom'
import "flatpickr/dist/themes/airbnb.css";
  // ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import Flatpickr from "react-flatpickr";
import Select from "react-select"; 
import CompanyProfile from "../CompanyProfile";
import CompanyProfileProcess from "../CompanyProfileProcess";
import GuarantorsProfile from "../GuarantorsProfile";
import finger from "@src/assets/images/pages/fingerprint.svg";
import Swal from 'sweetalert2'
import moment from "moment";
import axios from 'axios'
import UILoader from '@components/ui-loader'
import toast from 'react-hot-toast'
  
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
export default class GuarantorNidVerify extends Component {
    constructor(props) {
        super(props);
        window.fingerComponent = this;
        //let nidPics = this.props.history.location.state.nidPics;
        this.state = {
        ...props?.location?.state,
          accountType: localStorage.getItem("accountType") !== undefined ? localStorage.getItem("accountType") : "0",
          dob: "1990-07-10",
          nid: "",
          colorButton: "red",
          loaderShow: false,
          swalProps: {},
          ecresult: [],
          block: false,
          loanee : JSON.parse(localStorage.getItem('lonee'))
        };
      }

    successAlert = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No fingerprint match found',
          })
    }
 callECServer = () => {
 const datatosend = {
    nationalId: this.state.nid,
    dateOfBirth: moment(this.state.dob).format("DD/MM/YYYY")
  }
  this.setState({block: true} , () =>{
    axios.post('/getvoter', datatosend).then(res => {
      if(res.data.result.error === false){
        this.setState({block: false, ecresult: res.data.data}, () =>{

          document.getElementById("button2").click()
          console.log("res.data.data", res.data.data)
        })
      } else if(res.data.result.error === true){
        this.setState({block: false})
        toast.error(res.data.result.errorMsg)
      }
     })
     .catch(err => {
      this.setState({block: false})
        toast.error(err.data.result.errorMsg)
     })
  })
      
     }
    dataLoader = () => {
      let timerInterval
      Swal.fire({
        title: 'Data Processing!',
        html: 'Fingerprint data matching......',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            // document.getElementById("button2").click();
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      })
    }
    dataAlert = () => {
      let timerInterval
      Swal.fire({
        title: 'Data Processing!',
        html: 'Fingerprint data matching......',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            // document.getElementById("button2").click();
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          if(this.state.ecresult?.length > 0){
            callECServer()
            document.getElementById("button2").click();
            console.log("this.state.ecresult", this.state.ecresult)
          } else{
            console.log("this.state.ecresult 2", this.state.ecresult)
            this.successAlert() 
          }
        }
      })
    }
    receiveFingerData = (data) => {
      console.log(data);
    //  if( data?.extraData?.colorButton === "green"){
    //   this.dataAlert()
    //  }
      this.setState({ ...data });
    };
    errorAlert = () => {
        Swal.fire({
            icon: 'error',
            text: 'Please input NID & Date of Birth',
          })
    }
  render() {
    console.log("color", this.state)
    console.log("props", this.props)
    const accountOption = [
        { value: "0", label: "Select Borrower" },
        { value: "1", label: "Individual" },
        { value: "2", label: "Corporate" },
      ];
    return (
      <UILoader blocking={this.state.block}>
        <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Fingerprint Verification</CardTitle>
        </CardHeader>
        <CardBody className="my-2 py-50">
          {this.state.accountType === "3" || this.state.accountType === "4" || this.state.accountType === "5" ? "" :
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
                  this.setState({accountType: e.value})
                  localStorage.setItem("accountType", e.value)
                }}
              />
            </Col>
          </Row>
          }
           {this.state.accountType === "3" || this.state.accountType ==="4" || this.state.accountType ==="5" ? <CompanyProfileProcess /> : ""}
           {this.state.accountType === "5" &&  <GuarantorsProfile />}
          {this.state.accountType === "1" || this.state.accountType === "4" ?
          <Form>
            <hr />
            <Row>
            <Col md="8" className="mb-1">
              <Col md="12" className="mb-1">
                <Label className="form-label" for="companyName">
                  NID Number
                </Label>
                <Input
                    placeholder="Enter NID Number"
                    value={this.state.nid}
                    onChange={(e) => this.setState({nid: e.target.value})}
                />
              </Col>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="country">
                  Date of Birth
                </Label>
                <Flatpickr
                  className="form-control"
                  defaultValue={moment(this.state.dob).format("YYYY-MM-DD")}
                  // value={moment(this.state.dob).format("YYYY-MM-DD")}
                  onChange={(date) => this.setState({dob: date[0]})}
                  id="default-picker"
                />
              </Col>
              </Col>
              <Col
                sm={{
                  offset: 1,
                  order: 2,
                  size: 2,
                }}
                style={{ textAlign: "center", marginTop: "15px" }}
              >
                <Button
                    type="reset"
                    // color="warning"
                    color={
                        this.state.colorButton === "red"
                        ? "warning"
                        : "success"
                    }
                    outline
                    onClick={() => {
                      if(this.state.nid !== '') {
                        return window.captureFinger(
                          this,
                          "hfFingerData",
                          this.state
                        )
                      } else {
                        this.errorAlert()
                      }
                      }}
                    >
                    <img
                        className="icon-only"
                        width={80}
                        src={finger}
                        alt="Fingerprint"
                    />
                </Button>
              </Col>
              <Col
                sm={{
                  offset: 4,
                  order: 2,
                  size: 3,
                }}
                style={{ textAlign: "center", marginTop: "15px" }}
              >
                    <Button
                    // style={{display:"none"}}
                     id='button1'
                     color='primary'
                     onClick={() => {
                      let dataToSend = {
                        dateOfBirth: this.state.dob,
                        fingerEnums: [
                          "RIGHT_THUMB",
                          "RIGHT_INDEX",
                          "LEFT_THUMB",
                          "LEFT_INDEX",
                        ],
                        listoffingers: this.state.listoffingers,
                        mobileNumber:
                          this.state.mobileNumber === undefined ||
                          this.state.mobileNumber === null
                            ? ""
                            : this.state.mobileNumber,
                      };
                      dataToSend[
                        this.state.nid.length === 17
                          ? "nid17Digit"
                          : "nid10Digit"
                      ] = this.state.nid;

                      //console.log("datato send ", ecData.data.success.data);
                      this.setState({block: true}, ()=>{
                        axios
                        .post("/makethefulleccall", dataToSend)
                        .then((res) => {
                          if (res.data.result.error === false) {
                            this.setState(
                              {
                                block: true,
                                loaderText: "Processing.....",
                              },
                              () => {
                                setTimeout(() => {
                                  let dataSend = {
                                    ...res.data.data,
                                  };
                                  axios
                                    .post("/callECVerify", dataSend)
                                    .then((res) => {
                                      if (res.data.result.error === false) {
                                        this.setState(
                                          {block: false, ecresult: res.data?.data?.verificationResponse?.voterInfo, loaderText: res.data.data.result, jobId: res.data?.data?.jobId },
                                          () => {
                                            if (
                                              this.state.loaderText ===
                                              "MATCH FOUND"
                                            ) {
                                              document.getElementById("button2").click()
                                            } else if (
                                              this.state.loaderText ===
                                              "NO MATCH FOUND"
                                            ) {
                                              toast.error('NO MATCH FOUND')
                                              setTimeout(() => {
                                                this.loaderHide();
                                              }, 1000);
                                            }
                                          }
                                        );
                                      } else {
                                        this.setState(
                                          {
                                            loaderText: res.data.result.errMsg,
                                            block: false,
                                          },
                                          () => {
                                            toast.error(res.data.result.errMsg)
                                          }
                                        );
                                      }
                                    });
                                }, 2000);
                              }
                            );
                          } else if (res.data.result.error === true){
                            this.setState({block: false}, ()=>{
                              toast.error(res.data.result.errorMsg)
                            })
                          }
                        });                     
                      })

                    }}
                    //  onClick={(e) => {
                    //   this.callECServer()
                      //   const ecresult = data.filter((obj) => obj.nationalId === this.state.nid);
                      //  if(ecresult?.length > 0){
                      //   this.setState({ecresult: ecresult}, ()=>{
                      //     // document.getElementById("button2").click();
                      //     this.dataAlert()
                      //   })
                      //  } else {
                      //   this.dataAlert()
                      //   // this.successAlert()
                      //  }
                    // }}
                    disabled={this.state.nid === ''}
                        >
                        Submit
                    </Button>
                    <Link
                    id='button2'
                    style={{display:"none"}}
                      to={`/guarantor-ec-data`}
                      state={{ guarantor: this.state.ecresult, loanee: this.state.loanee, jobId: this.state.jobId }}
                  >
                      redirect
                  </Link>
              </Col>
            </Row>
          </Form>
          : ""
          }
          {this.state.accountType === "2" &&  <CompanyProfile />}
        </CardBody>
      </Card>
      </UILoader>
    )
  }
}
