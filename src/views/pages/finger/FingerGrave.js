import React, { Component } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import finger from "@src/assets/images/pages/fingerprint.svg";
import Swal from "sweetalert2";
import axios from "axios";
import UILoader from "@components/ui-loader";
import toast from "react-hot-toast";
export const baseAPI_URL = globalThis.baseAPI_URL;

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

export default class FingerGrave extends Component {
  constructor(props) {
    super(props);
    window.fingerComponent = this;
    //let nidPics = this.props.history.location.state.nidPics;
    this.state = {
      ...props.location,
      accountType: 1,
      dob: "1990-07-10",
      nid: "",
      colorButton: "red",
      loaderShow: false,
      swalProps: {},
      ecresult: [],
      block: false,
      imageData: null,
      fingure1: null,
      fingure2: finger,
      fingure3: finger,
      fingure4: finger,
      basicModal: false,
      PersonId: "",
    };
  }

  successAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No fingerprint match found",
    });
  };
  callECServer = () => {
    const datatosend = {
      FingerData: [
        {
          FingerIndex: 1,
          FingerprintWsqBytesInBase64: this.state.imageData,
        },
      ],
      PersonId: this.state?.PersonId,
      Device: "device_name",
      ServiceId: "commlink",
      Password: "testP@ss",
    };
    this.setState({ block: true }, () => {
      axios
        .post("http://180.210.129.108:8081/fpms/fp/enroll/", datatosend)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ block: false }, () => {
              Swal.fire({
                title: "Verified",
                text: "Now you can proceed to next step",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Proceed!",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({ ecresult: res.data.data }, () => {
                    document.getElementById("button2").click();
                  });
                }
              });
            });
          } else if (res.data.result.error === true) {
            this.setState({ block: false }, () => {
              Swal.fire({
                title: "Failed",
                text: "No User Data Found",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay",
              }).then((result) => {
                if (result.isConfirmed) {
                }
              });
            });
          }
        })
        .catch((err) => {
          this.setState({ block: false });
          toast.error(err.data.result.errorMsg);
        });
    });
  };
  uploadAllDocument = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    );
    var formdata = new FormData();
    formdata.append("fileName", localStorage.getItem("uniquereference"));
    formdata.append("base64Data", this.state.imageData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`${baseAPI_URL}/api/base64upload`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.result?.error === false) {
          console.log(result);
          window.location.href = "/new-applications";
          toast.success("File Upload Successful!");
        } else if (result.result.error === true) {
          toast.error(result.result?.errorMsg);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  getmatchData = () => {
    const datatosend = {
      FingerData: [
        {
          FingerIndex: 1,
          FingerprintWsqBytesInBase64: this.state.imageData,
        },
      ],
      PersonId: this.state?.PersonId,
      Device: "device_name",
      ServiceId: "commlink",
      Password: "testP@ss",
    };
    this.setState({ block: true }, () => {
      axios
        .post("http://180.210.129.108:8081/fpms/fp/enroll/", datatosend)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ block: false }, () => {
              Swal.fire({
                title: "Verified",
                text: "Now you can proceed to next step",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Proceed!",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({ ecresult: res.data.data }, () => {
                    document.getElementById("button2").click();
                  });
                }
              });
            });
          } else if (res.data.result.error === true) {
            this.setState({ block: false }, () => {
              Swal.fire({
                title: "Failed",
                text: "No User Data Found",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay",
              }).then((result) => {
                if (result.isConfirmed) {
                }
              });
            });
            // this.setState({block: false})
            // toast.error(res.data.result.errorMsg)
          }
        })
        .catch((err) => {
          this.setState({ block: false });
          toast.error(err.data.result.errorMsg);
        });
    });
  };

  receiveFingerData2 = (data) => {
    console.log("ddddd", data);
    this.setState({ imageData: data?.listoffingers?.fingerImage });
    //  if( data?.extraData?.colorButton === "green"){
    //   this.dataAlert()
    //  }
    this.setState({ ...data });
  };

  errorAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Please input NID & Date of Birth",
    });
  };

  render() {
    return (
      <UILoader blocking={this.state.block}>
        <Card>
          <CardHeader className="border-bottom">
            <CardTitle tag="h4">Fingerprint Verification</CardTitle>
          </CardHeader>
          <CardBody className="my-2 py-50">
            <Form>
              <hr />
              <Row>
                <Col
                  sm={{
                    size: 12,
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={
                      this.state?.imageData !== undefined &&
                      this.state?.imageData !== null
                        ? `data:image/jpeg;base64,${this.state?.imageData}`
                        : `${finger}`
                    }
                    alt="nid photo"
                    style={{
                      width: 130,
                      height: 160,
                      border: "1px solid gray",
                      borderRadius: "5px",
                      padding: "5px",
                      justifyContent: "center",
                    }}
                  />
                  <Button
                    type="reset"
                    // color="warning"
                    className="mt-2"
                    outline
                    onClick={() => {
                      this.setState({ basicModal: true });
                      return window.captureFinger2(
                        this,
                        "fingerData",
                        this.state
                      );
                    }}
                  >
                    Capture Finger
                  </Button>
                </Col>
                <Col
                  className="mt-5"
                  sm={{
                    size: 12,
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    // style={{display:"none"}}
                    id="button1"
                    color="success"
                    style={{ width: "130px" }}
                    onClick={(e) => {
                      this.uploadAllDocument();
                    }}
                    disabled={this.state.imageData === null}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
            <Modal
              className="sm"
              centered={true}
              isOpen={this.state.basicModal}
              backdrop={false}
              toggle={() =>
                this.setState({ basicModal: !this.state.basicModal })
              }
            >
              <ModalHeader
                toggle={() =>
                  this.setState({ basicModal: !this.state.basicModal })
                }
              >
                Fingerprint
              </ModalHeader>
              <ModalBody>
                <Row className="" style={{ justifyContent: "center" }}>
                  <Col
                    className="mt-1"
                    xl="12"
                    md="12"
                    sm="12"
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <img
                      src={
                        this.state?.imageData !== undefined &&
                        this.state?.imageData !== null
                          ? `data:image/jpeg;base64,${this.state?.imageData}`
                          : `${finger}`
                      }
                      alt="nid photo"
                      style={{
                        width: 130,
                        height: 160,
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "5px",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    />
                  </Col>
                  <button
                    className="btn btn-primary"
                    style={{ width: "130px", marginRight: "5px" }}
                    onClick={() => {
                      this.setState({ basicModal: false });
                      // console.log("window.returndata", window.fingerComponent.receiveFingerData(data))
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ width: "130px", marginLeft: "5px" }}
                    onClick={() => {
                      this.setState({ imageData: null });
                      return window.captureFinger2(
                        this,
                        "fingerData",
                        this.state
                      );
                    }}
                  >
                    Recapture
                  </button>
                </Row>
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </UILoader>
    );
  }
}
