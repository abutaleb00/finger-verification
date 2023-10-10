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
    const [startDate, setStartDate] = useState(moment().subtract(30, 'days').format("YYYY-MM-DD"))
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"))
    const [block, setBlock] = useState(false)
    const [data, setData] = useState([])
    const [state, setState] = useState({
        startDate: startDate,
        endDate: endDate,
        branch: null,
        status: null
    })
    const allPendingApplicant = () => {
      setBlock(true)
       axios.get('/allLoans').then(res => {
        if(res.data.result.error === false){
          setBlock(false)
          setData(res.data.data)
        } else  if(res.data.result.error === false){
          setBlock(false)
          toast.error(res.data.result.errorMsg)
        }
       })
       .catch((err) =>{
        setBlock(false)
          toast.error(err.data.result.errorMsg)
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
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.nameEn}
              </div>
            )
          }
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
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.nationalId}
              </div>
            )
          }
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
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.father}
              </div>
            )
          }
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
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.mother}
              </div>
            )
          }
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
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.mobile}
              </div>
            )
          }
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
        label: "Completed By",
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
              <div style={{textAlign:"center"}}><Badge color={value === 1 ? "primary" : value === 0 ? "warning" : "success"}>{value === 1 ? "Waiting for Approval" : value === 0 ? "Pending" : value === 2 ? "Verified": ""}</Badge></div>
            );
          },
        },
      }
    ]
 const getSearch =() =>{
    console.log(first)
 }
    const branchOption = [
        {value: null, label: "Select Branch"},
        {value: 1, label: "Mirpur Branch"},
        {value: 2, label: "Gulshan 1 Branch"},
        {value: 3, label: "Dhanmondi Branch"},
        {value: 4, label: "Rampura Branch"},
      ]    
    const statusOption = [
        {value: null, label: "Select Status"},
        {value: 1, label: "Verification Complete"},
        {value: 2, label: "Verification Pending"}
      ]    
    const options = {
      filterType: "none",
    responsive: "standard",
    filter: false,
    selectableRows: "none",
    }

  useEffect(()=> {
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
        <label>Start Date</label>
          <Flatpickr
            style={{ backgroundColor:"#fff", opacity: "1", padding:"9px 12px" }}
            value={startDate}
            id="date-time-picker"
            className="form-control"
            onChange={(date) => {
              setStartDate(date[0])
            }}
          />
        </Col>
        <Col md="2">
        <label>End Date</label>
          <Flatpickr
            options={{
              dateFormat: "Y-m-d"
            }}
            style={{ backgroundColor:"#fff", opacity: "1", padding:"9px 12px" }}
            value={endDate}
            data-enable-time
            id="date-time-picker"
            className="form-control"
            readonly={false}
            onChange={(date) => {
              setEndDate(date[0])
            }}
          />
        </Col>
        <Col md="3">
        <FormGroup className="mbb">
            <label>Branch Name</label>
          <Select
          className='react-select'
          styles={styles}
          classNamePrefix='select'
          placeholder="Select Branch"
          // defaultValue={currencyOptions[0]}
          options={branchOption}
          isClearable={false}
          onChange={(e) => setState({...state, branch: e.value})}
          maxMenuHeight={140}
          
           />
        </FormGroup>
        </Col>
        <Col md="3">
        <FormGroup className="mbb">
         <label>Select Status</label>
          <Select
          className='react-select'
          styles={styles}
          classNamePrefix='select'
          placeholder="Select Stock"
          // defaultValue={currencyOptions[0]}
          options={statusOption}
          isClearable={false}
          onChange={(e) => setState({...state, status: e.value})}
          maxMenuHeight={140}
          
           />
        </FormGroup>
        </Col>
        <Col md="2" style={{ textAlign: "left" }}>
          <Button.Ripple
            size="12"
            style={{marginTop:"18px"}}
            onClick={() => {
              getSearch()
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