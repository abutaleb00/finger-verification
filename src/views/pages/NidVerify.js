// ** Reactstrap Imports
// ** React Imports
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormFeedback,
} from "reactstrap";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import Select from "react-select"; 
import FingerPrintModal from "./FingerPrintModal";
import CompanyProfile from "./CompanyProfile";
import CompanyProfileProcess from "./CompanyProfileProcess";
import GuarantorsProfile from "./GuarantorsProfile";
import finger from "@src/assets/images/pages/fingerprint.svg";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";


const defaultValues = {
  companyName: "",
  billingEmail: "",
};

const NidVerify = () => {
  const source = finger;
  // ** Hooks
  const[colorButton, setColorButton] = useState("red")
  const [picker, setPicker] = useState(new Date());
  const [nidNumber, setNidNumber] = useState('');
  const [accountType, setAccountType] = useState(localStorage.getItem("accountType") !== undefined ? localStorage.getItem("accountType") : "0");
useEffect(()=> {
  setAccountType(localStorage.getItem("accountType") !== undefined ? localStorage.getItem("accountType") : "0")
  
}, [accountType])
useEffect(()=> {
  window.fingerComponent
}, [])

const receiveFingerData = (data) => {
  console.log(data);
  // this.setState({ ...data });
};

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };
const accountOption = [
      { value: "0", label: "Select Borrower" },
      { value: "1", label: "Individual" },
      { value: "2", label: "Corporate" },
    ];

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">Fingerprint Verification</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
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
                localStorage.setItem("accountType", e.value)
              }}
            />
          </Col>
        </Row>
        }
         {accountType === "3" || accountType ==="4" || accountType ==="5" ? <CompanyProfileProcess /> : ""}
         {accountType === "5" &&  <GuarantorsProfile />}
        {accountType === "1" || accountType === "4" ?
        <Form>
          <hr />
          <Row>
          <Col md="8" className="mb-1">
            <Col md="12" className="mb-1">
              <Label className="form-label" for="companyName">
                NID Number
              </Label>
                  <Input
                   id="nidNumber"
                    placeholder="Enter NID Number"
                    onChange={() => setNidNumber(e.target.value)}
                  />
            </Col>
            <Col md="12" className="mb-1">
              <Label className="form-label" for="country">
                Date of Birth
              </Label>
              <Flatpickr
                className="form-control"
                value={picker}
                onChange={(date) => setPicker(date)}
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
              style={{ textAlign: "center", marginTop: "5px" }}
            >
              <button
               type="button"
               className={
                colorButton === "red"
                  ? "btn btn-primary primary-b"
                  : "btn btn-success primary-c"
              }
               onClick={() => {
                return window.captureFinger(
                  this,
                  "hfFingerData",
                  colorButton
                )
              }}
              disabled
              >
                Finger
              </button>
              <FingerPrintModal />
            </Col>
          </Row>
          {/* <Row>
            <Col
              sm={{
                offset: 6,
                order: 2,
                size: 2,
              }}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <FingerPrintModal />
            </Col>
          </Row> */}
        </Form>
        : ""
        }
        {accountType === "2" &&  <CompanyProfile />}
      </CardBody>
    </Card>
  );
};

export default NidVerify;
