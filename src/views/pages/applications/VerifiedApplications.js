import { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledTooltip,
  Row,
  Col,
  Button
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/airbnb.css";
import moment from "moment"
import { Search } from 'react-feather'
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables";
import GrantorList from "../GrantorList";
import DocumentList from "./DocumentList";
import CoBorrowerList from "./co-borrower/CoBorrowerList";
import { Eye, BarChart, X } from "react-feather";
import UILoader from "@components/ui-loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { getUserData } from '@utils'
import { useNavigate } from 'react-router-dom'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import noImg from "../../../assets/images/avatars/avatar-blank.png";

const VerifiedApplications = () => {
  const user = getUserData()
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(100);
  const [filter, setFilter] = useState("");
  const [block, setBlock] = useState(false);
  const [state, setState] = useState({
    startDate: moment().subtract(4, 'days').format("YYYY-MM-DD"),
    endDate: moment().add(1, 'days').format("YYYY-MM-DD"),
    skip: 0,
    limit: 1000,
  })
  const searchEcData = () => {
    const send = {
      loanapplication: {
        status: 2,
      },
    };
    setBlock(true);
    axios
      .post("/getloandetailscomplete", send)
      .then((res) => {
        setBlock(false);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const allVerifiedApplicant = () => {
    const send = {
      loanapplication: {
        status: 2,
      },
      ...state,
    };
    setBlock(true);
    axios
      .post("/getloanapplicationbydates", send)
      .then((res) => {
        if (res.data.result.error === false) {
          setBlock(false);
          setData(res.data.data?.ldb);
        } else if (res.data.result.error === true) {
          setBlock(false);
          toast.error(res.data.result.errorMsg);
        }
      })
      .catch((err) => {
        setBlock(false);
        toast.error(err.data.result.errorMsg);
      });
  };
  const rejectStatus = (e) => {
    const sentdata = {
      loanapplication: {
        loan_no: e,
        status: 0,
      },
    };
    Swal.fire({
      title: `Are you sure ?`,
      text: `You want to Reject this Application`,
      type: "wanring",
      icon: "warning",
      footer: "",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        cancelButton: "btn btn-danger ms-1",
        confirmButton: "btn btn-primary",
      },
    }).then((result) => {
      if (result.isConfirmed === true) {
        setBlock(true);
        axios
          .put(`/updateloanstatus`, sentdata)
          .then((res) => {
            if (res.data.result.error === false) {
              setBlock(false);
              toast.success("Loan Application Update Successfully");
              searchEcData();
            } else if (res.data.result.error === true) {
              setBlock(false);
              toast.error(res.data.result.errorMsg);
            }
          })
          .catch((e) => {
            setBlock(false);
            toast.error(e.data.result.errorMsg);
          });
      }
    });
  };
  const columns = [
    {
      name: "loan_no",
      label: "Application No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== null && value !== undefined ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "isCompany",
      label: "Borrower Type",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value === false ? "Individual" : "Company"}
            </div>
          );
        },
      },
    },
    {
      name: "isCompany",
      label: "Company",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const companyProfile = data[dataIndex]?.companyProfile;
          return (
            <div style={{ width: "auto" }}>
              {companyProfile !== null ? companyProfile?.companyName : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "creationDate",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== null && value !== undefined ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "nameEn",
      label: "Applicant Name",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return <div style={{ width: "auto" }}>{loanee?.nameEn}</div>;
        },
      },
    },
    {
      name: "nidphoto",
      label: "Photo",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return (
            <div style={{ width: "auto", textAlign: "center" }}>
              {loanee !== null ? (
                <img
                  src={`data:image/jpeg;base64,${loanee?.nidphoto}`}
                  alt="img"
                  style={{
                    width: 30,
                    height: 30,
                    border: "1px solid gray",
                    borderRadius: "2px",
                  }}
                />
              ) : (
                <img
                  src={noImg}
                  alt="img"
                  style={{
                    width: 25,
                    height: 25,
                    border: "1px solid gray",
                    borderRadius: "2px",
                  }}
                />
              )}
            </div>
          );
        },
      },
    },
    {
      name: "nationalId",
      label: "NID",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return <div style={{ width: "auto" }}>{loanee?.nationalId}</div>;
        },
      },
    },
    {
      name: "ecjobid",
      label: "EC Ref.",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return <div style={{ width: "auto" }}>{loanee?.ecjobid}</div>;
        },
      },
    },
    {
      name: "lonee",
      label: "Father Name",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return <div style={{ width: "auto" }}>{loanee?.father}</div>;
        },
      },
    },
    {
      name: "lonee",
      label: "Mother Name",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return <div style={{ width: "auto" }}>{loanee?.mother}</div>;
        },
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return <div style={{ width: "auto" }}>{loanee?.mobile}</div>;
        },
      },
    },
    {
      name: "branchName",
      label: "Branch",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>{value !== null && value !== undefined ? value : "N/A"}</div>
          );
        },
      },
    },
    {
      name: "createdBy",
      label: "Created By",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>{value !== null && value !== undefined ? value : "N/A"}</div>
          );
        },
      },
    },
    {
      name: "modifiedBy",
      label: "Approved By",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>{value !== null && value !== undefined ? value : "N/A"}</div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ textAlign: "center" }}>
              <Badge color="success">{value === 2 ? "Verified" : ""}</Badge>
            </div>
          );
        },
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const alldata = data[dataIndex];
          const guarantors = data[dataIndex]?.guarantors;
          const coBorrower = data[dataIndex]?.coBorrowers;
          const id = data[dataIndex]?.loan_no;
          const uniquereference = data[dataIndex]?.uniquereference;
          return (
            <div style={{ width: "auto" }}>
              <div style={{ display: "inline-flex" }}>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <Link
                    id="button2"
                    to={`/view-application`}
                    state={{ userinfo: alldata }}
                  >
                    <Badge
                      id="details"
                      color={"secondary"}
                      className="text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <Eye />
                      </span>
                    </Badge>
                  </Link>
                  {/* <Eye id="details" size={14} className='me-50' color="green" /> */}
                  <UncontrolledTooltip placement="top" target="details">
                    {" "}
                    View
                  </UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <CoBorrowerList coBorrower={coBorrower} />
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <GrantorList guarantors={guarantors} />
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <DocumentList uniquereference={uniquereference} />
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <Link
                    id="button2"
                    to={`/application-form`}
                    state={{ userinfo: alldata }}
                  >
                    <Badge
                      id="Complete"
                      color={"info"}
                      className="text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <BarChart />
                      </span>
                    </Badge>
                  </Link>
                  <UncontrolledTooltip
                    placement="top"
                    target="Complete"
                    trigger="hover"
                  >
                    {" "}
                    Complete
                  </UncontrolledTooltip>
                </div>
                {JSON.parse(
                  localStorage.getItem("userData")
                ).roleName?.toLowerCase() === "checker" && (
                    <div style={{ padding: "2px" }} className="btn btn-sm">
                      <Badge
                        id="Reject"
                        onClick={() => rejectStatus(id)}
                        color={"danger"}
                        className="text-capitalize"
                        style={{ cursor: "pointer" }}
                      >
                        <span>
                          <X />
                        </span>
                      </Badge>
                      <UncontrolledTooltip
                        placement="top"
                        target="Reject"
                        trigger="hover"
                      >
                        {" "}
                        Reject
                      </UncontrolledTooltip>
                    </div>
                  )}
              </div>
            </div>
          );
        },
      },
    },
  ];

  useEffect(() => {
    if (user?.passwordChange === false) {
      navigate('/user/change-password')
    }
    allVerifiedApplicant();
  }, []);
  const options = {
    filterType: "checkbox",
    responsive: "standard",
    filter: false,
    search: false,
    selectableRows: "none",
  };

  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Verified Application List</CardTitle>
        </CardHeader>
        <CardBody className="my-1 py-50">
          {/* <Row
        style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
      >
        <Col md="6">
        <FormGroup className="mbb">
        <label>Search Data</label>
        <Input
          id='accountName'
          className='w-100'
          type='text'
          placeholder={"Enter search data"}
          onChange={e => setFilter(e.target.value.trim())}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              searchEcData()
              }
           }}
           />
        </FormGroup>
        </Col>
        <Col md="2" style={{ textAlign: "left" }}>
          <Button.Ripple
            size="12"
            style={{marginTop:"19px", width:"100%"}}
            onClick={() => {
              searchEcData()
            }}
            outline
            color="primary"
          >
            <Search size={14} />
            <span className="align-middle ms-25">Search</span>
          </Button.Ripple>
        </Col>
      </Row> */}
          <Row
            style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
          >
            <Col md="4">
              <label>Start Date</label>
              <Flatpickr
                style={{ backgroundColor: "#fff", opacity: "1", padding: "9px 12px" }}
                value={state?.startDate}
                id="date-time-picker"
                className="form-control"
                onChange={(date) => {
                  setState({ ...state, startDate: moment(date[0]).format("YYYY-MM-DD") })
                }}
              />
            </Col>
            <Col md="4">
              <label>End Date</label>
              <Flatpickr
                style={{ backgroundColor: "#fff", opacity: "1", padding: "9px 12px" }}
                value={state?.endDate}
                id="date-time-picker"
                className="form-control"
                readonly={false}
                onChange={(date) => {
                  setState({ ...state, endDate: moment(date[0]).format("YYYY-MM-DD") })
                }}
              />
            </Col>
            <Col md="4" style={{ textAlign: "left" }}>
              <Button.Ripple
                size="12"
                style={{ marginTop: "17px" }}
                onClick={() => {
                  allVerifiedApplicant()
                }}
                outline
                color="primary"
              // onKeyDown={(e) => {
              //   if (e.keyCode === 13) {
              //     this.setState({ page: 0 }, () => {
              //       this.cusSearch();
              //     });
              //   }
              // }}
              >
                <Search size={14} />
                <span className="align-middle ms-25">Search</span>
              </Button.Ripple>
            </Col>
          </Row>
          <MUIDataTable
            title={"Verified Application List"}
            data={data}
            columns={columns}
            options={options}
          />
        </CardBody>
      </Card>
    </UILoader>
  );
};

export default VerifiedApplications;