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
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import UILoader from '@components/ui-loader';
import Select from "react-select";
import SelectRequired from "../../components/SelectRequired";
import { nidfield, presentAddressData, parmanentAddressData } from "../../components/localjs/data";
import TextBox from "../../components/TextBox";

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
};

const Selects = props => (
  <SelectRequired
    {...props}
    SelectComponent={Select}
    options={props.options || []}
  />
);

const EditApplicant = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  // ** Initialize with Null Checks and Fallbacks to prevent "Cannot read property of null"
  const [application, setApplication] = useState(location.state?.userinfo || {});
  const [state, setState] = useState(location.state?.userinfo?.loanee || {});
  const [branchName, setBranchName] = useState(location.state?.userinfo?.branchName || "");
  const [permanentAddress, setPermanentAddress] = useState(location.state?.userinfo?.loanee?.permanentAddress || {});
  const [presentAddress, setPresentAddress] = useState(location.state?.userinfo?.loanee?.presentAddress || {});

  const [block, setBlock] = useState(false);
  const [branchOption, setBranchOption] = useState([]);

  // ** Redirect if accessed without state data
  useEffect(() => {
    if (!location.state) {
      toast.error("Applicant data not found");
      navigate('/new-applications');
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePresentChange = (e) => {
    setPresentAddress({ ...presentAddress, [e.target.name]: e.target.value });
  };

  const handlePermanentChange = (e) => {
    setPermanentAddress({ ...permanentAddress, [e.target.name]: e.target.value });
  };

  const getBranchList = () => {
    setBlock(true);
    axios.post('/getbranches?first=0&limit=200').then(res => {
      setBlock(false);
      if (res.data?.result?.error === false) {
        const branches = res.data?.data?.content?.map((item) => ({
          value: item.name,
          label: item.name
        })) || [];
        setBranchOption([{ value: null, label: 'Select Branch' }, ...branches]);
      } else {
        toast.error(res.data?.result?.errorMsg || "Error fetching branches");
      }
    }).catch(() => {
      setBlock(false);
      toast.error("Network error while fetching branches");
    });
  };

  useEffect(() => {
    getBranchList();
  }, []);

  const updateLoanApplication = (e) => {
    e.preventDefault();
    const sendata = {
      loanapplication: {
        loan_no: application?.loan_no,
        createdBy: application?.createdBy,
        branchName: branchName,
        status: application?.status,
        id: application?.id
      },
      companyProfile: location.state?.type === 2 ? application?.companyProfile : null,
      loanee: {
        ...state,
        permanentAddress: permanentAddress,
        presentAddress: presentAddress
      },
      guarantors: application?.guarantors || [],
      coBorrowers: application?.coBorrowers || []
    };

    setBlock(true);
    axios.put('/updateloanee', sendata).then(res => {
      setBlock(false);
      if (res.data.result.error === false) {
        toast.success("Application Updated Successfully");
        navigate('/new-applications');
      } else {
        toast.error(res.data.result.errorMsg);
      }
    }).catch(err => {
      setBlock(false);
      toast.error("Failed to update application");
    });
  };

  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader style={{ marginBottom: "10px", borderBottom: "1px dashed gray" }}>
          <CardTitle tag="h4">Update Applicant Information</CardTitle>
          <Button onClick={() => navigate(-1)} color="primary" className="btn-md" outline>Back to Applicant List</Button>
        </CardHeader>

        <CardBody>
          <form onSubmit={updateLoanApplication}>
            <Row>
              <Col className="mb-1" xl="9" md="9" sm="12">
                <Row>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">NID Number</Label>
                    <Input type="text" value={state?.nationalId || ""} disabled />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">Full Name Bangla</Label>
                    <Input type="text" value={state?.name || ""} disabled />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">Full Name English</Label>
                    <Input type="text" value={state?.nameEn || ""} disabled />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">Date of Birth</Label>
                    <Input type="text" value={state?.dateOfBirth || ""} disabled />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">Father Name</Label>
                    <Input type="text" value={state?.father || ""} disabled />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">Mother Name</Label>
                    <Input type="text" value={state?.mother || ""} disabled />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Label className="form-label">Branch Name <span style={{ color: "red" }}>*</span></Label>
                    <Selects
                      className='react-select'
                      styles={styles}
                      options={branchOption}
                      value={branchOption?.find((v) => v.value === branchName)}
                      onChange={(e) => setBranchName(e?.value)}
                      required
                    />
                  </Col>
                </Row>
              </Col>

              <Col className="mb-1" xl="3" md="3" sm="12" style={{ textAlign: "center" }}>
                <p style={{ color: "black", fontWeight: "bold", marginBottom: "5px" }}>Applicant Photo</p>
                {state?.nidphoto ? (
                  <img
                    src={`data:image/jpeg;base64,${state.nidphoto}`}
                    alt='nid photo'
                    style={{ width: 130, height: 160, border: "1px solid gray", borderRadius: "5px", padding: "5px" }}
                  />
                ) : (
                  <div style={{ width: 130, height: 160, border: "1px dashed gray", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>No Image</div>
                )}
              </Col>
            </Row>

            <Row>
              {nidfield.map((v, k) => (
                <TextBox
                  key={"nid_text" + k}
                  {...v}
                  val={state ? (state[v.id] ?? "") : ""}
                  ChangeHandler={handleChange}
                />
              ))}

              <Col className="mb-1" xl="12" md="12" sm="12">
                <p style={{ fontWeight: "bold", marginBottom: "2px", marginTop: "10px" }}>Present Address</p>
              </Col>
              {presentAddressData.map((v, k) => (
                <TextBox
                  key={"pres_text" + k}
                  {...v}
                  val={presentAddress ? (presentAddress[v.id] ?? "") : ""}
                  ChangeHandler={handlePresentChange}
                />
              ))}

              <Col className="mb-1" xl="12" md="12" sm="12">
                <p style={{ fontWeight: "bold", marginBottom: "2px", marginTop: "10px" }}>Permanent Address</p>
              </Col>
              {parmanentAddressData.map((v, k) => (
                <TextBox
                  key={"perm_text" + k}
                  {...v}
                  val={permanentAddress ? (permanentAddress[v.id] ?? "") : ""}
                  ChangeHandler={handlePermanentChange}
                />
              ))}
            </Row>

            <Row style={{ marginTop: "15px", borderTop: "1px dashed gray" }}>
              <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="submit" color="success">Update</Button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </UILoader>
  );
};

export default EditApplicant;