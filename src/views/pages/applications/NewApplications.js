// ** Reactstrap Imports
// ** React Imports
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
  Input,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr"
import { Search } from 'react-feather'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
import moment from "moment"
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables";
import GrantorList from "../GrantorList";
import CoBorrowerList from "./co-borrower/CoBorrowerList";
import DocumentList from "./DocumentList";
import AddDocument from "./AddDocument";
import { Eye, Edit, UserPlus, CheckCircle, UserCheck, Trash } from "react-feather";
import UILoader from "@components/ui-loader";
import toast from "react-hot-toast";
import { getUserData } from '@utils'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import noImg from "../../../assets/images/avatars/avatar-blank.png";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Times New Roman",
  }),
  menu: (base) => ({
    ...base,
    fontSize: 11,
    lineHeight: 1,
  }),
};
const NewApplications = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = getUserData()
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(100);
  const [block, setBlock] = useState(false);
  const [show, setShow] = useState(false)
  const [remarks, setRemarks] = useState('')
  const [userData, setUserData] = useState(null)
  const [state, setState] = useState({
    startDate: moment().subtract(4, 'days').format("YYYY-MM-DD"),
    endDate: moment().add(1, 'days').format("YYYY-MM-DD"),
    skip: 0,
    limit: 1000,

  })

  const allNewApplication = () => {
    const send = {
      loanapplication: {
        status: 0,
      },
      ...state
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
  const updateStatus = (e) => {
    const sentdata = {
      loanapplication: {
        loan_no: e,
        status: 1,
      },
    };
    Swal.fire({
      title: `Are you sure ?`,
      // text: `You want to Complete this Application`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      type: "warning",
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
              allNewApplication();
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
  const deleteApplication = (e) => {
    e.preventDefault()
    const sentdata = {
      loanapplication: {
        loan_no: userData?.loan_no,
        isDeleted: true
      },
      remarks: remarks,
      gurantorDelete: true,
      coBorrowerDelete: true,
      loaneeDelete: true,
    };
    setShow(false)
    setBlock(true);
    axios
      .post(`/loandelete`, sentdata)
      .then((res) => {
        if (res.data.result.error === false) {
          setBlock(false);
          toast.success("Loan Application Deleted Successfully");
          allNewApplication();
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
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.nameEn
              )}
            </div>
          );
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
      name: "ecjobid",
      label: "EC Ref.",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.ecjobid
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
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.nationalId
              )}
            </div>
          );
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
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.father
              )}
            </div>
          );
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
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.mother
              )}
            </div>
          );
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
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.mobile
              )}
            </div>
          );
        },
      },
    },
    {
      name: "branchName",
      label: "Branch",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex];
          return (
            <div style={{ width: "auto" }}>
              {loanee === null ? (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Waiting for <br /> Borrower Info
                </Badge>
              ) : (
                loanee?.branchName
              )}
            </div>
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
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.loanee;
          const coBorrowers = data[dataIndex]?.coBorrowers;
          const guarantors = data[dataIndex]?.guarantors;
          return (
            <div style={{ width: "auto" }}>
              {loanee === null && (
                <Badge style={{ margin: "1px 0px" }} color="danger">
                  Pending Borrower
                </Badge>
              )}
              {coBorrowers?.length < 1 && (
                <Badge style={{ margin: "1px 0px" }} color="warning">
                  Pending Co-borrower
                </Badge>
              )}
              {guarantors?.length < 1 && (
                <Badge style={{ margin: "1px 0px" }} color="primary">
                  Pending Guarantor
                </Badge>
              )}
              {loanee !== null &&
                coBorrowers?.length > 0 &&
                guarantors?.length > 0 && (
                  <Badge style={{ margin: "1px 0px" }} color="success">
                    Waiting for <br /> Approval
                  </Badge>
                )}
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
          const isCompany = data[dataIndex]?.isCompany;
          const loanee = data[dataIndex]?.loanee;
          const guarantors = data[dataIndex]?.guarantors;
          const coBorrower = data[dataIndex]?.coBorrowers;
          const id = data[dataIndex]?.loan_no;
          const uniquereference = data[dataIndex]?.uniquereference;
          console.log("alldata", alldata);
          return (
            <div style={{ width: "auto" }}>
              <div style={{ display: "inline-flex" }}>
                {loanee === null && (
                  <div style={{ padding: "2px" }} className="btn btn-sm">
                    <Badge
                      onClick={() => {
                        navigate("/borrower-nid-verify", {
                          state: {
                            userData: alldata,
                            type: isCompany === true ? 2 : 1,
                          },
                        });
                      }}
                      id="addBorrower"
                      color={"secondary"}
                      className="text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <UserPlus />
                      </span>
                    </Badge>
                    <UncontrolledTooltip
                      placement="top"
                      target="addBorrower"
                      trigger="hover"
                    >
                      {" "}
                      Add Borrower
                    </UncontrolledTooltip>
                  </div>
                )}
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <Link
                    id="button2"
                    to={`/view-application`}
                    state={{ userinfo: alldata }}
                  >
                    <Badge
                      id="details"
                      color={"info"}
                      className="text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <Eye />
                      </span>
                    </Badge>
                  </Link>
                  <UncontrolledTooltip placement="top" target="details">
                    {" "}
                    View
                  </UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <Link
                    id="button2"
                    to={`/edit-application`}
                    state={{
                      userinfo: alldata,
                      type: isCompany === true ? 2 : 1,
                    }}
                  >
                    <Badge
                      id="edit"
                      color={"info"}
                      className="text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <Edit />
                      </span>
                    </Badge>
                  </Link>
                  <UncontrolledTooltip placement="top" target="edit">
                    {" "}
                    Edit
                  </UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <Badge
                    onClick={() => {
                      navigate("/guarantor-nid-verify", {
                        state: {
                          userData: alldata,
                          type: isCompany === true ? 2 : 1,
                        },
                      });
                    }}
                    id="adduser"
                    color={"primary"}
                    className="text-capitalize"
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <UserPlus />
                    </span>
                  </Badge>
                  <UncontrolledTooltip
                    placement="top"
                    target="adduser"
                    trigger="hover"
                  >
                    {" "}
                    Add Guarantor
                  </UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <GrantorList id={id} guarantors={guarantors} allNewApplication={allNewApplication} />
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <Badge
                    onClick={() => {
                      navigate("/coborrower-nid-verify", {
                        state: {
                          userData: alldata,
                          type: isCompany === true ? 2 : 1,
                        },
                      });
                    }}
                    id="addCoBorrower"
                    color={"warning"}
                    className="text-capitalize"
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <UserCheck />
                    </span>
                  </Badge>
                  <UncontrolledTooltip
                    placement="top"
                    target="addCoBorrower"
                    trigger="hover"
                  >
                    {" "}
                    Add Co-Borrower
                  </UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <CoBorrowerList id={id} coBorrower={coBorrower} allNewApplication={allNewApplication} />
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <AddDocument uniquereference={uniquereference} />
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm">
                  <DocumentList uniquereference={uniquereference} />
                </div>
                {JSON.parse(
                  localStorage.getItem("userData")
                ).roleName?.toLowerCase() === "maker" && (
                    <div style={{ padding: "2px" }} className="btn btn-sm">
                      <Badge
                        onClick={() => updateStatus(id)}
                        id="Complete"
                        color={"success"}
                        className="text-capitalize"
                        style={{ cursor: "pointer" }}
                      >
                        <span>
                          <CheckCircle />
                        </span>
                      </Badge>
                      <UncontrolledTooltip
                        placement="top"
                        target="Complete"
                        trigger="hover"
                      >
                        {" "}
                        Complete
                      </UncontrolledTooltip>
                    </div>
                  )}
                {((JSON.parse(
                  localStorage.getItem("userData")
                ).roleName?.toLowerCase() === "maker") || (JSON.parse(
                  localStorage.getItem("userData")
                ).roleName?.toLowerCase() === "admin")) && (
                    <div style={{ padding: "2px" }} className="btn btn-sm">
                      <Badge
                        onClick={() => {
                          setShow(true)
                          setUserData(alldata)
                        }
                        }
                        id="delete"
                        color={"danger"}
                        className="text-capitalize"
                        style={{ cursor: "pointer" }}
                      >
                        <span>
                          <Trash />
                        </span>
                      </Badge>
                      <UncontrolledTooltip
                        placement="top"
                        target="delete"
                        trigger="hover"
                      >
                        {" "}
                        Delete Application
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
    allNewApplication();
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
          <CardTitle tag="h4">New Application List</CardTitle>
        </CardHeader>
        <CardBody className="my-1 py-50">
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
                  allNewApplication()
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
            title={"New Application List"}
            data={data}
            columns={columns}
            options={options}
          />
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-sm'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h3 className='text-center mb-1' style={{ color: "red", fontWeight: "bold" }}>Are you sure ?</h3>
          <p className='text-center mb-2'>You want to Delete this Application</p>
          <form onSubmit={deleteApplication}>
            <Input
              type="textarea"
              rows={3}
              id="basicInput"
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value)
              }}
              required
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>

              <Button type="submit" outline
                color="primary" style={{ marginRight: "10px" }} >Submit</Button>
              <Button outline
              onClick={()=> setShow(!show)}
                color="danger">Cancel</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </UILoader>
  );
};

export default NewApplications;