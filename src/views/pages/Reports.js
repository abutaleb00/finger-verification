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
  Button,
  Input,
  FormGroup
} from "reactstrap";
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import GrantorList from "./GrantorList";
import axios from 'axios'
import { User, Edit, BarChart } from 'react-feather'
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search } from 'react-feather'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import toast from 'react-hot-toast'
import Swal from "sweetalert2"
import UILoader from '@components/ui-loader'
import { getUserData } from '@utils'
import { useNavigate } from 'react-router-dom'


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

const Reports = () => {
  const user = getUserData()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days').format("YYYY-MM-DD"))
  const [endDate, setEndDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"))
  const [block, setBlock] = useState(false)
  const [data, setData] = useState([])
  const [branchOption, setBranchOption] = useState([])
  const [state, setState] = useState({
    startDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
    endDate: moment().add(1, 'days').format("YYYY-MM-DD"),
    branchName: null,
    status: null,
    isCompany: null,
    filter: null

  })

  const allPendingApplicant = () => {
    setBlock(true)
    axios.post('/loansecuserwise', state).then(res => {
      if (res.data.result.error === false) {
        setBlock(false)
        setData(res.data.data)
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

  const columns = [
    {
      name: "loanNo",
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
      name: "company",
      label: "Applicant Type",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== false ? 'Company' : "Individual"}
            </div>
          );
        },
      },
    },
    {
      name: "loaneeJobIds",
      label: "Loanee EC Ref No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "70", wordBreak: "break-all" }}>
              {value !== '' ? value : 'N/A'}
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
      name: "applicantName",
      label: "Applicant Name",
      searchable: true,
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
      name: "loaneeNids",
      label: "Loanee NID",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== '' ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "guarantorNids",
      label: "Guarantor NID",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== '' ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "coborrowerNids",
      label: "Co-Borrower NID",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== '' ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "applicantMobile",
      label: "Mobile",
      searchable: true,
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
      name: "branchName",
      label: "Branch",
      searchable: true,
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
      name: "status",
      label: "Status",
      searchable: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              <div style={{ textAlign: "center" }}><Badge color={value === 1 ? "primary" : value === 0 ? "warning" : value === 4 ? "info" : value === 5 ? "secondary" : "success"}>{value === 1 ? "Waiting for Approval" : value === 0 ? "Pending" : value === 2 ? "Verified" : value === 4 ? "New Individual" : "New Company"}</Badge></div>
            </div>
          );
        },
      },
    },
    {
      name: "createdBy",
      label: "Created By",
      searchable: true,
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
      name: "modifiedBy",
      label: "Completed By",
      searchable: true,
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
  ]

  const getBranchList = () => {
    setBlock(true);
    axios
      .post("/getbranches?first=0&limit=200")
      .then((res) => {
        if (res.data.result.error === false) {
          setBlock(false);
          const branchOption = res.data?.data?.content?.map((item) => {
            return { value: item.name, label: item.name };
          });
          setBranchOption([
            { value: null, label: "Select Branch" },
            ...branchOption,
          ]);
          console.log("res.data.data", res.data.data);
          // setNidPhoto(res.data.data?.photolink)
          // setData(res.data.data)
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
  useEffect(() => {
    getBranchList();
  }, []);
  const statusOption = [
    { value: null, label: "Select Status" },
    { value: 0, label: "New Application" },
    { value: 1, label: "Pending" },
    { value: 2, label: "Complete" },
    { value: 4, label: "New Individual" },
    { value: 5, label: "New Company" },
  ]
  const isCompanyOption = [
    { value: null, label: "Both" },
    { value: 0, label: "Individual" },
    { value: 1, label: "Company" }
  ]
  const options = {
    filterType: "none",
    responsive: "standard",
    filter: false,
    selectableRows: "none",
  }

  useEffect(() => {
    if (user?.passwordChange === false) {
      navigate('/user/change-password')
    }
    allPendingApplicant()
  }, [])
  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Application List</CardTitle>
        </CardHeader>
        <CardBody className="my-2 py-50">
          <Row
            style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
          >
            <Col md="2">
              <label>Search Data</label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter search"
                value={state?.filter}
                onChange={(e) => {
                  setState({ ...state, filter: e.target.value })
                }}
              />
            </Col>
            <Col md="2">
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
            <Col md="2">
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
            <Col md="2">
              <FormGroup className="mbb">
                <label>Branch Name</label>
                <Select
                  className="react-select"
                  styles={styles}
                  options={branchOption}
                  placeholder="Select Branch"
                  onChange={(e) => setState({ ...state, branchName: e.value })}
                  maxMenuHeight={140}
                  isSearchable
                  required
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup className="mbb">
                <label>Application Type</label>
                <Select
                  className='react-select'
                  styles={styles}
                  classNamePrefix='select'
                  placeholder="Select Type"
                  // defaultValue={currencyOptions[0]}
                  options={isCompanyOption}
                  isClearable={false}
                  onChange={(e) => setState({ ...state, isCompany: e.value })}
                  maxMenuHeight={140}

                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup className="mbb">
                <label>Select Status</label>
                <Select
                  className='react-select'
                  styles={styles}
                  classNamePrefix='select'
                  placeholder="Select Status"
                  // defaultValue={currencyOptions[0]}
                  options={statusOption}
                  isClearable={false}
                  onChange={(e) => setState({ ...state, status: e.value })}
                  maxMenuHeight={140}

                />
              </FormGroup>
            </Col>
            <Col md="2" style={{ textAlign: "left" }}>
              <Button.Ripple
                size="12"
                style={{ marginTop: "5px" }}
                onClick={() => {
                  allPendingApplicant()
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
            title={"Applicant List"}
            data={data}
            columns={columns}
            options={options}
          />

        </CardBody>
      </Card>
    </UILoader>
  );
};

export default Reports;