import React, { Component, useEffect, useState } from "react";
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
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import finger from "@src/assets/images/pages/fingerprint.svg";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import UILoader from "@components/ui-loader";
import toast from "react-hot-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
const BorrowerNidVerify = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    // ...location?.state?.userinfo,
    accountType: 1,
    dob: "1990-07-10",
    nid: "",
    colorButton: "red",
    loaderShow: false,
    swalProps: {},
    ecresult: [],
    block: false,
  });
console.log("location", location)
  let receiveFingerData = (data) => {
    console.log(data);
    //  if( data?.extraData?.colorButton === "green"){
    //   dataAlert()
    //  }
    setState({ ...state, ...data });
  };
  window.receiveFingerData = receiveFingerData;
  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Please input NID & Date of Birth",
    });
  };
  const accountOption = [
    { value: "0", label: "Select Type" },
    { value: "1", label: "Borrower" },
    { value: "2", label: "Co-borrower" },
    { value: "3", label: "Guarantor" },
  ];
  return (
    <UILoader blocking={state.block}>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Fingerprint Verification</CardTitle>
        </CardHeader>
        <CardBody className="my-2 py-50">
          <Row style={{ marginBottom: "10px" }}>
            <Col
              sm={{
                offset: 4,
                order: 2,
                size: 4,
              }}
            >
              <Label className="form-label" for="basicInput">
                Finger Verification
              </Label>
              <Select
                isClearable={false}
                defaultValue={accountOption[0]}
                name="accountOption"
                options={accountOption}
                className="react-select"
                classNamePrefix="select"
                value={accountOption?.filter((v) => v.value === "1")}
                onChange={(e) => {
                  setState({ ...state, accountType: e.value });
                  // localStorage.setItem("accountType", e.value)
                }}
                isDisabled
              />
            </Col>
          </Row>
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
                    value={state.nid}
                    onChange={(e) =>
                      setState({ ...state, nid: e.target.value })
                    }
                  />
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="country">
                    Date of Birth
                  </Label>
                  <Flatpickr
                    className="form-control"
                    defaultValue={moment(state.dob).format("YYYY-MM-DD")}
                    // value={moment(state.dob).format("YYYY-MM-DD")}
                    onChange={(date) => setState({ ...state, dob: date[0] })}
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
                  color={state.colorButton === "red" ? "warning" : "success"}
                  outline
                  onClick={() => {
                    if (state.nid !== "") {
                      return window.captureFinger(this, "hfFingerData", state);
                    } else {
                      errorAlert();
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
                  id="button1"
                  color="primary"
                  onClick={() => {
                    console.log("clicked");
                    let dataToSend = {
                      dateOfBirth: state.dob,
                      fingerEnums: [
                        "RIGHT_THUMB",
                        "RIGHT_INDEX",
                        "LEFT_THUMB",
                        "LEFT_INDEX",
                      ],
                      listoffingers: state.listoffingers,
                      mobileNumber:
                        state.mobileNumber === undefined ||
                        state.mobileNumber === null
                          ? ""
                          : state.mobileNumber,
                    };
                    dataToSend[
                      state.nid.length === 17 ? "nid17Digit" : "nid10Digit"
                    ] = state.nid;

                    //console.log("datato send ", ecData.data.success.data);
                    setState({ block: true });
                    console.log("api end");
                    axios.post("/makethefulleccall", dataToSend).then((res) => {
                      if (res.data.result.error === false) {
                        setState({
                          ...state,
                          block: true,
                          loaderText: "Processing.....",
                        });
                        setTimeout(() => {
                          let dataSend = {
                            ...res.data.data,
                          };
                          axios.post("/callECVerify", dataSend).then((res) => {
                            if (res.data.result.error === false) {
                              setState({
                                ...state,
                                block: false,
                                ecresult:
                                  res.data?.data?.verificationResponse
                                    ?.voterInfo,
                                loaderText: res.data.data.result,
                                jobId: res.data?.data?.jobId,
                              });
                              if (res.data.data.result === "MATCH FOUND") {
                                navigate("/borrower-ec-data", {
                                  state: {
                                    userinfo: res.data?.data?.verificationResponse?.voterInfo,
                                    jobId: res.data?.data?.jobId,
                                    broweerType: Number(state.accountType),
                                    preUserdata: location?.state?.userData,
                                    type: location?.state?.type
                                  },
                                });
                                // document.getElementById("button2").click();
                              } else if (
                                state.loaderText === "NO MATCH FOUND"
                              ) {
                                toast.error("NO MATCH FOUND");
                                setTimeout(() => {
                                  loaderHide();
                                }, 1000);
                              }
                            } else {
                              setState({
                                ...state,
                                loaderText: res.data.result.errMsg,
                                block: false,
                              });
                              toast.error(res.data.result.errMsg);
                            }
                          });
                        }, 2000);
                      } else if (res.data.result.error === true) {
                        setState({ ...state, block: false });
                        toast.error(res.data.result.errorMsg);
                      }
                    });
                  }}
                  //  onClick={(e) => {
                  //   callECServer()
                  //     const ecresult = data.filter((obj) => obj.nationalId === state.nid);
                  //    if(ecresult?.length > 0){
                  //     setState({ecresult: ecresult}, ()=> {
                  //       // document.getElementById("button2").click();
                  //       dataAlert()
                  //     })
                  //    } else {
                  //     dataAlert()
                  //     // successAlert()
                  //    }
                  // }}
                  disabled={state.nid === ""}
                >
                  Submit
                </Button>
                <Link
                  id="button2"
                  style={{ display: "none" }}
                  to={`/ec-data`}
                  state={{
                    userinfo: state.ecresult,
                    jobId: state.jobId,
                    broweerType: Number(state.accountType),
                  }}
                >
                  redirect
                </Link>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </UILoader>
  );
};

export default BorrowerNidVerify;