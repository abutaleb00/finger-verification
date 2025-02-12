// ** Reactstrap Imports
// ** React Imports
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledTooltip,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import Swal from "sweetalert2"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search, Eye, Trash, UserPlus, X, CheckCircle, UserCheck } from 'react-feather'
import UILoader from '@components/ui-loader'
import toast from 'react-hot-toast'
import { getUserData } from '@utils'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"

const CompanyApplicationList = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const user = getUserData()
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(100)
  const [filter, setFilter] = useState("")
  const [block, setBlock] = useState(false)
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
        status: 5
      },
      ...state
    }
    setBlock(true)
    axios.post('/getloanapplicationbydates', send).then(res => {
      if (res.data.result.error === false) {
        setBlock(false)
        setData(res.data.data?.ldb)
      } else if (res.data.result.error === true) {
        setBlock(false)
        toast.error(res.data.result.errorMsg)
      }
    })
      .catch((err) => {
        setBlock(false)
        toast.error(err.data.result.errorMsg)
      })
  }
  const deleteApplication = (e) => {
    e.preventDefault()
    const sentdata = {
      loanapplication: {
        loan_no: userData?.loan_no,
        isDeleted: true
      },
      remarks: remarks
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
      name: "companyInfo",
      label: "Company Info",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.companyProfile
          return (
            <div style={{ width: "auto" }}>
              {loanee?.companyInfo}
            </div>
          )
        }
      },
    },
    {
      name: "companyName",
      label: "Company Name",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.companyProfile
          return (
            <div style={{ width: "auto" }}>
              {loanee?.companyName}
            </div>
          )
        }
      },
    },
    {
      name: "companyPhone",
      label: "Company Phone",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.companyProfile
          return (
            <div style={{ width: "auto" }}>
              {loanee?.companyPhone}
            </div>
          )
        }
      },
    },
    {
      name: "companyRegDate",
      label: "Registration Date",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.companyProfile
          return (
            <div style={{ width: "auto" }}>
              {loanee?.companyRegDate}
            </div>
          )
        }
      },
    },
    {
      name: "companyRegNo",
      label: "Registration No",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.companyProfile
          return (
            <div style={{ width: "auto" }}>
              {loanee?.companyRegNo}
            </div>
          )
        }
      },
    },
    {
      name: "companyTypeRef",
      label: "Company Type",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          const loanee = data[dataIndex]?.companyProfile
          return (
            <div style={{ width: "auto" }}>
              {loanee?.companyTypeRef}
            </div>
          )
        }
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
        customBodyRender: (value) => {
          return (
            <div style={{ textAlign: "center" }}><Badge color="warning">{value === 0 ? "Initiate" : "Approved"}</Badge></div>
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
          const alldata = data[dataIndex]
          console.log("alldata", alldata)
          return (
            <div style={{ width: "auto" }}>
            <div style={{ display: "inline-flex" }}>
              <div style={{ padding: "2px" }} className="btn btn-sm" >
                <Badge
                  onClick={() => {
                    // localStorage.setItem("company", JSON.stringify(alldata))
                    // localStorage.setItem("type", 2)
                    navigate('/nid-verify', { state: { userData: alldata, type: 2 } })
                  }} id="addCoBorrower" color={'success'} className="text-capitalize" style={{ cursor: "pointer" }} >
                  <span ><CheckCircle /></span>
                </Badge>
                <UncontrolledTooltip
                  placement="top"
                  target="addCoBorrower"
                  trigger="hover"
                > Comple Application</UncontrolledTooltip>
              </div>
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
          )
        }
      }
    }
  ]

  useEffect(() => {
    if (user?.passwordChange === false) {
      navigate('/user/change-password')
    }
    allNewApplication()
  }, [])
  const options = {
    filterType: "checkbox",
    responsive: "standard",
    filter: false,
    search: false,
    selectableRows: "none",
  }

  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Enterprise Initiate Application List</CardTitle>
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
                options={{
                  dateFormat: "Y-m-d"
                }}
                style={{ backgroundColor: "#fff", opacity: "1", padding: "9px 12px" }}
                value={state?.endDate}
                data-enable-time
                id="date-time-picker"
                className="form-control"
                readonly={false}
                onChange={(date) => {
                  setState({ ...state, endDate: date[0] })
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
            title={"Enterprise Initiate Application List"}
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
                onClick={() => setShow(!show)}
                color="danger">Cancel</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </UILoader>
  );
};

export default CompanyApplicationList