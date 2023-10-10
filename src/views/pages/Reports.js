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
import GrantorEdit from "./GrantorEdit";
import { User, Edit, BarChart } from 'react-feather'
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search } from 'react-feather'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import data from "../components/ec.json"


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
    const [data, setData] = useState([["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"],
    ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
    ["12-09-2023","Gulshan 1 Branch","Moin Mostakim", "মোঃ নাছির উদ্দিন", "মনোয়ারা বেগম", "34546678996", "25-10-1989", "Service", "1", "Pending"],
    ["02-09-2023","Dhanmondi Branch","Abdul Kalam", "আহমেদ শরীফ", "রেবাকা আমিন", "2389098765", "20-03-1992", "ছাত্র", "2", "Verified"]])
    const [state, setState] = useState({
        startDate: startDate,
        endDate: endDate,
        branch: null,
        status: null
    })
    const columns = ["Create Date", "Branch", "Applicant Name", "Father Name", "Mother Name", "NID Number", "Date of Birth", "Occupation", "Guarantor", "Status"]

    const data1 = [
     ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"],
     ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
     ["12-09-2023","Gulshan 1 Branch","Moin Mostakim", "মোঃ নাছির উদ্দিন", "মনোয়ারা বেগম", "34546678996", "25-10-1989", "Service", "1", "Pending"],
     ["02-09-2023","Dhanmondi Branch","Abdul Kalam", "আহমেদ শরীফ", "রেবাকা আমিন", "2389098765", "20-03-1992", "ছাত্র", "2", "Verified"]
    ]
 const getSearch =() =>{
    if(state.branch === null){
        setData([
            ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"],
            ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
            ["12-09-2023","Gulshan 1 Branch","Moin Mostakim", "মোঃ নাছির উদ্দিন", "মনোয়ারা বেগম", "34546678996", "25-10-1989", "Service", "1", "Pending"],
            ["02-09-2023","Dhanmondi Branch","Abdul Kalam", "আহমেদ শরীফ", "রেবাকা আমিন", "2389098765", "20-03-1992", "ছাত্র", "2", "Verified"]
        ])
    } else if(state.branch === 1){
        setData([
            ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"]
        ])
    } else if(state.branch === 2){
        setData([
            ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
     ["12-09-2023","Gulshan 1 Branch","Moin Mostakim", "মোঃ নাছির উদ্দিন", "মনোয়ারা বেগম", "34546678996", "25-10-1989", "Service", "1", "Pending"]
        ])
    } else if(state.branch === 3){
        setData([
            ["02-09-2023","Dhanmondi Branch","Abdul Kalam", "আহমেদ শরীফ", "রেবাকা আমিন", "2389098765", "20-03-1992", "ছাত্র", "2", "Verified"]
        ])
    } else if(state.branch === 1 && state.status === 1){
        setData([
            ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"]
        ])
    } else if(state.branch === 4){
        setData([
           
        ])
    }
    if(state.status === 1){
        setData([
            ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"],
            ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
            ["02-09-2023","Dhanmondi Branch","Abdul Kalam", "আহমেদ শরীফ", "রেবাকা আমিন", "2389098765", "20-03-1992", "ছাত্র", "2", "Verified"]
        ])
    } else if(state.status === 2){
        setData([
            ["12-09-2023","Gulshan 1 Branch","Moin Mostakim", "মোঃ নাছির উদ্দিন", "মনোয়ারা বেগম", "34546678996", "25-10-1989", "Service", "1", "Pending"]
        ])
    } else if(state.status === 2 && state.branch !== 2){
        setData([
        ])
    }
    if(moment(startDate).format("YYYY-MM-DD") === moment().format("2023-09-19")){
        setData([
            ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"],
            ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
        ])
    }else if (moment(startDate).format("YYYY-MM-DD") !== moment().format("2023-09-19")){
        setData([
            ["20-09-2023","Mirpur Branch","ASIF BIN MOSTAFA ANIK", "মোঃ গোলাম মোস্তফা", "রাব্বেয়া মোস্তফা", "1948048457", "17-09-1992", "Service", "2", "Verified"],
            ["15-09-2023","Gulshan 1 Branch","MD SOLIMAN AL- HASAN", "মোঃ ফজলুর রহমান", "সালেহা বেগম", "3263339149", "01-11-1991", "ছাত্র", "3", "Verified"],
            ["12-09-2023","Gulshan 1 Branch","Moin Mostakim", "মোঃ নাছির উদ্দিন", "মনোয়ারা বেগম", "34546678996", "25-10-1989", "Service", "1", "Pending"],
            ["02-09-2023","Dhanmondi Branch","Abdul Kalam", "আহমেদ শরীফ", "রেবাকা আমিন", "2389098765", "20-03-1992", "ছাত্র", "2", "Verified"]
        ])
    }
    console.log("start", startDate)
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
    localStorage.setItem("accountType", "0")
  }, [])
  return (
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
  );
};

export default Reports;