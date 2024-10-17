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
  Button
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
import GrantorList from "../../GrantorList";
import DocumentList from "../DocumentList";
import AddDocument from "../AddDocument";
import { Search, Eye, Edit, UserPlus, X, CheckCircle, UserCheck } from 'react-feather'
import UILoader from '@components/ui-loader'
import toast from 'react-hot-toast'
import { getUserData } from '@utils'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"


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
}
const IndividualApplicationList = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const user = getUserData()
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(100)
  const [filter, setFilter] = useState("")
  const [block, setBlock] = useState(false)
  const [state, setState] = useState({
    startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
    endDate: moment().add(1, 'days').format("YYYY-MM-DD"),
    skip: 0,
    limit: 1000,
  })
  const allNewApplication = () => {
    const send = {
      loanapplication: {
        status: 4
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
  const updateStatus = (e) => {
    const sentdata = {
      loanapplication: {
        loan_no: e,
        status: 1
      }
    }
    Swal.fire({
      title: `Are you sure ?`,
      text: `You want to Complete this Application`,
      type: "warning",
      icon: 'warning',
      footer: "",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        cancelButton: 'btn btn-danger ms-1',
        confirmButton: 'btn btn-primary'
      }
    }).then((result) => {
      if (result.isConfirmed === true) {
        setBlock(true)
        axios.put(`/updateloanstatus`, sentdata).then((res) => {
          if (res.data.result.error === false) {
            setBlock(false)
            toast.success("Loan Application Update Successfully")
            allNewApplication()
          } else if (res.data.result.error === true) {
            setBlock(false)
            toast.error(res.data.result.errorMsg)
          }
        }).catch((e) => {
          setBlock(false)
          toast.error(e.data.result.errorMsg)
        })
      }
    })
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
      label: "Creation Date",
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
      name: "applicantInfo",
      label: "Applicant Info",
      searchable: true,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "applicantName",
      label: "Applicant Name",
      searchable: true,
      options: {
        filter: true,
        sort: true
      },
    },
    {
      name: "applicantMobile",
      label: "Mobile",
      searchable: true,
      options: {
        filter: true,
        sort: true
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
            <div style={{ textAlign: "center" }}><Badge color="warning">{value === 4 ? "Initiate" : "Approved"}</Badge></div>
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
                      localStorage.setItem("individual", JSON.stringify(alldata))
                      localStorage.setItem("type", 1)
                      navigate('/nid-verify', { state: { userData: alldata, type: 1 } })
                    }} id="addCoBorrower" color={'success'} className="text-capitalize" style={{ cursor: "pointer" }} >
                    <span ><CheckCircle /></span>
                  </Badge>
                  <UncontrolledTooltip
                    placement="top"
                    target="addCoBorrower"
                    trigger="hover"
                  > Comple Application</UncontrolledTooltip>
                </div>
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
    // allNewApplication()
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
          <CardTitle tag="h4">New Application List</CardTitle>
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
            title={"Initiate Individual Application List"}
            data={data}
            columns={columns}
            options={options}
          />

        </CardBody>
      </Card>
    </UILoader>
  );
};

export default IndividualApplicationList