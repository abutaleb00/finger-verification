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
  FormGroup,
  Input
} from "reactstrap";
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import axios from 'axios'
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search, MoreVertical, Trash, Eye, Edit } from 'react-feather'
import UILoader from '@components/ui-loader'
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
const AuditTrail = () => {
  const [data2, setData2] = useState([])

    const [startDate, setStartDate] = useState(moment().subtract(1, 'days').format("YYYY-MM-DD"))
    const [endDate, setEndDate] = useState(moment().add(1, "days").format("YYYY-MM-DD"))
    const [first, setFirst] = useState(0)
    const [last, setLast] = useState(500)
    const [filter, setFilter] = useState("Req")
    const [block, setBlock] = useState(false)
    const [state, setState] = useState({
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate,
        branch: null,
        status: null
    })
    const columns = [
      {
        name: "id",
        label: "ID",
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
        name: "action",
        label: "Type",
        searchable: true,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "username",
        label: "User",
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
        name: "creationDate",
        label: "Date Time",
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
        name: "description",
        label: "Details",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return (
              <div>{value !== null && value !== undefined ? value : "N/A"}</div>
            );
          },
        },
      }
    ]
 
 const allEcData = () => {
  setBlock(true)
   axios.post('/alllogs',null, {
    params: {
      first: first,
      last: last,
      startDate: startDate,
      endDate: endDate,
      filter: filter,
    },
   }).then(res => {
    setBlock(false)
    console.log("res", res)
    setData2(res.data.data)
   })
 }
 const searchEcData = () => {
  setBlock(true)
   axios.post('/alllogs',null, {
    params: {
      first: first,
      last: last,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      filter: filter,
    },
   }).then(res => {
    setBlock(false)
    console.log("res", res)
    setData2(res.data.data)
   })
   .catch(err => console.log(err))
 }
 useEffect(() => {
  allEcData()
}, [])
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
    search: false,
    selectableRows: "none",
    }

  return (
    <UILoader blocking={block}>
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">Audit Trail</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
      <Row
        style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
      >
        <Col md="3">
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
        <Col md="3">
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
        <Col md="4">
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
        {/* <FormGroup className="mbb">
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
        </FormGroup> */}
        </Col>
        {/* <Col md="3">
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
        </Col> */}
        <Col md="2" style={{ textAlign: "left" }}>
          <Button.Ripple
            size="12"
            style={{marginTop:"18px", width:"100%"}}
            onClick={() => {
              searchEcData()
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
        title={"Audit Trail Details"}
        data={data2}
        columns={columns}
        options={options}
        />
      
      </CardBody>
    </Card>
    </UILoader>
  );
};

export default AuditTrail