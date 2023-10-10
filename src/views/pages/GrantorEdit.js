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
import Select, { components } from "react-select"; // eslint-disable-line
import Flatpickr from "react-flatpickr";
import { useState } from "react";

const GrantorEdit = () => {
  const [picker, setPicker] = useState(new Date());
  const [state, setSate] = useState({
    name: "মঈন মুস্তাকিম",
    nameEn: "Moin Mostakim",
    bloodGroup: "B+",
    dateOfBirth: "1989-10-25",
    father: "মোঃ নাছির উদ্দিন",
    mother: "মনোয়ারা বেগম",
    spouse: "",
    nationalId: "123456789",
    occupation: "ছাত্র/ছাত্রী",
    gender:"male",
    permanentAddress: {
      division: "ঢাকা",
      district: "ঢাকা",
      rmo: "1",
      upozila: "ঢাকা",
      postOffice: "ঢাকা",
      postalCode: "",
      wardForUnionPorishod: 1,
      additionalMouzaOrMoholla: "",
      additionalVillageOrRoad: "ঢাকা",
      homeOrHoldingNo: "",
      region: "ঢাকা",
    },
    photo:
      "http://localhost:8989/file/Photo-ba02a2c4-a273-102b-b531-809d930a783c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=fileobj%2F20210517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210517T083535Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&X-Amz-Signature=f8698e3b8ed0e75ce29b058d1e88ccd0409f44fe3802176d72097c7453453135",
    presentAddress: {
      division: "ঢাকা",
      district: "ঢাকা",
      rmo: "9",
      upozila: "মোহাম্মদপুর",
      cityCorporationOrMunicipality: "ঢাকা উত্তর সিটি কর্পোরেশন",
      unionOrWard: "ওয়ার্ড নং-10",
      postOffice: "মোহাম্মদপুর",
      postalCode: "1207",
      wardForUnionPorishod: 0,
      additionalMouzaOrMoholla: "তাজমহল রোড",
      additionalVillageOrRoad: "",
      homeOrHoldingNo: "৫/১",
      region: "ঢাকা",
    },
  })
  const [permanentAddress, setPermanentAddress] = useState({
      division: "ঢাকা",
      district: "ঢাকা",
      rmo: "9",
      upozila: "মোহাম্মদপুর",
      cityCorporationOrMunicipality: "ঢাকা উত্তর সিটি কর্পোরেশন",
      unionOrWard: "ওয়ার্ড নং-10",
      postOffice: "মোহাম্মদপুর",
      postalCode: "1207",
      wardForUnionPorishod: 0,
      additionalMouzaOrMoholla: "তাজমহল রোড",
      additionalVillageOrRoad: "",
      homeOrHoldingNo: "৫/১",
      region: "ঢাকা",
  })
  const [presentAddress, setPresentAddress] = useState({
      division: "ঢাকা",
      district: "ঢাকা",
      rmo: "9",
      upozila: "মোহাম্মদপুর",
      cityCorporationOrMunicipality: "ঢাকা উত্তর সিটি কর্পোরেশন",
      unionOrWard: "ওয়ার্ড নং-10",
      postOffice: "মোহাম্মদপুর",
      postalCode: "1207",
      wardForUnionPorishod: 0,
      additionalMouzaOrMoholla: "তাজমহল রোড",
      additionalVillageOrRoad: "",
      homeOrHoldingNo: "৫/১",
      region: "ঢাকা",
  })
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female", color: "#0052CC", isFixed: true },
    { value: "third", label: "Third Person" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Personal Information</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
             NID Number
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter NID Number"
              value={state.nationalId}
              onChange={(e) => setSate({...state, nationalId: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Full Name Bangla
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter"
              value={state.name}
              onChange={(e) => setSate({...state, name: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Full Name English
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter"
              value={state.nameEn}
              onChange={(e) => setSate({...state, nameEn: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
             Date of Birth
            </Label>
            <Flatpickr
                className="form-control"
                value={picker}
                onChange={(date) => setPicker(date)}
                id="default-picker"
              />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Father Name
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter"
              value={state.father}
              onChange={(e) => setSate({...state, father: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Mother Name
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter"
              value={state.mother}
              onChange={(e) => setSate({...state, mother: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Spouse Name
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Spouse Name"
              value={state.spouse}
              onChange={(e) => setSate({...state, spouse: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Profession
            </Label>
            <Input 
              type="text" 
              id="basicInput" 
              placeholder="Enter Profession" 
              value={state.occupation}
              onChange={(e) => setSate({...state, occupation: e.target.value})} />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Gender
            </Label>
            <Select
              isClearable={false}
              defaultValue={genderOptions[0]}
              name="colors"
              options={genderOptions}
              className="react-select"
              classNamePrefix="select"
              onChange={(e) => setSate({...state, gender: e.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Designation
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Designation"
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Mobile Number
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mobile Number"
            />
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <Label className="form-label" for="basicInput">
              Email Address
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Email Address"
            />
          </Col>
          <Col className="mb-1" xl="12" md="12" sm="12">
            <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
              Present Address
            </p>
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             Division
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Division"
              value={presentAddress.division}
              onChange={(e) => setPresentAddress({...state, division: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             District
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter District"
              value={presentAddress.district}
              onChange={(e) => setPresentAddress({...state, district: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             Upozila
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Upozila"
              value={presentAddress.upozila}
              onChange={(e) => setPresentAddress({...state, upozila: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            City/Municipality
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter City/Municipality"
              value={presentAddress.cityCorporationOrMunicipality}
              onChange={(e) => setPresentAddress({...state, cityCorporationOrMunicipality: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Union/Ward
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Union/Ward"
              value={presentAddress.unionOrWard}
              onChange={(e) => setPresentAddress({...state, unionOrWard: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Post Office
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Union/Ward"
              value={presentAddress.postOffice}
              onChange={(e) => setPresentAddress({...state, postalCode: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             Postal Code
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Postal Code"
              value={presentAddress.postalCode}
              onChange={(e) => setPresentAddress({...state, postalCode: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Mouza/Moholla
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mouza/Moholla"
              value={presentAddress.additionalMouzaOrMoholla}
              onChange={(e) => setPresentAddress({...state, additionalMouzaOrMoholla: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Village/Road
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mouza/Moholla"
              value={presentAddress.additionalVillageOrRoad}
              onChange={(e) => setPresentAddress({...state, additionalVillageOrRoad: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            House/Holding No
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mouza/Moholla"
              value={presentAddress.homeOrHoldingNo}
              onChange={(e) => setPresentAddress({...state, homeOrHoldingNo: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="12" md="12" sm="12">
            <p style={{fontWeight:"bold", marginBottom:"2px", marginTop:"10px"}}>
            Permanent Address
            </p>
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             Division
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Division"
              value={permanentAddress.division}
              onChange={(e) => setPermanentAddress({...state, division: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             District
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter District"
              value={permanentAddress.district}
              onChange={(e) => setPermanentAddress({...state, district: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             Upozila
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Upozila"
              value={permanentAddress.upozila}
              onChange={(e) => setPermanentAddress({...state, upozila: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            City/Municipality
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter City/Municipality"
              value={permanentAddress.cityCorporationOrMunicipality}
              onChange={(e) => setPermanentAddress({...state, cityCorporationOrMunicipality: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Union/Ward
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Union/Ward"
              value={permanentAddress.unionOrWard}
              onChange={(e) => setPermanentAddress({...state, unionOrWard: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Post Office
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Union/Ward"
              value={permanentAddress.postOffice}
              onChange={(e) => setPermanentAddress({...state, postalCode: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
             Postal Code
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Postal Code"
              value={presentAddress.postalCode}
              onChange={(e) => setPresentAddress({...state, postalCode: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Mouza/Moholla
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mouza/Moholla"
              value={permanentAddress.additionalMouzaOrMoholla}
              onChange={(e) => setPermanentAddress({...state, additionalMouzaOrMoholla: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            Village/Road
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mouza/Moholla"
              value={permanentAddress.additionalVillageOrRoad}
              onChange={(e) => setPermanentAddress({...state, additionalVillageOrRoad: e.target.value})}
            />
          </Col>
          <Col className="mb-1" xl="4" md="4" sm="12">
            <Label className="form-label" for="basicInput">
            House/Holding No
            </Label>
            <Input
              type="text"
              id="basicInput"
              placeholder="Enter Mouza/Moholla"
              value={permanentAddress.homeOrHoldingNo}
              onChange={(e) => setPermanentAddress({...state, homeOrHoldingNo: e.target.value})}
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="submit"
              color="success"
              onClick={() => {
                // localStorage.setItem("accountType", "5")
                window.location.href = "/verified-userlist";
              }}
            >
              Update
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default GrantorEdit;